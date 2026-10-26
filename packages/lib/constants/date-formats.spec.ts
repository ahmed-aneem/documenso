import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('Date formats and ISO 8601 offset support', () => {
  it('should map date-fns XXX token to Luxon ZZ token', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should successfully parse and format ISO 8601 date strings with timezone offsets', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const testDateString = '2026-03-05T10:20:30.123+05:30';
    
    const result = convertToLocalSystemFormat(testDateString, isoFormat, 'Asia/Kolkata');
    expect(result).not.toBe('Invalid date');
  });

  it('should handle legacy literal XXX date strings gracefully', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyString = '2026-03-05T10:20:30.123XXX';

    const result = convertToLocalSystemFormat(legacyString, isoFormat, 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
