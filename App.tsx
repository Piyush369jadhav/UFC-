import React, { useState, useEffect } from 'react';
import { FightEvent, Source, Promotion } from './types';
import { fetchUpcomingFights } from './services/geminiService';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import PromotionGrid from './components/PromotionGrid';
import PromotionView from './components/PromotionView';

const App: React.FC = () => {
  const [allEvents, setAllEvents] = useState<FightEvent[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);

  useEffect(() => {
    const loadFights = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setSources([]);
        const { events: generatedEvents, sources: fetchedSources } = await fetchUpcomingFights();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcomingEvents = generatedEvents.filter(event => new Date(event.date) >= today);

        upcomingEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setAllEvents(upcomingEvents);
        setSources(fetchedSources);
      } catch (err) {
        setError('Failed to fetch live fight data from Google. The API might be busy. Please try again in a moment.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFights();
  }, []);

  const handleSelectPromotion = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
  };

  const handleGoBack = () => {
    setSelectedPromotion(null);
  };

  const renderContent = () => {
    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorDisplay message={error} />;
    
    if (selectedPromotion) {
        const promotionEvents = allEvents.filter(event => event.promotion === selectedPromotion);
        return (
            <PromotionView 
                promotion={selectedPromotion}
                events={promotionEvents}
                sources={sources}
            />
        );
    }

    return <PromotionGrid events={allEvents} onSelectPromotion={handleSelectPromotion} />;
  }

  return (
    <div className="min-h-screen font-sans">
      <Header 
        selectedPromotion={selectedPromotion} 
        onBack={handleGoBack} 
      />
      <main className="container mx-auto p-4 md:p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;