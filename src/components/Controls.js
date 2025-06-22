import React from 'react';

const Controls = ({ onReset, onShuffle }) => {
  return (
    <div className="controls">
      <button className="btn" onClick={onReset}>
        🔄 להתחיל מהתחלה
      </button>
      <button className="btn" onClick={onShuffle}>
        🔀 לערבב
      </button>
    </div>
  );
};

export default Controls;