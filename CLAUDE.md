# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hebrew vocabulary learning application called "הכנה למבחן באנגלית של אלישבע חנה נעים" (Preparation for Elisheva Chana Naim's English Test). It's a React single-page application with modern component architecture.

## Architecture

- **React Application**: Modern React app using functional components and hooks
- **Component-Based**: Modular components for cards, filters, and controls
- **Create React App**: Built with create-react-app for development tooling
- **ES6 Modules**: Clean separation of data, components, and styling

## Key Components

### Vocabulary Data Structure
Each vocabulary entry contains:
- `english`: English word
- `phonetic`: Phonetic spelling (mix of English and Hebrew)  
- `hebrew`: Hebrew translation
- `picture`: Emoji representation
- `category`: Word category (body, health, family, house, school, emotions, actions, descriptive, other)

### Core Features
- **Flashcard System**: Click cards to flip between English and Hebrew
- **Category Filtering**: Filter words by semantic categories
- **Progress Tracking**: Delete mastered words and track progress
- **Card Management**: Reset all cards or shuffle order
- **Responsive Design**: Works on mobile and desktop

## Development

### Setup and Installation
```bash
# Install dependencies
npm install
```

### Running the Application
```bash
# Start development server
npm start
# Opens http://localhost:3000 in browser

# Build for production
npm run build

# Run tests
npm test
```

### Testing
- Manual testing: Run `npm start` and test functionality in browser
- Unit tests can be added using React Testing Library (included with create-react-app)

## Code Organization

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

### Key React Components
- **App**: Main component managing state and rendering layout
- **VocabularyCard**: Individual flashcard with flip animation and delete functionality
- **CategoryFilter**: Category selection with Hebrew labels
- **Controls**: Reset and shuffle buttons

### State Management
- `activeCards`: Currently displayed vocabulary (filtered from main dataset)
- `deletedCards`: Words marked as mastered by the user
- `currentCategory`: Selected category filter ('all' or specific category)

## Data Management

The vocabulary list contains 75 words across 9 categories, stored in `src/data/vocabularyData.js`. State is managed using React hooks:
- `activeCards`: Currently displayed vocabulary (starts as copy of full dataset)
- `deletedCards`: Words marked as mastered by user
- Cards are filtered by category and rendered dynamically

## UI/UX Notes

- RTL (right-to-left) text direction for Hebrew content
- Gradient backgrounds and card flip animations
- Category-based color coding for better organization
- Mobile-responsive grid layout