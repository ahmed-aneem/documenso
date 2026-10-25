import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('Date formats and ISO 8601 handling', () => {
  it('should correctly convert XXX to ZZ for Luxon', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should parse and format ISO 8601 dates with proper timezone offset', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const testDateString = '2026-03-05T10:20:30.123+05:30';
    const result = convertToLocalSystemFormat(testDateString, isoFormat, 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
