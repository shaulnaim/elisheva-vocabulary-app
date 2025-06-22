# Hebrew Vocabulary Learning App

> **🎯 הכנה למבחן באנגלית של אלישבע חנה נעים**  
> *Preparation for Elisheva Chana Naim's English Test*

A React-based interactive flashcard application for learning Hebrew vocabulary with English translations. Designed specifically to help Elisheva prepare for her English test with 130 carefully curated vocabulary words.

## 🚀 Live Demo

**[Try the app here →](https://shaulnaim.github.io/elisheva-vocabulary-app)**

## ✨ Features

- **Interactive Flashcards**: Click to flip between English and Hebrew translations
- **Category Filtering**: Organize words by semantic categories (body parts, emotions, actions, etc.)
- **Progress Tracking**: Mark mastered words and track learning progress
- **Card Management**: Reset progress or shuffle card order
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Hebrew Support**: Proper RTL (right-to-left) text direction for Hebrew content
- **Visual Learning**: Emoji icons to aid memory and comprehension

## 📚 Vocabulary Categories

The app includes 130 words across 11 categories:

- 🫀 **Body Parts** (חלקי גוף) - head, eye, nose, mouth, hand, leg, arm
- 🏥 **Health** (בריאות) - doctor, medicine, healthy, sick, glasses
- 👨‍👩‍👧‍👦 **Family** (משפחה) - mother, father, sister, brother, grandmother, aunt
- 🏠 **House** (בית) - kitchen, bedroom, bathroom, window, door, table, chair
- 🏫 **School** (בית ספר) - teacher, student, book, pencil, paper, learn, write
- 😊 **Emotions** (רגשות) - happy, sad, angry, excited, tired, confused
- 🏃 **Actions** (פעולות) - walk, read, think, make, clean, understand, speak
- 🎨 **Colors** (צבעים) - red, blue, green, yellow, white, black, orange, purple
- 🍎 **Food** (אוכל) - apple, bread, water, milk, egg, fish, meat, cheese
- 📝 **Descriptive** (תיאורים) - poor, expensive, delicious, best, alone
- 🔤 **Other** (אחר) - help, word, together, today, tomorrow, yesterday

## 🛠️ Technology Stack

- **Frontend**: React 18 with functional components and hooks
- **Styling**: CSS3 with flexbox/grid, animations, and responsive design
- **Build Tool**: Create React App
- **Deployment**: GitHub Pages
- **Version Control**: Git & GitHub

## 📦 Installation & Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/shaulnaim/elisheva-vocabulary-app.git
cd elisheva-vocabulary-app

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`.

### Available Scripts

```bash
npm start      # Run development server
npm run build  # Create production build
npm test       # Run tests
npm run deploy # Deploy to GitHub Pages
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── VocabularyCard.js    # Individual flashcard component
│   ├── CategoryFilter.js    # Category selection buttons
│   └── Controls.js          # Reset and shuffle controls
├── data/
│   └── vocabularyData.js    # All vocabulary words and definitions
├── App.js                   # Main application component
├── App.css                  # Global styles
└── index.js                 # React app entry point
```

## 🎨 Key Components

### VocabularyCard
- Handles card flip animations
- Displays English/Hebrew/emoji content
- Manages individual card deletion

### CategoryFilter
- Hebrew category labels
- Active state management
- Filters vocabulary by category

### App (Main Component)
- State management with React hooks
- Card filtering and manipulation
- Progress tracking logic

## 📱 User Experience

1. **Learning Flow**: Start with "כל המילים" (All Words) or select a specific category
2. **Study Method**: Click cards to reveal Hebrew translations and emoji aids
3. **Progress Tracking**: Delete mastered words using the × button
4. **Review Options**: Use shuffle to randomize order, or reset to start over
5. **Completion**: Celebrate when all words in a category are mastered!

## 🌐 Deployment

The app is automatically deployed to GitHub Pages when changes are pushed to the main branch.

To deploy manually:
```bash
npm run deploy
```

## 📄 Data Structure

Each vocabulary entry contains:
```javascript
{
  english: "word",           // English word
  phonetic: "pronunciation", // Phonetic spelling
  hebrew: "מילה",            // Hebrew translation
  picture: "🔤",            // Emoji representation
  category: "other"         // Semantic category
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Acknowledgments

- Created for Elisheva Chana Naim's English test preparation
- Built with ❤️ using React and modern web technologies
- Hebrew vocabulary curated for educational effectiveness

---

**Good luck with your English test, Elisheva! 🍀 בהצלחה!**