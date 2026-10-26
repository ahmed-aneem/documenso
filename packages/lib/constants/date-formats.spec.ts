import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('ISO 8601 Date Format with Luxon', () => {
  it('should map XXX to ZZ correctly in toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly parse and format ISO 8601 with timezone offset', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const sampleDateStr = '2026-03-05T10:20:30.123+05:30';
    
    const result = convertToLocalSystemFormat(sampleDateStr, isoFormat, 'Asia/Kolkata');
    expect(result).not.toBe('Invalid date');
  });

  it('should fallback to parse legacy literal XXX strings correctly', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyStr = '2026-03-05T10:20:30.123XXX';
    
    const result = convertToLocalSystemFormat(legacyStr, isoFormat, 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
