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

  return (
    <div className="card-wrapper">
      <button className="delete-btn" onClick={handleDeleteClick}>×</button>
      <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
        <div className="card-face card-front">
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