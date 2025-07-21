# 🚀 AI Code Reviewer - Setup Guide

## ✅ Quick Start

### 1. **Environment Setup**
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Edit `.env` and add your Gemini API key:
```env
REACT_APP_GEMINI_API=your_gemini_api_key_here
```

### 2. **Get Your API Key**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env` file

### 3. **Install Dependencies**
```bash
npm install --legacy-peer-deps
```

### 4. **Start Development Server**
```bash
npm start
```

The application will open at `http://localhost:3000` (or another port if 3000 is busy).

## 🎯 Features Overview

### **Enhanced UI/UX**
- ✅ Modern dark/light theme system
- ✅ Professional gradient design
- ✅ Responsive mobile-first layout
- ✅ Smooth animations and transitions

### **Advanced Code Editor**
- ✅ Syntax highlighting for 15+ languages
- ✅ File upload with drag & drop
- ✅ Auto language detection
- ✅ Preview mode toggle
- ✅ Real-time code statistics

### **AI-Powered Analysis**
- ✅ Comprehensive code reviews
- ✅ Bug detection and security analysis
- ✅ Performance optimization suggestions
- ✅ Best practices recommendations

### **Productivity Features**
- ✅ Review history with search
- ✅ Export to PDF and text
- ✅ Copy to clipboard
- ✅ Toast notifications
- ✅ Error handling and recovery

## 🧪 Testing the Application

### **Sample Code for Testing**
Try pasting this JavaScript code to test the AI analysis:

```javascript
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}

const cartItems = [
  { price: 10.99, quantity: 2 },
  { price: 5.50, quantity: 1 }
];

console.log(calculateTotal(cartItems));
```

### **Test Features**
1. **Code Input**: Paste code or upload a file
2. **Language Selection**: Try different programming languages
3. **Preview Mode**: Toggle between edit and preview
4. **AI Analysis**: Click "Review Code" to get AI feedback
5. **Export**: Download results as PDF or text
6. **History**: Access previous reviews from the history panel
7. **Theme Toggle**: Switch between dark and light modes

## 🔧 Troubleshooting

### **Common Issues**

#### **API Key Not Working**
- Ensure your API key is correctly set in `.env`
- Restart the development server after adding the API key
- Check that the key has proper permissions in Google AI Studio

#### **Build Errors**
- Run `npm install --legacy-peer-deps` to resolve dependency conflicts
- Clear node_modules and reinstall if needed:
  ```bash
  rm -rf node_modules package-lock.json
  npm install --legacy-peer-deps
  ```

#### **Syntax Highlighting Issues**
- The app uses Prism.js for syntax highlighting
- If highlighting doesn't work, try refreshing the page
- Check browser console for any JavaScript errors

#### **File Upload Not Working**
- Ensure files are under 1MB in size
- Supported file types: .js, .jsx, .ts, .tsx, .py, .java, .cpp, .c, .cs, .php, .rb, .go, .rs, .html, .css, .sql, .json, .txt

## 📱 Browser Compatibility

### **Supported Browsers**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### **Required Features**
- JavaScript ES6+ support
- CSS Grid and Flexbox
- Local Storage API
- File API for uploads
- Clipboard API for copy functionality

## 🚀 Deployment

### **Build for Production**
```bash
npm run build
```

### **Deploy to Vercel**
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel --prod`
3. Set environment variables in Vercel dashboard

### **Deploy to Netlify**
1. Build the project: `npm run build`
2. Upload the `build` folder to Netlify
3. Set `REACT_APP_GEMINI_API` in environment variables

## 📊 Performance Tips

### **For Best Performance**
- Use a stable internet connection for AI analysis
- Keep code snippets under 10,000 characters for faster analysis
- Clear browser cache if experiencing slow loading
- Use the latest version of your browser

### **Memory Usage**
- The app automatically manages memory usage
- Review history is stored locally (no server required)
- Large files are processed efficiently with streaming

## 🎯 Next Steps

### **Customization Options**
- Modify colors and themes in `src/config/constants.js`
- Add new programming languages in the constants file
- Customize AI prompts in `src/utils/codeAnalyzer.js`

### **Feature Extensions**
- Add user authentication
- Implement team collaboration features
- Add more export formats
- Integrate with version control systems

## 📞 Support

If you encounter any issues:
1. Check this setup guide
2. Review the browser console for errors
3. Ensure all dependencies are properly installed
4. Verify your API key is working

---

**🎉 Congratulations! Your AI Code Reviewer is now ready to use!**

Enjoy analyzing code with professional AI-powered insights! 🚀