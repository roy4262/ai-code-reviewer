# 🤖 AI Code Reviewer

A modern, professional web application that provides comprehensive AI-powered code analysis and review using Google's Gemini AI. Built with React and featuring a clean, ChatGPT-style interface.

![AI Code Reviewer](https://img.shields.io/badge/AI-Code%20Reviewer-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google)

## ✨ Features

### 🎯 **Core Functionality**
- **AI-Powered Analysis**: Comprehensive code review using Google Gemini AI
- **Multi-Language Support**: Supports JavaScript, Python, Java, C++, and more
- **Intelligent Parsing**: Automatically categorizes review results into sections
- **Real-time Analysis**: Fast, responsive code evaluation

### 🎨 **Modern Interface**
- **ChatGPT-Style Design**: Clean, professional interface with section cards
- **Individual Copy Buttons**: Copy specific sections or entire results
- **Dark/Light Mode**: Full theme support with smooth transitions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Professional transitions and hover effects

### 📊 **Analysis Categories**
- **📋 Summary & Overview**: What your code does
- **🐛 Issues & Bugs**: Potential problems and errors
- **⚡ Performance**: Optimization suggestions
- **🔒 Security**: Security vulnerabilities and concerns
- **🎯 Best Practices**: Code quality improvements
- **📈 Overall Rating**: Comprehensive score (1-10)

### 🛠️ **Export Options**
- **📋 Copy to Clipboard**: Individual sections or full results
- **📄 PDF Export**: Professional PDF reports with metadata
- **💾 Text Download**: Plain text file export

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-code-reviewer.git
   cd ai-code-reviewer
   ```

2. **Navigate to the project directory**
   ```bash
   cd code-reviewer
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the `code-reviewer` directory:
   ```env
   REACT_APP_GEMINI_API=your_gemini_api_key_here
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔑 Getting Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key
5. Add it to your `.env` file

## 📱 How to Use

### 1. **Input Your Code**
- Paste your code into the large text area
- The app supports any programming language
- No file upload needed - just paste and go!

### 2. **Get AI Analysis**
- Click the "Review Code" button
- Wait for the AI to analyze your code (usually 5-10 seconds)
- View comprehensive results in organized sections

### 3. **Review Results**
- **Summary**: Understanding what your code does
- **Issues**: Bugs, errors, and potential problems
- **Performance**: Speed and efficiency improvements
- **Security**: Vulnerability assessments
- **Best Practices**: Code quality suggestions
- **Rating**: Overall score with detailed feedback

### 4. **Copy & Export**
- Click individual copy buttons for specific sections
- Use the main copy button for full results
- Download as PDF for professional reports

## 🎨 Interface Features

### **ChatGPT-Style Design**
- Clean section cards with color-coded icons
- Professional typography and spacing
- Smooth animations and transitions

### **Smart Section Detection**
The app automatically parses AI responses into relevant sections:
- 🔵 **Summary & Overview** - Blue info icon
- 🔴 **Issues & Bugs** - Red alert icon  
- 🟡 **Performance** - Yellow lightning icon
- 🟣 **Security** - Purple shield icon
- 🟢 **Best Practices** - Green target icon

### **Copy Functionality**
- Individual section copy buttons
- Full result copy option
- Visual feedback with animations
- Toast notifications for success/error

## 🛠️ Technical Stack

### **Frontend**
- **React 18**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icons
- **React Hot Toast**: Elegant notifications

### **AI Integration**
- **Google Gemini AI**: Advanced language model
- **REST API**: Direct integration with Gemini API
- **Error Handling**: Comprehensive error management

### **Additional Libraries**
- **jsPDF**: PDF generation and export
- **React Error Boundary**: Graceful error handling

## 📁 Project Structure

```
code-reviewer/
├── public/
│   ├── index.html
│   ├── favicon.png
│   └── manifest.json
├── src/
│   ├── Components/
│   │   ├── Home.jsx          # Main application component
│   │   ├── ReviewResult.jsx  # Results display with copy functionality
│   │   └── ErrorBoundary.jsx # Error handling component
│   ├── App.js               # Root component
│   ├── App.css              # Custom styles and animations
│   └── index.js             # Application entry point
├── .env                     # Environment variables (create this)
├── package.json
└── README.md
```

## 🎯 Example Usage

### **Sample Code Input**
```javascript
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}
```

### **AI Analysis Output**
The app will provide structured feedback including:
- Code summary and purpose
- Potential improvements (e.g., using `reduce()`)
- Performance considerations
- Best practices suggestions
- Overall code quality rating

## 🔧 Configuration

### **Environment Variables**
```env
# Required
REACT_APP_GEMINI_API=your_api_key_here

# Optional (for advanced configuration)
REACT_APP_API_TIMEOUT=30000
REACT_APP_MAX_CODE_LENGTH=10000
```

### **Customization**
- Modify `src/App.css` for custom styling
- Update `src/Components/Home.jsx` for UI changes
- Adjust AI prompts in the API call section

## 🚀 Deployment

### **Build for Production**
```bash
npm run build
```

### **Deploy Options**
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use `gh-pages` package
- **Traditional Hosting**: Upload `build` folder contents

### **Environment Variables in Production**
Make sure to set your `REACT_APP_GEMINI_API` key in your hosting platform's environment variables section.

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Development Guidelines**
- Follow React best practices
- Use Tailwind CSS for styling
- Add proper error handling
- Test on multiple screen sizes
- Ensure accessibility compliance

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful code analysis capabilities
- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for beautiful icons
- **Open Source Community** for inspiration and tools

## 📞 Support

### **Issues & Bugs**
- Open an issue on GitHub
- Provide code samples and error messages
- Include browser and OS information

### **Feature Requests**
- Use GitHub Issues with the "enhancement" label
- Describe the feature and use case
- Consider contributing the feature yourself!

### **Questions**
- Check existing GitHub Issues
- Review this README thoroughly
- Search for similar projects and solutions

---

## 🌟 **Star this repository if you find it helpful!**

**Made with ❤️ by developers, for developers**

---

### 📊 **Stats**
- ⚡ **Fast**: Analysis in seconds
- 🎯 **Accurate**: Powered by Google Gemini AI  
- 🎨 **Beautiful**: Modern, professional interface
- 📱 **Responsive**: Works on all devices
- 🔒 **Secure**: Your code stays private
