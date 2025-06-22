import React from 'react';

const CategoryFilter = ({ currentCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', label: 'כל המילים' },
    { id: 'body', label: 'חלקי גוף' },
    { id: 'health', label: 'בריאות' },
    { id: 'family', label: 'משפחה' },
    { id: 'house', label: 'בית' },
    { id: 'school', label: 'בית ספר' },
    { id: 'emotions', label: 'רגשות' },
    { id: 'actions', label: 'פעולות' },
    { id: 'descriptive', label: 'תיאורים' },
    { id: 'other', label: 'אחר' }
  ];

  return (
    <div className="category-filter">
      {categories.map(category => (
        <button
          key={category.id}
          className={`category-btn ${currentCategory === category.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;