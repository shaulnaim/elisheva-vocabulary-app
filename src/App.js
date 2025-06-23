import React, { useState } from 'react';
import './App.css';
import { vocabularyData } from './data/vocabularyData';
import VocabularyCard from './components/VocabularyCard';
import CategoryFilter from './components/CategoryFilter';
import AIVocabularyGenerator from './components/AIVocabularyGenerator';

function App() {
  const [activeCards, setActiveCards] = useState([...vocabularyData]);
  const [deletedCards, setDeletedCards] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [isUsingAI, setIsUsingAI] = useState(false);

  const filteredCards = currentCategory === 'all' 
    ? activeCards 
    : activeCards.filter(card => card.category === currentCategory);

  const deleteCard = (index) => {
    const cardToDelete = activeCards[index];
    setDeletedCards(prev => [...prev, cardToDelete]);
    setActiveCards(prev => prev.filter((_, i) => i !== index));
  };

  const resetCards = () => {
    setActiveCards([...vocabularyData]);
    setDeletedCards([]);
  };

  const shuffleCards = () => {
    const shuffled = [...activeCards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setActiveCards(shuffled);
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
  };

  const handleAIVocabularyGenerated = (newVocabulary) => {
    setActiveCards(newVocabulary);
    setDeletedCards([]);
    setCurrentCategory('all');
    setIsUsingAI(true);
    setShowAIGenerator(false);
  };

  const switchToOriginalVocabulary = () => {
    setActiveCards([...vocabularyData]);
    setDeletedCards([]);
    setCurrentCategory('all');
    setIsUsingAI(false);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>🎯 הכנה למבחן באנגלית של אלישבע חנה נעים</h1>
        <div className="stats">
          <span>מתוך <span>{activeCards.length}</span> מילים
            אלישבע כבר שולטת ב <span>{deletedCards.length}</span></span>
        </div>
      </div>

      <CategoryFilter 
        currentCategory={currentCategory} 
        onCategoryChange={handleCategoryChange} 
      />

      <div className="controls">
        <button className="btn" onClick={resetCards}>
          🔄 להתחיל מהתחלה
        </button>
        <button className="btn" onClick={shuffleCards}>
          🔀 לערבב
        </button>
        <button className="ai-toggle-btn" onClick={() => setShowAIGenerator(true)}>
          🤖 צור מילים חכמות
        </button>
        {isUsingAI && (
          <button className="btn" onClick={switchToOriginalVocabulary}>
            📚 חזור למילים המקוריות
          </button>
        )}
      </div>

      {filteredCards.length === 0 ? (
        <div className="empty-state">
          🎉 Congratulations! You've mastered all the words!<br />
          <button className="btn" onClick={resetCards} style={{ marginTop: '20px' }}>
            Start Over
          </button>
        </div>
      ) : (
        <div className="cards-container">
          {filteredCards.map((word, index) => (
            <VocabularyCard
              key={`${word.english}-${activeCards.indexOf(word)}`}
              word={word}
              onDelete={() => deleteCard(activeCards.indexOf(word))}
            />
          ))}
        </div>
      )}

      {showAIGenerator && (
        <AIVocabularyGenerator
          onVocabularyGenerated={handleAIVocabularyGenerated}
          onClose={() => setShowAIGenerator(false)}
        />
      )}
    </div>
  );
}

export default App;