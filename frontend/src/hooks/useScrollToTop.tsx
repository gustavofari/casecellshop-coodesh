import { useEffect } from 'react';
 
export function useScrollToTop(dependency: unknown): void {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 10);
 
    return () => clearTimeout(timeoutId);
  }, [dependency]);
}
