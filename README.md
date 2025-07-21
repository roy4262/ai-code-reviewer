# 🚀 AI Code Reviewer

A powerful, modern web application that uses Google's Gemini AI to provide comprehensive code reviews and analysis. Built with React 19 and enhanced with advanced features for a professional development experience.

## ✨ Features

### 🔍 **Advanced Code Analysis**
- **Multi-language Support**: Auto-detects or manually select from 14+ programming languages
- **Comprehensive Reviews**: Detailed analysis including bugs, performance, security, and best practices
- **Structured Output**: Well-formatted reviews with clear sections and ratings

### 🎨 **Modern UI/UX**
- **Dark/Light Theme**: Seamless theme switching with system preference detection
- **Syntax Highlighting**: Beautiful code preview with language-specific highlighting
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Glass Morphism**: Modern design with backdrop blur effects

### 📁 **File Management**
- **File Upload**: Drag & drop or click to upload code files
- **Auto Language Detection**: Automatically detects language from file extensions
- **Copy/Paste Support**: Easy code input with clipboard integration

### 📊 **Productivity Features**
- **Review History**: Automatic saving of past reviews with timestamps
- **Export Options**: Export reviews as PDF or text files
- **Code Statistics**: Real-time character, word, and line counts
- **Quick Actions**: Copy, clear, and reload functionality

### 🔧 **Developer Experience**
- **Error Handling**: Comprehensive error messages and recovery
- **Loading States**: Beautiful loading animations with progress indicators
- **Toast Notifications**: User-friendly feedback for all actions
- **Keyboard Shortcuts**: Efficient navigation and actions

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS
- **AI Integration**: Google Gemini 2.0 Flash
- **Syntax Highlighting**: Prism.js, React Syntax Highlighter
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **PDF Export**: jsPDF
- **State Management**: React Hooks + Local Storage

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd code-reviewer
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Gemini API key:
   ```env
   REACT_APP_GEMINI_API=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Getting Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env` file

## 📖 Usage

### Basic Code Review
1. **Paste or upload your code** in the editor
2. **Select the programming language** (or use auto-detect)
3. **Click "Review Code"** to start the AI analysis
4. **View the comprehensive review** with structured feedback

### Advanced Features
- **Preview Mode**: Toggle between edit and preview modes
- **Export Results**: Save reviews as PDF or text files
- **History Access**: Click the history button to view past reviews
- **Theme Toggle**: Switch between dark and light themes

### Supported Languages
- JavaScript/TypeScript
- Python
- Java
- C/C++
- C#
- PHP
- Ruby
- Go
- Rust
- HTML/CSS
- SQL
- And more...

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── CodeEditor.jsx   # Advanced code input with syntax highlighting
│   ├── ReviewResult.jsx # Formatted review display
│   ├── ReviewHistory.jsx# History management
│   └── LoadingSpinner.jsx# Loading animations
├── hooks/               # Custom React hooks
│   └── useLocalStorage.js# Local storage management
├── utils/               # Utility functions
│   └── codeAnalyzer.js  # AI integration and analysis
├── Components/          # Main page components
│   └── Home.jsx         # Main application component
└── styles/              # CSS and styling
    └── index.css        # Global styles and animations
```

## 🎯 Key Components

### CodeAnalyzer Class
- Handles AI communication
- Language detection
- Error handling and retries
- Structured prompt engineering

### Custom Hooks
- `useLocalStorage`: Persistent state management
- `useReviewHistory`: Review history management

### UI Components
- **CodeEditor**: Advanced code input with preview
- **ReviewResult**: Formatted output with export options
- **ReviewHistory**: Session management and history
- **LoadingSpinner**: Engaging loading states

## 🔧 Configuration

### Environment Variables
```env
REACT_APP_GEMINI_API=your_api_key_here
NODE_ENV=development
```

### Tailwind Configuration
The project uses Tailwind CSS with custom configurations for:
- Dark mode support
- Custom color schemes
- Animation utilities
- Responsive breakpoints

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `build` folder to Netlify
3. Set environment variables in Netlify dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powerful code analysis
- React team for the amazing framework
- Tailwind CSS for beautiful styling
- All open-source contributors

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

**Made with ❤️ for developers, by developers** 