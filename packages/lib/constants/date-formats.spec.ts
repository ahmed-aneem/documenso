import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('ISO 8601 Date Format with Luxon', () => {
  it('should correctly convert XXX to ZZ for Luxon', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should parse and format ISO 8601 dates with timezone offsets properly', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const testDate = '2026-03-05T10:20:30.123+05:30';
    const result = convertToLocalSystemFormat(testDate, isoFormat, 'Asia/Kolkata');
    expect(result).not.toBe('Invalid date');
  });

  it('should fallback to parse legacy strings with literal XXX', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyDate = '2026-03-05T10:20:30.123XXX';
    const result = convertToLocalSystemFormat(legacyDate, isoFormat, 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
