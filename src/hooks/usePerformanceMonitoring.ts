
import { useEffect } from 'react';
import { logger } from '@/lib/logger';
import config from '@/lib/config';

interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  cumulativeLayoutShift?: number;
}

export const usePerformanceMonitoring = (pageName: string) => {
  useEffect(() => {
    if (!config.isProduction) return;

    const measurePerformance = () => {
      try {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paintEntries = performance.getEntriesByType('paint');
        
        const metrics: PerformanceMetrics = {
          pageLoadTime: navigation.loadEventEnd - navigation.loadEventStart,
        };

        // Get paint metrics
        paintEntries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            metrics.firstContentfulPaint = entry.startTime;
          }
        });

        // Log performance metrics
        logger.info(`Performance metrics for ${pageName}`, { metrics });

        // In production, you would send these to an analytics service
        if (config.enableAnalytics) {
          // Example: sendToAnalytics(pageName, metrics);
        }
      } catch (error) {
        logger.error('Failed to measure performance', { pageName }, error as Error);
      }
    };

    // Measure after page load
    if (document.readyState === 'complete') {
      setTimeout(measurePerformance, 100);
    } else {
      window.addEventListener('load', () => {
        setTimeout(measurePerformance, 100);
      });
    }
  }, [pageName]);
};
