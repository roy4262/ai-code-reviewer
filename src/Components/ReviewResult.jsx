import React, { useState, useCallback } from 'react';
import { 
  Download, 
  Copy, 
  FileText, 
  AlertTriangle, 
  Info,
  Zap,
  Shield,
  Target,
  CheckCircle2
} from 'lucide-react';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';

const ReviewResult = ({ result, dark, code, language }) => {
  const [copiedSection, setCopiedSection] = useState(null);

  const handleCopySection = useCallback(async (content, sectionName, sectionId) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success(`${sectionName} copied to clipboard!`);
      setCopiedSection(sectionId);
      setTimeout(() => setCopiedSection(null), 1000);
    } catch (err) {
      toast.error("Failed to copy content");
    }
  }, []);

  const handleCopyResult = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(result);
      toast.success("Review result copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy result");
    }
  }, [result]);

  const handleDownloadText = useCallback(() => {
    try {
      const blob = new Blob([result], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `code-review-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Text file downloaded!");
    } catch (err) {
      toast.error("Failed to download file");
    }
  }, [result]);

  const handleDownloadPDF = useCallback(() => {
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;
      
      // Title
      pdf.setFontSize(20);
      pdf.setFont(undefined, 'bold');
      pdf.text('AI Code Review Report', margin, 30);
      
      // Metadata
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'normal');
      pdf.text(`Language: ${language}`, margin, 45);
      pdf.text(`Generated: ${new Date().toLocaleString()}`, margin, 55);
      
      // Code snippet (first few lines)
      pdf.setFontSize(10);
      pdf.setFont('courier', 'normal');
      const codeLines = code.split('\n').slice(0, 10);
      let yPosition = 70;
      
      pdf.text('Code Snippet:', margin, yPosition);
      yPosition += 10;
      
      codeLines.forEach(line => {
        if (yPosition > 250) return; // Avoid overflow
        const wrappedLines = pdf.splitTextToSize(line, maxWidth);
        pdf.text(wrappedLines, margin, yPosition);
        yPosition += 5 * wrappedLines.length;
      });
      
      // Review content
      yPosition += 10;
      pdf.setFont(undefined, 'normal');
      pdf.setFontSize(10);
      
      const reviewLines = pdf.splitTextToSize(result, maxWidth);
      reviewLines.forEach(line => {
        if (yPosition > 280) {
          pdf.addPage();
          yPosition = 20;
        }
        pdf.text(line, margin, yPosition);
        yPosition += 5;
      });
      
      pdf.save(`code-review-${Date.now()}.pdf`);
      toast.success("PDF downloaded successfully!");
    } catch (err) {
      console.error('PDF generation error:', err);
      toast.error("Failed to generate PDF");
    }
  }, [result, code, language]);

  // Enhanced parsing for better section detection
  const parseResult = useCallback((text) => {
    const sections = [];
    
    // Split by common markdown patterns and numbered sections
    const parts = text.split(/(?=##?\s|\*\*\d+\.|\d+\.\s\*\*)/);
    
    parts.forEach((part, index) => {
      if (!part.trim()) return;
      
      const lines = part.trim().split('\n');
      const firstLine = lines[0].toLowerCase();
      
      let title = 'Analysis';
      let icon = 'info';
      let color = 'blue';
      
      if (firstLine.includes('summary') || firstLine.includes('overview')) {
        title = 'Summary & Overview';
        icon = 'info';
        color = 'blue';
      } else if (firstLine.includes('issue') || firstLine.includes('bug') || firstLine.includes('error') || firstLine.includes('problem')) {
        title = 'Issues & Bugs';
        icon = 'alert';
        color = 'red';
      } else if (firstLine.includes('performance') || firstLine.includes('optimization') || firstLine.includes('speed')) {
        title = 'Performance Optimization';
        icon = 'zap';
        color = 'yellow';
      } else if (firstLine.includes('security') || firstLine.includes('vulnerability') || firstLine.includes('safety')) {
        title = 'Security Analysis';
        icon = 'shield';
        color = 'purple';
      } else if (firstLine.includes('best practice') || firstLine.includes('recommendation') || firstLine.includes('improvement') || firstLine.includes('quality')) {
        title = 'Best Practices';
        icon = 'target';
        color = 'green';
      } else if (firstLine.includes('rating') || firstLine.includes('score')) {
        title = 'Overall Rating';
        icon = 'check';
        color = 'green';
      } else if (index === 0) {
        title = 'Code Analysis';
        icon = 'info';
        color = 'blue';
      }
      
      sections.push({
        title,
        content: part.trim(),
        icon,
        color,
        id: `section-${index}`
      });
    });
    
    // If no sections found, create a single section
    if (sections.length === 0) {
      sections.push({
        title: 'Code Review Results',
        content: text,
        icon: 'info',
        color: 'blue',
        id: 'section-0'
      });
    }
    
    return sections;
  }, []);

  const sections = parseResult(result);

  const SectionIcon = ({ type, color }) => {
    const iconProps = { size: 18, className: "flex-shrink-0" };
    const colorClass = `text-${color}-500`;
    
    switch (type) {
      case 'info':
        return <Info {...iconProps} className={colorClass} />;
      case 'alert':
        return <AlertTriangle {...iconProps} className={colorClass} />;
      case 'zap':
        return <Zap {...iconProps} className={colorClass} />;
      case 'shield':
        return <Shield {...iconProps} className={colorClass} />;
      case 'target':
        return <Target {...iconProps} className={colorClass} />;
      case 'check':
        return <CheckCircle2 {...iconProps} className={colorClass} />;
      default:
        return <Info {...iconProps} className="text-blue-500" />;
    }
  };

  return (
    <div className={`rounded-lg border animate-fade-in ${
      dark 
        ? "bg-gray-800 border-gray-700" 
        : "bg-white border-gray-200"
    }`}>
      {/* Header */}
      <div className={`px-6 py-4 border-b flex items-center justify-between ${
        dark ? "border-gray-700" : "border-gray-200"
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${dark ? "bg-blue-600" : "bg-blue-500"}`}>
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Code Review Results</h3>
            <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>
              AI-powered analysis for {language} code
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyResult}
            className={`p-2 rounded-lg transition-colors ${
              dark
                ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
            title="Copy all results"
          >
            <Copy size={16} />
          </button>
          
          <button
            onClick={handleDownloadPDF}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              dark
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            title="Download as PDF"
          >
            <Download size={16} />
            <span>PDF</span>
          </button>
        </div>
      </div>

      {/* Content - ChatGPT Style */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {sections.map((section, index) => (
          <div key={section.id} className="p-6">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <SectionIcon type={section.icon} color={section.color} />
                <h4 className="text-lg font-semibold">{section.title}</h4>
              </div>
              <button
                onClick={() => handleCopySection(section.content, section.title, section.id)}
                className={`p-2 rounded-lg transition-colors ${
                  copiedSection === section.id ? 'copy-success' : ''
                } ${
                  dark
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
                title={`Copy ${section.title}`}
              >
                <Copy size={14} />
              </button>
            </div>
            
            {/* Section Content */}
            <div className={`rounded-lg p-4 ${
              dark ? "bg-gray-900" : "bg-gray-50"
            }`}>
              <div className="prose prose-sm max-w-none">
                <pre className={`whitespace-pre-wrap font-sans text-sm leading-relaxed ${
                  dark ? "text-gray-300" : "text-gray-700"
                }`}>
                  {section.content}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewResult;