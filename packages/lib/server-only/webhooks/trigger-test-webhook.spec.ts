import { describe, it, expect } from 'vitest';
import { safeDataProcessor } from './trigger-test-webhook';

describe('documenso/documenso - Issue #3461', () => {
  it('should gracefully handle null or malformed data without throwing', () => {
    const result = safeDataProcessor(null, { fallback: { status: 'safe' } });
    expect(result).toEqual({ status: 'safe' });
  });

  it('should process valid data cleanly', () => {
    const input = { id: 101, title: 'Test Entry' };
    const result = safeDataProcessor(input);
    expect(result.isProcessed).toBe(true);
  });
});
