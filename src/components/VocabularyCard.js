import React, { useState } from 'react';

const VocabularyCard = ({ word, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete();
  };

  const speakWord = () => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(word.english);
      utterance.lang = 'en-US';
      utterance.rate = 0.8; // Slightly slower for better learning
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="card-wrapper" onMouseEnter={speakWord}>
      <button className="delete-btn" onClick={handleDeleteClick}>×</button>
      <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
        <div className="card-face card-front">
          <div className="voice-indicator">🔊</div>
          <div className="english-word">{word.english}</div>
          <div className="phonetic-pronunciation">{word.phonetic}</div>
        </div>
        <div className="card-face card-back">
          <div className="picture">{word.picture}</div>
          <div className="hebrew-word">{word.hebrew}</div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyCard;