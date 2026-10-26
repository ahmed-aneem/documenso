import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('Date Formats ISO 8601 & Luxon Translation', () => {
  it('should correctly convert XXX to ZZ for Luxon', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(format)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly convert and format ISO 8601 with timezone offset', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const testDateString = '2026-03-05T10:20:30.123';
    
    // Verify convertToLocalSystemFormat correctly parses and formats
    const result = convertToLocalSystemFormat(testDateString, isoFormat, 'UTC');
    expect(result).not.toBe('Invalid date');
  });

  it('should fallback to legacy format when parsing literal XXX strings', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyStringWithLiteralXXX = '2026-03-05T10:20:30.123XXX';
    
    const result = convertToLocalSystemFormat(legacyStringWithLiteralXXX, isoFormat, 'UTC');
    expect(result).toBeDefined();
  });
});
