import { describe, it, expect } from 'vitest';
import { getRandomQuote } from '../quotes';

describe('quotes', () => {
  describe('getRandomQuote', () => {
    it('returns a string', () => {
      const quote = getRandomQuote();
      expect(typeof quote).toBe('string');
    });

    it('returns non-empty strings', () => {
      const quote = getRandomQuote();
      expect(quote.length).toBeGreaterThan(0);
    });

    it('returns different quotes over multiple calls', () => {
      const quotes = new Set<string>();
      
      // Call 50 times to get good coverage
      for (let i = 0; i < 50; i++) {
        quotes.add(getRandomQuote());
      }
      
      // Should get at least 5 different quotes in 50 calls
      expect(quotes.size).toBeGreaterThanOrEqual(5);
    });

    it('never returns undefined or null', () => {
      for (let i = 0; i < 20; i++) {
        const quote = getRandomQuote();
        expect(quote).toBeDefined();
        expect(quote).not.toBeNull();
      }
    });
  });
});
