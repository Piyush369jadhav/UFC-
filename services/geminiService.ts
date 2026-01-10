
import { GoogleGenAI, Type } from "@google/genai";
import { FightEvent, Source } from '../types';

// Helper to extract relevant data from grounding chunks
const extractSources = (groundingMetadata: any): Source[] => {
    if (!groundingMetadata?.groundingChunks) {
        return [];
    }

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
}


const fetchUpcomingFights = async (): Promise<{ events: FightEvent[], sources: Source[] }> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // --- Step 1: Get real-world, up-to-date information using Google Search grounding ---
  const searchPrompt = `
    Find and list major upcoming MMA fight cards for promotions like UFC, PFL, Bellator, ONE Championship, and BKFC scheduled within the next 3 months.
    Provide a comprehensive list including the promotion, full event name, an exact date and time, the venue, and the city/state/country location.
    Also, list the main fight card matchups for each event, clearly identifying the main event and co-main event.
  `;

  let groundedResponse;
  let sources: Source[] = [];
  try {
    groundedResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: searchPrompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    sources = extractSources(groundedResponse.candidates?.[0]?.groundingMetadata);
  } catch(error) {
    console.error("Error fetching grounded data from Gemini API:", error);
    throw new Error("Failed to fetch live fight data using Google Search.");
  }
  
  const groundedText = groundedResponse.text;

  // --- Step 2: Use the grounded information to generate a structured JSON output ---
  const jsonPrompt = `
    Based ONLY on the following information, generate a valid JSON array of MMA fight events.
    Do not invent or add any information not present in the text provided.
    Adhere strictly to the provided JSON schema.
    Dates MUST be in a valid ISO 8601 format (e.g., YYYY-MM-DDTHH:mm:ssZ). If a time isn't specified, use a reasonable default like 22:00:00Z for the evening.

    Information:
    ---
    ${groundedText}
    ---
  `;

  try {
    const jsonResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: jsonPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              promotion: {
                type: Type.STRING,
                enum: ['UFC', 'PFL', 'BKFC', 'ONE Championship', 'Bellator MMA', 'RIZIN FF'],
                description: 'The MMA promotion name.',
              },
              eventName: {
                type: Type.STRING,
                description: 'The official name of the fight event.',
              },
              date: {
                type: Type.STRING,
                description: `The date of the event in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ).`,
              },
              venue: {
                type: Type.STRING,
                description: 'The venue where the event takes place.',
              },
              location: {
                type: Type.STRING,
                description: 'The city and country of the event.',
              },
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

    const jsonText = jsonResponse.text.trim();
    const events: FightEvent[] = JSON.parse(jsonText);
    return { events, sources };
  } catch (error) {
    console.error("Error structuring JSON data with Gemini API:", error);
    throw new Error("Failed to parse live fight data into the required format.");
  }
};

export { fetchUpcomingFights };
