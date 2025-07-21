import { GoogleGenerativeAI } from '@google/generative-ai';

export class CodeAnalyzer {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('API key is required');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
  }

  async analyzeCode(code, language = 'auto') {
    if (!code.trim()) {
      throw new Error('Code cannot be empty');
    }

    const prompt = `
You are an expert code reviewer with years of experience in software development. 
Analyze the following ${language !== 'auto' ? language : ''} code and provide a comprehensive review:

**Code to Review:**
\`\`\`${language !== 'auto' ? language : ''}
${code}
\`\`\`

**Please provide your analysis in the following structured format:**

## 📋 Code Summary
[Brief overview of what the code does]

## 🐛 Issues Found
[List any bugs, errors, or potential problems]

## ⚡ Performance Optimizations
[Suggestions for improving performance]

## 🔒 Security Concerns
[Any security vulnerabilities or recommendations]

## 🎨 Code Quality & Best Practices
[Suggestions for better code structure, naming, etc.]

## ✨ Suggested Improvements
[Specific code improvements with examples where possible]

## 📊 Overall Rating
[Rate the code quality from 1-10 with brief explanation]

Please be thorough but concise in your analysis.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      if (!text) {
        throw new Error('No response received from AI');
      }

      return text;
    } catch (error) {
      console.error('Code analysis error:', error);
      
      // Handle specific error types
      if (error.message.includes('API_KEY_INVALID')) {
        throw new Error('Invalid API key. Please check your Gemini API key.');
      } else if (error.message.includes('RATE_LIMIT_EXCEEDED')) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (error.message.includes('CORS')) {
        throw new Error('Network error. Please check your internet connection.');
      }
      
      throw new Error(`Analysis failed: ${error.message}`);
    }
  }

  detectLanguage(code) {
    const patterns = {
      javascript: /(?:function|const|let|var|=>|import|export)/,
      python: /(?:def|import|from|class|if __name__|print\()/,
      java: /(?:public class|private|protected|import java)/,
      cpp: /(?:#include|using namespace|int main|std::)/,
      csharp: /(?:using System|namespace|public class|private|protected)/,
      php: /(?:<\?php|\$[a-zA-Z_])/,
      ruby: /(?:def|class|require|puts|end)/,
      go: /(?:package|import|func|var|:=)/,
      rust: /(?:fn|let|mut|use|struct)/,
      typescript: /(?:interface|type|enum|as|implements)/,
      html: /(?:<html|<div|<span|<p|<!DOCTYPE)/,
      css: /(?:\{[^}]*\}|@media|@import)/,
      sql: /(?:SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER)/i,
    };

    for (const [language, pattern] of Object.entries(patterns)) {
      if (pattern.test(code)) {
        return language;
      }
    }

    return 'text';
  }
}

export const formatAnalysisResult = (result) => {
  // Add any additional formatting if needed
  return result;
};

export const exportToPDF = async (content, filename = 'code-review') => {
  try {
    const { jsPDF } = await import('jspdf');
    const pdf = new jsPDF();
    
    const lines = content.split('\n');
    let yPosition = 20;
    const lineHeight = 7;
    const pageHeight = pdf.internal.pageSize.height;
    const margin = 20;

    pdf.setFontSize(16);
    pdf.text('Code Review Report', margin, yPosition);
    yPosition += lineHeight * 2;

    pdf.setFontSize(10);
    
    lines.forEach((line) => {
      if (yPosition > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
      
      const wrappedLines = pdf.splitTextToSize(line, pdf.internal.pageSize.width - 2 * margin);
      wrappedLines.forEach((wrappedLine) => {
        pdf.text(wrappedLine, margin, yPosition);
        yPosition += lineHeight;
      });
    });

    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('PDF export error:', error);
    throw new Error('Failed to export PDF');
  }
};