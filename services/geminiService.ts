import { GoogleGenAI, Type } from "@google/genai";
import { FightEvent, Source, Promotion } from '../types';

const extractSources = (groundingMetadata: any): Source[] => {
    if (!groundingMetadata?.groundingChunks) return [];
    const sources: Source[] = [];
    const seenUris = new Set<string>();
    for (const chunk of groundingMetadata.groundingChunks) {
        if (chunk.web && chunk.web.uri && !seenUris.has(chunk.web.uri)) {
            sources.push({
                title: chunk.web.title || chunk.web.uri,
                uri: chunk.web.uri,
            });
            seenUris.add(chunk.web.uri);
        }
    }
    return sources;
};

export const fetchUpcomingFights = async (): Promise<{ events: FightEvent[], sources: Source[] }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const searchPrompt = `
    Find major upcoming MMA fight cards for UFC, PFL, Bellator, ONE Championship, and BKFC scheduled within the next 3 months.
    CRITICAL: You MUST find the specific Main Card start time in GMT/UTC. 
    UFC PPVs usually start at 03:00 UTC (Sunday morning in Europe/Asia). 
    UFC Fight Nights often start at 21:00 or 22:00 UTC.
    PFL and BKFC often start at 00:00 or 01:00 UTC.
    DO NOT return 00:00:00 for every event. Search for the real broadcast time.
    Include promotion, full event name, venue, and location.
    List the main card matchups, identifying the main event.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: searchPrompt,
      config: { tools: [{ googleSearch: {} }] },
    });

    const groundedText = response.text;
    const sources = extractSources(response.candidates?.[0]?.groundingMetadata);

    const jsonPrompt = `
      Based ONLY on the text below, generate a JSON array of MMA fight events.
      CRITICAL: The "date" field MUST be a full ISO 8601 string in UTC (e.g., "2025-01-24T22:30:00Z"). 
      Ensure the hours and minutes are accurately reflected based on the search result.
      
      Text: ${groundedText}
    `;

    const jsonResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: jsonPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              promotion: { type: Type.STRING, enum: Object.values(Promotion) },
              eventName: { type: Type.STRING },
              date: { type: Type.STRING, description: "ISO 8601 UTC string with exact time" },
              venue: { type: Type.STRING },
              location: { type: Type.STRING },
              fightCard: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    fighter1: { type: Type.STRING },
                    fighter2: { type: Type.STRING },
                    weightClass: { type: Type.STRING },
                    isMainEvent: { type: Type.BOOLEAN },
                    isCoMainEvent: { type: Type.BOOLEAN },
                  },
                  required: ['fighter1', 'fighter2', 'weightClass', 'isMainEvent', 'isCoMainEvent'],
                },
              },
            },
            required: ['promotion', 'eventName', 'date', 'venue', 'location', 'fightCard'],
          },
        },
      },
    });

    return { events: JSON.parse(jsonResponse.text.trim()), sources };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to fetch live fight data.");
  }
};