// Performance monitoring utilities
class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.isEnabled = process.env.NODE_ENV === 'development';
  }

  // Start timing an operation
  startTiming(operationName) {
    if (!this.isEnabled) return;
    
    this.metrics.set(operationName, {
      startTime: performance.now(),
      endTime: null,
      duration: null
    });
  }

  // End timing an operation
  endTiming(operationName) {
    if (!this.isEnabled) return;
    
    const metric = this.metrics.get(operationName);
    if (metric) {
      metric.endTime = performance.now();
      metric.duration = metric.endTime - metric.startTime;
      
      console.log(`⏱️ ${operationName}: ${metric.duration.toFixed(2)}ms`);
      return metric.duration;
    }
    return null;
  }

  // Get timing for an operation
  getTiming(operationName) {
    const metric = this.metrics.get(operationName);
    return metric ? metric.duration : null;
  }

  // Get all metrics
  getAllMetrics() {
    const results = {};
    this.metrics.forEach((value, key) => {
      results[key] = value.duration;
    });
    return results;
  }

  // Clear all metrics
  clearMetrics() {
    this.metrics.clear();
  }

  // Log memory usage
  logMemoryUsage() {
    if (!this.isEnabled || !performance.memory) return;
    
    const memory = performance.memory;
    console.log('🧠 Memory Usage:', {
      used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      limit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`
    });
  }

  // Monitor component render time
  measureRender(componentName, renderFunction) {
    if (!this.isEnabled) return renderFunction();
    
    this.startTiming(`${componentName}_render`);
    const result = renderFunction();
    this.endTiming(`${componentName}_render`);
    
    return result;
  }

  // Monitor async operations
  async measureAsync(operationName, asyncFunction) {
    if (!this.isEnabled) return await asyncFunction();
    
    this.startTiming(operationName);
    try {
      const result = await asyncFunction();
      this.endTiming(operationName);
      return result;
    } catch (error) {
      this.endTiming(operationName);
      throw error;
    }
  }

  // Generate performance report
  generateReport() {
    if (!this.isEnabled) return null;
    
    const metrics = this.getAllMetrics();
    const report = {
      timestamp: new Date().toISOString(),
      metrics,
      summary: {
        totalOperations: Object.keys(metrics).length,
        averageTime: Object.values(metrics).reduce((a, b) => a + b, 0) / Object.keys(metrics).length || 0,
        slowestOperation: Object.entries(metrics).reduce((a, b) => a[1] > b[1] ? a : b, ['', 0]),
        fastestOperation: Object.entries(metrics).reduce((a, b) => a[1] < b[1] ? a : b, ['', Infinity])
      }
    };
    
    console.log('📊 Performance Report:', report);
    return report;
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// React hook for performance monitoring
export const usePerformanceMonitor = () => {
  return {
    startTiming: performanceMonitor.startTiming.bind(performanceMonitor),
    endTiming: performanceMonitor.endTiming.bind(performanceMonitor),
    measureAsync: performanceMonitor.measureAsync.bind(performanceMonitor),
    generateReport: performanceMonitor.generateReport.bind(performanceMonitor)
  };
};

// Higher-order component for performance monitoring
export const withPerformanceMonitoring = (WrappedComponent, componentName) => {
  return function PerformanceMonitoredComponent(props) {
    return performanceMonitor.measureRender(
      componentName || WrappedComponent.name,
      () => <WrappedComponent {...props} />
    );
  };
};

// Utility functions
export const measureCodeAnalysis = async (analysisFunction, code) => {
  return await performanceMonitor.measureAsync(
    'code_analysis',
    () => analysisFunction(code)
  );
};

export const measureFileUpload = async (uploadFunction, file) => {
  return await performanceMonitor.measureAsync(
    'file_upload',
    () => uploadFunction(file)
  );
};

export const measureExport = async (exportFunction, data) => {
  return await performanceMonitor.measureAsync(
    'export_operation',
    () => exportFunction(data)
  );
};