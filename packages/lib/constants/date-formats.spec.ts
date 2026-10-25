import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('ISO 8601 Date Format with Luxon', () => {
  it('should map XXX to ZZ correctly in toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should format ISO 8601 with timezone offset properly in convertToLocalSystemFormat', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    // Test parsing and formatting a valid date string with offset
    const testDateStr = '2026-03-05T10:20:30.123+05:30';
    const result = convertToLocalSystemFormat(testDateStr, format, 'Asia/Kolkata');
    expect(result).not.toBe('Invalid date');
    expect(result).toContain('+05:30');
  });

  it('should fall back to parsing legacy literal XXX format', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyStr = '2026-03-05T10:20:30.123XXX';
    const result = convertToLocalSystemFormat(legacyStr, format, 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
