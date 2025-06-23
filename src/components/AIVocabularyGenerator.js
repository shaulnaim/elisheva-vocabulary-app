import React, { useState } from 'react';

const AIVocabularyGenerator = ({ onVocabularyGenerated, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    interests: '',
    level: 'beginner',
    categories: []
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const availableCategories = [
    { id: 'body', label: 'חלקי גוף (Body Parts)', emoji: '🫀' },
    { id: 'family', label: 'משפחה (Family)', emoji: '👨‍👩‍👧‍👦' },
    { id: 'school', label: 'בית ספר (School)', emoji: '🏫' },
    { id: 'emotions', label: 'רגשות (Emotions)', emoji: '😊' },
    { id: 'actions', label: 'פעולות (Actions)', emoji: '🏃' },
    { id: 'colors', label: 'צבעים (Colors)', emoji: '🎨' },
    { id: 'food', label: 'אוכל (Food)', emoji: '🍎' },
    { id: 'animals', label: 'חיות (Animals)', emoji: '🐕' },
    { id: 'nature', label: 'טבע (Nature)', emoji: '🌳' },
    { id: 'sports', label: 'ספורט (Sports)', emoji: '⚽' },
    { id: 'technology', label: 'טכנולוגיה (Technology)', emoji: '💻' },
    { id: 'travel', label: 'נסיעות (Travel)', emoji: '✈️' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryToggle = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const generateAIVocabulary = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate AI vocabulary generation
      // In a real implementation, this would call an AI service like OpenAI GPT
      const generatedVocabulary = await simulateAIGeneration(formData);
      onVocabularyGenerated(generatedVocabulary);
    } catch (error) {
      console.error('Error generating vocabulary:', error);
      alert('שגיאה ביצירת המילים. אנא נסה שוב.');
    } finally {
      setIsGenerating(false);
    }
  };

  const simulateAIGeneration = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // This simulates an AI-generated vocabulary list
        // Based on the user's input parameters
        const ageBasedWords = getAgeAppropriateWords(data.age);
        const categoryWords = getCategoryWords(data.categories);
        const personalizedWords = getPersonalizedWords(data.name, data.interests);
        
        const vocabulary = [...ageBasedWords, ...categoryWords, ...personalizedWords]
          .slice(0, 50)
          .map((word, index) => ({
            id: `ai-${index}`,
            ...word
          }));
        
        resolve(vocabulary);
      }, 2000); // Simulate API delay
    });
  };

  const getAgeAppropriateWords = (age) => {
    const ageNum = parseInt(age);
    
    if (ageNum <= 8) {
      return [
        { english: "cat", phonetic: "קַט", hebrew: "חָתוּל", picture: "🐱", category: "animals" },
        { english: "dog", phonetic: "דאג", hebrew: "כֶּלֶב", picture: "🐕", category: "animals" },
        { english: "ball", phonetic: "באל", hebrew: "כַּדּוּר", picture: "⚽", category: "toys" },
        { english: "sun", phonetic: "סַן", hebrew: "שֶׁמֶשׁ", picture: "☀️", category: "nature" },
        { english: "moon", phonetic: "מוּן", hebrew: "יָרֵחַ", picture: "🌙", category: "nature" }
      ];
    } else if (ageNum <= 12) {
      return [
        { english: "computer", phonetic: "קוֹמְפְּיוּטֶר", hebrew: "מַחְשֵׁב", picture: "💻", category: "technology" },
        { english: "bicycle", phonetic: "בַּייסִיקַל", hebrew: "אוֹפַנַּיִם", picture: "🚲", category: "transport" },
        { english: "homework", phonetic: "הוֹמְוָרְק", hebrew: "שִׁעוּרֵי בַּיִת", picture: "📚", category: "school" },
        { english: "friend", phonetic: "פְרֶנְד", hebrew: "חָבֵר", picture: "👫", category: "social" }
      ];
    } else {
      return [
        { english: "responsibility", phonetic: "רִיסְפּוֹנְסִיבִילִיטִי", hebrew: "אַחְרָיוּת", picture: "🎯", category: "character" },
        { english: "independence", phonetic: "אִינְדִיפֶּנְדֶנְס", hebrew: "עַצְמָאוּת", picture: "🦅", category: "character" },
        { english: "achievement", phonetic: "אֲצִ'יבְמֶנְט", hebrew: "הַשָּׂגָה", picture: "🏆", category: "success" }
      ];
    }
  };

  const getCategoryWords = (categories) => {
    const categoryWordMap = {
      animals: [
        { english: "elephant", phonetic: "אֶלִיפַנְט", hebrew: "פִּיל", picture: "🐘", category: "animals" },
        { english: "lion", phonetic: "לַייוֹן", hebrew: "אַרְיֵה", picture: "🦁", category: "animals" }
      ],
      sports: [
        { english: "basketball", phonetic: "בַּאסְקֶטְבּוֹל", hebrew: "כַּדּוּרְסַל", picture: "🏀", category: "sports" },
        { english: "swimming", phonetic: "סְוִימִינְג", hebrew: "שְׂחִיָּה", picture: "🏊", category: "sports" }
      ],
      technology: [
        { english: "smartphone", phonetic: "סְמַארְטְפוֹן", hebrew: "טֶלֶפוֹן חָכָם", picture: "📱", category: "technology" },
        { english: "internet", phonetic: "אִינְטֶרְנֶט", hebrew: "אִינְטֶרְנֶט", picture: "🌐", category: "technology" }
      ]
    };

    return categories.flatMap(cat => categoryWordMap[cat] || []);
  };

  const getPersonalizedWords = (name, interests) => {
    // Generate words based on interests and name
    const interestWords = [];
    if (interests.toLowerCase().includes('music')) {
      interestWords.push(
        { english: "guitar", phonetic: "גִיטָר", hebrew: "גִיטָרָה", picture: "🎸", category: "music" },
        { english: "piano", phonetic: "פְּיַאנוֹ", hebrew: "פְּסַנְתֵּר", picture: "🎹", category: "music" }
      );
    }
    if (interests.toLowerCase().includes('art')) {
      interestWords.push(
        { english: "painting", phonetic: "פֵּיינְטִינְג", hebrew: "צִיּוּר", picture: "🎨", category: "art" },
        { english: "drawing", phonetic: "דְּרוֹאִינְג", hebrew: "רִישׁוּם", picture: "✏️", category: "art" }
      );
    }
    
    return interestWords;
  };

  return (
    <div className="ai-generator-overlay">
      <div className="ai-generator-modal">
        <div className="modal-header">
          <h2>🤖 מחולל מילים חכם</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="form-content">
          <div className="form-group">
            <label htmlFor="name">שם:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="הכנס את השם שלך"
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">גיל:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="הכנס את הגיל"
              min="5"
              max="18"
            />
          </div>

          <div className="form-group">
            <label htmlFor="interests">תחומי עניין:</label>
            <input
              type="text"
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleInputChange}
              placeholder="למשל: מוזיקה, ספורט, אמנות"
            />
          </div>

          <div className="form-group">
            <label htmlFor="level">רמת אנגלית:</label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleInputChange}
            >
              <option value="beginner">מתחיל</option>
              <option value="intermediate">בינוני</option>
              <option value="advanced">מתקדם</option>
            </select>
          </div>

          <div className="form-group">
            <label>קטגוריות מועדפות:</label>
            <div className="categories-grid">
              {availableCategories.map(category => (
                <button
                  key={category.id}
                  type="button"
                  className={`category-toggle ${formData.categories.includes(category.id) ? 'selected' : ''}`}
                  onClick={() => handleCategoryToggle(category.id)}
                >
                  {category.emoji} {category.label}
                </button>
              ))}
            </div>
          </div>

          <button
            className="generate-btn"
            onClick={generateAIVocabulary}
            disabled={isGenerating || !formData.name || !formData.age}
          >
            {isGenerating ? '🤖 יוצר מילים חכמות...' : '✨ צור רשימת מילים מותאמת אישית'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIVocabularyGenerator;