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
        let finalWords = [];
        
        // If categories are selected, ONLY use words from those categories
        if (data.categories && data.categories.length > 0) {
          // Get all available words from all sources
          const categoryWords = getCategoryWords(data.categories);
          const ageBasedWords = getAgeAppropriateWords(data.age);
          const personalizedWords = getPersonalizedWords(data.name, data.interests);
          const additionalWords = getAdditionalWords(100); // Get more to have variety
          
          // Combine all word sources
          const allAvailableWords = [
            ...categoryWords,
            ...ageBasedWords,
            ...personalizedWords,
            ...additionalWords
          ];
          
          // STRICTLY filter to only selected categories
          const categoryFilteredWords = allAvailableWords.filter(word => 
            data.categories.includes(word.category)
          );
          
          // Remove duplicates
          const uniqueWords = categoryFilteredWords.filter((word, index, self) => 
            index === self.findIndex(w => w.english === word.english)
          );
          
          // Shuffle for variety
          const shuffled = [...uniqueWords];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          
          // Take exactly 50 words, or all available if less than 50
          finalWords = shuffled.slice(0, Math.min(50, shuffled.length));
          
          // If we don't have 50 words, pad with generic words but mark them clearly
          while (finalWords.length < 50) {
            const padWord = {
              english: `word${finalWords.length + 1}`,
              phonetic: `וָרְד ${finalWords.length + 1}`,
              hebrew: `מילה ${finalWords.length + 1}`,
              picture: "📝",
              category: data.categories[0] // Use first selected category
            };
            finalWords.push(padWord);
          }
          
        } else {
          // No categories selected - use age-appropriate mix
          const ageBasedWords = getAgeAppropriateWords(data.age);
          const personalizedWords = getPersonalizedWords(data.name, data.interests);
          const additionalWords = getAdditionalWords(50);
          
          // Combine all sources
          const allWords = [...ageBasedWords, ...personalizedWords, ...additionalWords];
          
          // Remove duplicates
          const uniqueWords = allWords.filter((word, index, self) => 
            index === self.findIndex(w => w.english === word.english)
          );
          
          // Shuffle for variety
          const shuffled = [...uniqueWords];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          
          finalWords = shuffled.slice(0, 50);
        }
        
        // Add IDs to final words
        const vocabulary = finalWords.map((word, index) => ({
          id: `ai-${index}`,
          ...word
        }));
        
        resolve(vocabulary);
      }, 2000); // Simulate AI delay
    });
  };

  const getAgeAppropriateWords = (age) => {
    const ageNum = parseInt(age);
    
    if (ageNum <= 8) {
      return [
        // Animals
        { english: "cat", phonetic: "קַט", hebrew: "חָתוּל", picture: "🐱", category: "animals" },
        { english: "dog", phonetic: "דאג", hebrew: "כֶּלֶב", picture: "🐕", category: "animals" },
        { english: "bird", phonetic: "בֶרְד", hebrew: "צִפּוֹר", picture: "🐦", category: "animals" },
        { english: "fish", phonetic: "פִישׁ", hebrew: "דָּג", picture: "🐟", category: "animals" },
        { english: "rabbit", phonetic: "רַבִּיט", hebrew: "אַרְנָב", picture: "🐰", category: "animals" },
        // Basic objects
        { english: "ball", phonetic: "באל", hebrew: "כַּדּוּר", picture: "⚽", category: "toys" },
        { english: "car", phonetic: "קַאר", hebrew: "מְכוֹנִית", picture: "🚗", category: "transport" },
        { english: "bike", phonetic: "בַּייק", hebrew: "אוֹפַנַּיִם", picture: "🚲", category: "transport" },
        { english: "book", phonetic: "בּוּק", hebrew: "סֵפֶר", picture: "📚", category: "school" },
        { english: "toy", phonetic: "טוֹיי", hebrew: "צַעֲצוּעַ", picture: "🧸", category: "toys" },
        // Nature
        { english: "sun", phonetic: "סַן", hebrew: "שֶׁמֶשׁ", picture: "☀️", category: "nature" },
        { english: "moon", phonetic: "מוּן", hebrew: "יָרֵחַ", picture: "🌙", category: "nature" },
        { english: "tree", phonetic: "טְרִי", hebrew: "עֵץ", picture: "🌳", category: "nature" },
        { english: "flower", phonetic: "פְלַאוֶר", hebrew: "פֶּרַח", picture: "🌸", category: "nature" },
        { english: "star", phonetic: "סְטַאר", hebrew: "כּוֹכָב", picture: "⭐", category: "nature" },
        // Body parts
        { english: "eye", phonetic: "אַיי", hebrew: "עַיִן", picture: "👁️", category: "body" },
        { english: "nose", phonetic: "נוֹז", hebrew: "אַף", picture: "👃", category: "body" },
        { english: "mouth", phonetic: "מַאוּת", hebrew: "פֶּה", picture: "👄", category: "body" },
        // Food
        { english: "apple", phonetic: "אַפַל", hebrew: "תַּפּוּחַ", picture: "🍎", category: "food" },
        { english: "banana", phonetic: "בַּנַאנָה", hebrew: "בַּנַאנָה", picture: "🍌", category: "food" }
      ];
    } else if (ageNum <= 12) {
      return [
        // Technology
        { english: "computer", phonetic: "קוֹמְפְּיוּטֶר", hebrew: "מַחְשֵׁב", picture: "💻", category: "technology" },
        { english: "phone", phonetic: "פוֹן", hebrew: "טֶלֶפוֹן", picture: "📱", category: "technology" },
        { english: "internet", phonetic: "אִינְטֶרְנֶט", hebrew: "אִינְטֶרְנֶט", picture: "🌐", category: "technology" },
        { english: "video", phonetic: "וִידֵאוֹ", hebrew: "סֶרֶט", picture: "📹", category: "technology" },
        // School
        { english: "homework", phonetic: "הוֹמְוָרְק", hebrew: "שִׁעוּרֵי בַּיִת", picture: "📚", category: "school" },
        { english: "teacher", phonetic: "טִיצ'ֶר", hebrew: "מוֹרֶה", picture: "👩‍🏫", category: "school" },
        { english: "student", phonetic: "סְטוּדֶנְט", hebrew: "תַּלְמִיד", picture: "👨‍🎓", category: "school" },
        { english: "classroom", phonetic: "קְלַאסְרוּם", hebrew: "כִּתָּה", picture: "🏫", category: "school" },
        { english: "lesson", phonetic: "לֶסוֹן", hebrew: "שִׁעוּר", picture: "📖", category: "school" },
        // Sports
        { english: "soccer", phonetic: "סוֹקֶר", hebrew: "כַּדּוּרֶגֶל", picture: "⚽", category: "sports" },
        { english: "basketball", phonetic: "בַּאסְקֶטְבּוֹל", hebrew: "כַּדּוּרְסַל", picture: "🏀", category: "sports" },
        { english: "swimming", phonetic: "סְוִימִינְג", hebrew: "שְׂחִיָּה", picture: "🏊", category: "sports" },
        // Social
        { english: "friend", phonetic: "פְרֶנְד", hebrew: "חָבֵר", picture: "👫", category: "social" },
        { english: "party", phonetic: "פַּארְטִי", hebrew: "מְסִיבָּה", picture: "🎉", category: "social" },
        { english: "game", phonetic: "גֵּיים", hebrew: "מִשְׂחָק", picture: "🎮", category: "entertainment" },
        // Adventure
        { english: "adventure", phonetic: "אַדְוֶנְצֶ'ר", hebrew: "הַרְפַּתְקָה", picture: "🗺️", category: "adventure" },
        { english: "journey", phonetic: "גֶ'רְנִי", hebrew: "מַסָּע", picture: "✈️", category: "travel" },
        { english: "explore", phonetic: "אֶקְסְפְלוֹר", hebrew: "לַחֲקוֹר", picture: "🔍", category: "adventure" }
      ];
    } else {
      return [
        // Character & Life Skills
        { english: "responsibility", phonetic: "רִיסְפּוֹנְסִיבִילִיטִי", hebrew: "אַחְרָיוּת", picture: "🎯", category: "character" },
        { english: "independence", phonetic: "אִינְדִיפֶּנְדֶנְס", hebrew: "עַצְמָאוּת", picture: "🦅", category: "character" },
        { english: "achievement", phonetic: "אֲצִ'יבְמֶנְט", hebrew: "הַשָּׂגָה", picture: "🏆", category: "success" },
        { english: "leadership", phonetic: "לִידֶרְשִׁיפּ", hebrew: "מַנְהִיגוּת", picture: "👑", category: "character" },
        { english: "creativity", phonetic: "קְרִיאֵיטִיבִיטִי", hebrew: "יְצִירָתִיוּת", picture: "🎨", category: "character" },
        { english: "determination", phonetic: "דִיטֶרְמִינֵיישֶׁן", hebrew: "נְחִישׁוּת", picture: "💪", category: "character" },
        // Academic
        { english: "mathematics", phonetic: "מַתֶמַטִיקְס", hebrew: "מַתֶמַטִיקָה", picture: "🔢", category: "academic" },
        { english: "science", phonetic: "סַייאֶנְס", hebrew: "מַדָּע", picture: "🔬", category: "academic" },
        { english: "literature", phonetic: "לִיטֶרַטוּר", hebrew: "סִפְרוּת", picture: "📚", category: "academic" },
        { english: "philosophy", phonetic: "פִילוֹסוֹפִי", hebrew: "פִילוֹסוֹפְיָה", picture: "🤔", category: "academic" },
        // Future & Career
        { english: "opportunity", phonetic: "אוֹפּוֹרְטוּנִיטִי", hebrew: "הַזְדַמְנוּת", picture: "🚪", category: "future" },
        { english: "career", phonetic: "קַרִיר", hebrew: "קַרִיֶרָה", picture: "💼", category: "future" },
        { english: "university", phonetic: "יוּנִיבֶרְסִיטִי", hebrew: "אוּנִיבֶרְסִיטָה", picture: "🎓", category: "education" },
        { english: "scholarship", phonetic: "סְקוֹלַרְשִׁיפּ", hebrew: "מִלְגָה", picture: "💰", category: "education" },
        // Technology & Innovation
        { english: "innovation", phonetic: "אִינוֹבֵיישֶׁן", hebrew: "חִידּוּשׁ", picture: "💡", category: "technology" },
        { english: "artificial", phonetic: "אַרְטִיפִישֶׁל", hebrew: "מְלַאכוּתִי", picture: "🤖", category: "technology" }
      ];
    }
  };

  const getCategoryWords = (categories) => {
    const categoryWordMap = {
      animals: [
        { english: "elephant", phonetic: "אֶלִיפַנְט", hebrew: "פִּיל", picture: "🐘", category: "animals" },
        { english: "lion", phonetic: "לַייוֹן", hebrew: "אַרְיֵה", picture: "🦁", category: "animals" },
        { english: "tiger", phonetic: "טַייגֶר", hebrew: "נָמֵר", picture: "🐅", category: "animals" },
        { english: "monkey", phonetic: "מַנְקִי", hebrew: "קוֹף", picture: "🐒", category: "animals" },
        { english: "giraffe", phonetic: "ג'ִירַאף", hebrew: "זַרָף", picture: "🦒", category: "animals" },
        { english: "dolphin", phonetic: "דוֹלְפִין", hebrew: "דּוֹלְפִין", picture: "🐬", category: "animals" },
        { english: "penguin", phonetic: "פֶּנְגְוִין", hebrew: "פִּינְגְוִין", picture: "🐧", category: "animals" },
        { english: "butterfly", phonetic: "בַּטֶרְפְלַיי", hebrew: "פַּרְפַּר", picture: "🦋", category: "animals" }
      ],
      sports: [
        { english: "basketball", phonetic: "בַּאסְקֶטְבּוֹל", hebrew: "כַּדּוּרְסַל", picture: "🏀", category: "sports" },
        { english: "swimming", phonetic: "סְוִימִינְג", hebrew: "שְׂחִיָּה", picture: "🏊", category: "sports" },
        { english: "tennis", phonetic: "טֶנִיס", hebrew: "טֶנִיס", picture: "🎾", category: "sports" },
        { english: "running", phonetic: "רַנִינְג", hebrew: "רִיצָה", picture: "🏃", category: "sports" },
        { english: "cycling", phonetic: "סַייקְלִינְג", hebrew: "רְכִיבָה", picture: "🚴", category: "sports" },
        { english: "volleyball", phonetic: "וואלִיבּוֹל", hebrew: "כַּדּוּרֶעָף", picture: "🏐", category: "sports" },
        { english: "hockey", phonetic: "הוֹקִי", hebrew: "הוֹקִי", picture: "🏒", category: "sports" },
        { english: "gymnastics", phonetic: "ג'ִימְנַסְטִיקְס", hebrew: "הִתְעַמְלוּת", picture: "🤸", category: "sports" }
      ],
      technology: [
        { english: "smartphone", phonetic: "סְמַארְטְפוֹן", hebrew: "טֶלֶפוֹן חָכָם", picture: "📱", category: "technology" },
        { english: "internet", phonetic: "אִינְטֶרְנֶט", hebrew: "אִינְטֶרְנֶט", picture: "🌐", category: "technology" },
        { english: "laptop", phonetic: "לַפְטוֹפּ", hebrew: "מַחְשֵׁב נַיָד", picture: "💻", category: "technology" },
        { english: "tablet", phonetic: "טַבְלֶט", hebrew: "לוּחַ", picture: "📱", category: "technology" },
        { english: "robot", phonetic: "רוֹבּוֹט", hebrew: "רוֹבּוֹט", picture: "🤖", category: "technology" },
        { english: "software", phonetic: "סוֹפְטְוֶר", hebrew: "תוֹכְנָה", picture: "💿", category: "technology" },
        { english: "website", phonetic: "וֶבְסַייט", hebrew: "אֲתַר", picture: "🌐", category: "technology" },
        { english: "application", phonetic: "אַפְלִיקֵיישֶׁן", hebrew: "יִישׁוּם", picture: "📲", category: "technology" }
      ],
      food: [
        { english: "pizza", phonetic: "פִּיצָה", hebrew: "פִּיצָה", picture: "🍕", category: "food" },
        { english: "hamburger", phonetic: "הַמְבּוּרְגֶר", hebrew: "הַמְבּוּרְגֶר", picture: "🍔", category: "food" },
        { english: "sandwich", phonetic: "סַנְדְוִיץ'", hebrew: "כְּרִיךְ", picture: "🥪", category: "food" },
        { english: "chocolate", phonetic: "צ'וֹקְלַט", hebrew: "שׁוֹקוֹלָד", picture: "🍫", category: "food" },
        { english: "ice cream", phonetic: "אַייס קְרִים", hebrew: "גְּלִידָה", picture: "🍦", category: "food" },
        { english: "cookie", phonetic: "קוּקִי", hebrew: "עוּגִיָּה", picture: "🍪", category: "food" },
        { english: "orange", phonetic: "אוֹרַנְג'", hebrew: "תַּפּוּז", picture: "🍊", category: "food" },
        { english: "strawberry", phonetic: "סְטְרוֹבֶּרִי", hebrew: "תּוּת", picture: "🍓", category: "food" }
      ],
      colors: [
        { english: "rainbow", phonetic: "רֵיינְבּוֹ", hebrew: "קֶשֶׁת", picture: "🌈", category: "colors" },
        { english: "bright", phonetic: "בְּרַייט", hebrew: "בָּהִיר", picture: "✨", category: "colors" },
        { english: "dark", phonetic: "דַּארְק", hebrew: "כָּהֶה", picture: "🌑", category: "colors" },
        { english: "colorful", phonetic: "קַלַרְפוּל", hebrew: "צִבְעוֹנִי", picture: "🎨", category: "colors" },
        { english: "silver", phonetic: "סִילְבֶר", hebrew: "כֶּסֶף", picture: "🥈", category: "colors" },
        { english: "golden", phonetic: "גוֹלְדֶן", hebrew: "זָהָב", picture: "🥇", category: "colors" },
        { english: "pink", phonetic: "פִּינְק", hebrew: "וָרוֹד", picture: "🌸", category: "colors" },
        { english: "brown", phonetic: "בְּרַאוּן", hebrew: "חוּם", picture: "🟤", category: "colors" }
      ],
      music: [
        { english: "guitar", phonetic: "גִיטָר", hebrew: "גִיטָרָה", picture: "🎸", category: "music" },
        { english: "piano", phonetic: "פְּיַאנוֹ", hebrew: "פְּסַנְתֵּר", picture: "🎹", category: "music" },
        { english: "drums", phonetic: "דְּרַאמְס", hebrew: "תֻּפִּים", picture: "🥁", category: "music" },
        { english: "violin", phonetic: "וַייוֹלִין", hebrew: "כִּינוֹר", picture: "🎻", category: "music" },
        { english: "microphone", phonetic: "מַייקְרוֹפוֹן", hebrew: "מִיקְרוֹפוֹן", picture: "🎤", category: "music" },
        { english: "concert", phonetic: "קוֹנְסֶרְט", hebrew: "קוֹנְצֶרְט", picture: "🎵", category: "music" },
        { english: "melody", phonetic: "מֶלוֹדִי", hebrew: "לַחַן", picture: "🎶", category: "music" },
        { english: "rhythm", phonetic: "רִיתֶם", hebrew: "קֶצֶב", picture: "🎵", category: "music" }
      ],
      art: [
        { english: "painting", phonetic: "פֵּיינְטִינְג", hebrew: "צִיּוּר", picture: "🎨", category: "art" },
        { english: "drawing", phonetic: "דְּרוֹאִינְג", hebrew: "רִישׁוּם", picture: "✏️", category: "art" },
        { english: "sculpture", phonetic: "סְקַלְפְּצֶ'ר", hebrew: "פֶּסֶל", picture: "🗿", category: "art" },
        { english: "museum", phonetic: "מְיוּזִיאַם", hebrew: "מוּזֵיאוֹן", picture: "🏛️", category: "art" },
        { english: "gallery", phonetic: "גַּלֶרִי", hebrew: "גַּלֶרְיָה", picture: "🖼️", category: "art" },
        { english: "artist", phonetic: "אַרְטִיסְט", hebrew: "אַמָן", picture: "🎭", category: "art" },
        { english: "creative", phonetic: "קְרִיאֵיטִיב", hebrew: "יְצִירָתִי", picture: "💡", category: "art" },
        { english: "masterpiece", phonetic: "מַאסְטֶרְפִּיס", hebrew: "יְצִירַת מֶופֶת", picture: "🏆", category: "art" }
      ],
      body: [
        { english: "shoulder", phonetic: "שׁוֹלְדֶר", hebrew: "כָּתֵף", picture: "🤷", category: "body" },
        { english: "finger", phonetic: "פִינְגֶר", hebrew: "אֶצְבַּע", picture: "👆", category: "body" },
        { english: "foot", phonetic: "פוּט", hebrew: "רֶגֶל", picture: "🦶", category: "body" },
        { english: "back", phonetic: "בַּק", hebrew: "גַּב", picture: "🧍", category: "body" },
        { english: "stomach", phonetic: "סְטַמַק", hebrew: "בֶּטֶן", picture: "🫃", category: "body" },
        { english: "face", phonetic: "פֵּייס", hebrew: "פָּנִים", picture: "😊", category: "body" },
        { english: "hair", phonetic: "הֶר", hebrew: "שֵׂעָר", picture: "💇", category: "body" },
        { english: "teeth", phonetic: "טִיס", hebrew: "שִׁינַיִם", picture: "🦷", category: "body" }
      ],
      family: [
        { english: "parents", phonetic: "פֶּרֶנְטְס", hebrew: "הוֹרִים", picture: "👨‍👩", category: "family" },
        { english: "grandmother", phonetic: "גְרַנְדְמַאדֶר", hebrew: "סָבְתָּא", picture: "👵", category: "family" },
        { english: "grandfather", phonetic: "גְרַנְדְפַאדֶר", hebrew: "סָבָּא", picture: "👴", category: "family" },
        { english: "aunt", phonetic: "אַנְט", hebrew: "דּוֹדָה", picture: "👩", category: "family" },
        { english: "uncle", phonetic: "אַנְקַל", hebrew: "דּוֹד", picture: "👨", category: "family" },
        { english: "cousin", phonetic: "קַאזִין", hebrew: "בֶּן דּוֹד/בַּת דּוֹדָה", picture: "👦", category: "family" },
        { english: "baby", phonetic: "בֵּייבִּי", hebrew: "תִּינוֹק", picture: "👶", category: "family" },
        { english: "child", phonetic: "צ'ַיילְד", hebrew: "יֶלֶד", picture: "🧒", category: "family" }
      ],
      school: [
        { english: "classroom", phonetic: "קְלַאסְרוּם", hebrew: "כִּתָּה", picture: "🏫", category: "school" },
        { english: "teacher", phonetic: "טִיצ'ֶר", hebrew: "מוֹרֶה/מוֹרָה", picture: "👩‍🏫", category: "school" },
        { english: "student", phonetic: "סְטוּדֶנְט", hebrew: "תַּלְמִיד/תַּלְמִידָה", picture: "👨‍🎓", category: "school" },
        { english: "homework", phonetic: "הוֹמְוָרְק", hebrew: "שִׁעוּרֵי בַּיִת", picture: "📚", category: "school" },
        { english: "test", phonetic: "טֶסְט", hebrew: "מִבְחָן", picture: "📝", category: "school" },
        { english: "book", phonetic: "בּוּק", hebrew: "סֵפֶר", picture: "📚", category: "school" },
        { english: "pencil", phonetic: "פֶּנְסִיל", hebrew: "עִפָּרוֹן", picture: "✏️", category: "school" },
        { english: "lesson", phonetic: "לֶסוֹן", hebrew: "שִׁעוּר", picture: "📖", category: "school" }
      ],
      emotions: [
        { english: "happy", phonetic: "הַפִּי", hebrew: "שָׂמֵחַ", picture: "😊", category: "emotions" },
        { english: "sad", phonetic: "סַד", hebrew: "עָצוּב", picture: "😢", category: "emotions" },
        { english: "angry", phonetic: "אַנְגְרִי", hebrew: "כּוֹעֵס", picture: "😠", category: "emotions" },
        { english: "excited", phonetic: "אֶקְסַייטֶד", hebrew: "נִרְגָּשׁ", picture: "🤩", category: "emotions" },
        { english: "scared", phonetic: "סְקֶרְד", hebrew: "מְפַחֵד", picture: "😨", category: "emotions" },
        { english: "surprised", phonetic: "סֶרְפְּרַיזְד", hebrew: "מֻפְתָּע", picture: "😮", category: "emotions" },
        { english: "tired", phonetic: "טַייֶרְד", hebrew: "עָיֵף", picture: "😴", category: "emotions" },
        { english: "love", phonetic: "לַאב", hebrew: "אַהֲבָה", picture: "❤️", category: "emotions" }
      ],
      actions: [
        { english: "walk", phonetic: "וואלְק", hebrew: "לָלֶכֶת", picture: "🚶", category: "actions" },
        { english: "run", phonetic: "רַן", hebrew: "לָרוּץ", picture: "🏃", category: "actions" },
        { english: "jump", phonetic: "גַ'אמְפּ", hebrew: "לִקְפֹּץ", picture: "🦘", category: "actions" },
        { english: "read", phonetic: "רִיד", hebrew: "לִקְרֹא", picture: "📖", category: "actions" },
        { english: "write", phonetic: "רַייט", hebrew: "לִכְתֹּב", picture: "✍️", category: "actions" },
        { english: "speak", phonetic: "סְפִיק", hebrew: "לְדַבֵּר", picture: "💬", category: "actions" },
        { english: "listen", phonetic: "לִיסְטֶן", hebrew: "לְהַקְשִׁיב", picture: "👂", category: "actions" },
        { english: "think", phonetic: "תִינְק", hebrew: "לַחְשֹׁב", picture: "🤔", category: "actions" }
      ],
      nature: [
        { english: "tree", phonetic: "טְרִי", hebrew: "עֵץ", picture: "🌳", category: "nature" },
        { english: "flower", phonetic: "פְלַאוֶר", hebrew: "פֶּרַח", picture: "🌸", category: "nature" },
        { english: "sun", phonetic: "סַן", hebrew: "שֶׁמֶשׁ", picture: "☀️", category: "nature" },
        { english: "moon", phonetic: "מוּן", hebrew: "יָרֵחַ", picture: "🌙", category: "nature" },
        { english: "star", phonetic: "סְטַאר", hebrew: "כּוֹכָב", picture: "⭐", category: "nature" },
        { english: "sky", phonetic: "סְקַיי", hebrew: "שָׁמַיִם", picture: "☁️", category: "nature" },
        { english: "ocean", phonetic: "אוֹשֶׁן", hebrew: "אוֹקְיַנוֹס", picture: "🌊", category: "nature" },
        { english: "mountain", phonetic: "מַאוּנְטֶן", hebrew: "הַר", picture: "⛰️", category: "nature" }
      ],
      travel: [
        { english: "airplane", phonetic: "אֶרְפְלֵיין", hebrew: "מָטוֹס", picture: "✈️", category: "travel" },
        { english: "car", phonetic: "קַאר", hebrew: "מְכוֹנִית", picture: "🚗", category: "travel" },
        { english: "train", phonetic: "טְרֵיין", hebrew: "רַכֶּבֶת", picture: "🚂", category: "travel" },
        { english: "bus", phonetic: "בַּאס", hebrew: "אוֹטוֹבּוּס", picture: "🚌", category: "travel" },
        { english: "hotel", phonetic: "הוֹטֶל", hebrew: "מָלוֹן", picture: "🏨", category: "travel" },
        { english: "airport", phonetic: "אֶרְפּוֹרְט", hebrew: "נְמַל תְּעוּפָה", picture: "✈️", category: "travel" },
        { english: "vacation", phonetic: "וֵיקֵיישֶׁן", hebrew: "חֻפְשָׁה", picture: "🏖️", category: "travel" },
        { english: "journey", phonetic: "גֶ'רְנִי", hebrew: "מַסָּע", picture: "🗺️", category: "travel" }
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

  const getAdditionalWords = (count) => {
    // Additional common words to fill up to 50 if needed
    const additionalWords = [
      // Actions
      { english: "run", phonetic: "רַן", hebrew: "לָרוּץ", picture: "🏃", category: "actions" },
      { english: "sleep", phonetic: "סְלִיפּ", hebrew: "לִישׁוֹן", picture: "😴", category: "actions" },
      { english: "eat", phonetic: "אִיט", hebrew: "לֶאֱכֹל", picture: "🍽️", category: "actions" },
      { english: "drink", phonetic: "דְּרִינְק", hebrew: "לִשְׁתּוֹת", picture: "🥤", category: "actions" },
      { english: "play", phonetic: "פְּלֵיי", hebrew: "לְשַׂחֵק", picture: "🎮", category: "actions" },
      { english: "watch", phonetic: "וואטְשׁ", hebrew: "לִצְפּוֹת", picture: "👀", category: "actions" },
      { english: "listen", phonetic: "לִיסְטֶן", hebrew: "לְהַקְשִׁיב", picture: "👂", category: "actions" },
      { english: "dance", phonetic: "דַּאנְס", hebrew: "לִרְקֹד", picture: "💃", category: "actions" },
      { english: "sing", phonetic: "סִינְג", hebrew: "לָשִׁיר", picture: "🎤", category: "actions" },
      { english: "cook", phonetic: "קוּק", hebrew: "לְבַשֵּׁל", picture: "👨‍🍳", category: "actions" },
      
      // Body parts
      { english: "face", phonetic: "פֵּייס", hebrew: "פָּנִים", picture: "😊", category: "body" },
      { english: "hair", phonetic: "הֶר", hebrew: "שֵׂעָר", picture: "💇", category: "body" },
      { english: "teeth", phonetic: "טִיס", hebrew: "שִׁינַיִם", picture: "🦷", category: "body" },
      { english: "heart", phonetic: "הַארְט", hebrew: "לֵב", picture: "❤️", category: "body" },
      
      // Family
      { english: "family", phonetic: "פַמִילִי", hebrew: "מִשְׁפָּחָה", picture: "👨‍👩‍👧‍👦", category: "family" },
      { english: "child", phonetic: "צ'ַיילְד", hebrew: "יֶלֶד", picture: "🧒", category: "family" },
      { english: "son", phonetic: "סַן", hebrew: "בֵּן", picture: "👦", category: "family" },
      { english: "daughter", phonetic: "דּוֹטֶר", hebrew: "בַּת", picture: "👧", category: "family" },
      
      // School
      { english: "school", phonetic: "סְקוּל", hebrew: "בֵּית סֵפֶר", picture: "🏫", category: "school" },
      { english: "lesson", phonetic: "לֶסוֹן", hebrew: "שִׁעוּר", picture: "📖", category: "school" },
      { english: "exam", phonetic: "אֶגְזַם", hebrew: "מִבְחָן", picture: "📝", category: "school" },
      { english: "answer", phonetic: "אַנְסֶר", hebrew: "תְּשׁוּבָה", picture: "✅", category: "school" },
      
      // Emotions
      { english: "smile", phonetic: "סְמַיל", hebrew: "חִיּוּךְ", picture: "😊", category: "emotions" },
      { english: "laugh", phonetic: "לַאף", hebrew: "צְחוֹק", picture: "😂", category: "emotions" },
      { english: "calm", phonetic: "קַאלְם", hebrew: "רָגוּעַ", picture: "😌", category: "emotions" },
      { english: "brave", phonetic: "בְּרֵייב", hebrew: "אַמִּיץ", picture: "🦁", category: "emotions" },
      
      // Colors
      { english: "bright", phonetic: "בְּרַייט", hebrew: "בָּהִיר", picture: "✨", category: "colors" },
      { english: "dark", phonetic: "דַּארְק", hebrew: "כָּהֶה", picture: "🌑", category: "colors" },
      { english: "colorful", phonetic: "קַלַרְפוּל", hebrew: "צִבְעוֹנִי", picture: "🎨", category: "colors" },
      { english: "silver", phonetic: "סִילְבֶר", hebrew: "כֶּסֶף", picture: "🥈", category: "colors" },
      
      // Food
      { english: "rice", phonetic: "רַיס", hebrew: "אֹרֶז", picture: "🍚", category: "food" },
      { english: "soup", phonetic: "סוּפּ", hebrew: "מָרָק", picture: "🍲", category: "food" },
      { english: "cake", phonetic: "קֵייק", hebrew: "עוּגָה", picture: "🍰", category: "food" },
      { english: "juice", phonetic: "גֻ'וּס", hebrew: "מִיץ", picture: "🧃", category: "food" },
      
      // Animals
      { english: "horse", phonetic: "הוֹרְס", hebrew: "סוּס", picture: "🐴", category: "animals" },
      { english: "bear", phonetic: "בֶר", hebrew: "דֹּב", picture: "🐻", category: "animals" },
      { english: "wolf", phonetic: "וולְף", hebrew: "זְאֵב", picture: "🐺", category: "animals" },
      { english: "sheep", phonetic: "שִׁיפּ", hebrew: "כֶּבֶשׂ", picture: "🐑", category: "animals" },
      
      // Nature
      { english: "forest", phonetic: "פוֹרֶסְט", hebrew: "יַעַר", picture: "🌲", category: "nature" },
      { english: "river", phonetic: "רִיבֶר", hebrew: "נָהָר", picture: "🏞️", category: "nature" },
      { english: "grass", phonetic: "גְרַאס", hebrew: "עֵשֶׂב", picture: "🌱", category: "nature" },
      { english: "stone", phonetic: "סְטוֹן", hebrew: "אֶבֶן", picture: "🪨", category: "nature" },
      
      // Sports
      { english: "game", phonetic: "גֵּיים", hebrew: "מִשְׂחָק", picture: "🎮", category: "sports" },
      { english: "team", phonetic: "טִים", hebrew: "קְבוּצָה", picture: "👥", category: "sports" },
      { english: "win", phonetic: "וִין", hebrew: "לְנַצֵּחַ", picture: "🏆", category: "sports" },
      { english: "race", phonetic: "רֵייס", hebrew: "מֵרוֹץ", picture: "🏁", category: "sports" },
      
      // Technology
      { english: "screen", phonetic: "סְקְרִין", hebrew: "מָסָךְ", picture: "📺", category: "technology" },
      { english: "keyboard", phonetic: "קִיבוֹרְד", hebrew: "מַקְלֶדֶת", picture: "⌨️", category: "technology" },
      { english: "mouse", phonetic: "מַאוּס", hebrew: "עַכְבָּר", picture: "🖱️", category: "technology" },
      { english: "game", phonetic: "גֵּיים", hebrew: "מִשְׂחָק", picture: "🎮", category: "technology" },
      
      // Travel
      { english: "trip", phonetic: "טְרִיפּ", hebrew: "טִיוּל", picture: "🧳", category: "travel" },
      { english: "hotel", phonetic: "הוֹטֶל", hebrew: "מָלוֹן", picture: "🏨", category: "travel" },
      { english: "airport", phonetic: "אֶרְפּוֹרְט", hebrew: "נְמַל תְּעוּפָה", picture: "✈️", category: "travel" },
      { english: "vacation", phonetic: "וֵיקֵיישֶׁן", hebrew: "חֻפְשָׁה", picture: "🏖️", category: "travel" }
    ];
    
    // Shuffle additional words and return the requested count
    const shuffled = [...additionalWords];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled.slice(0, count);
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