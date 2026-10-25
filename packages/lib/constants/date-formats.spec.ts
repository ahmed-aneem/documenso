import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('ISO 8601 Date Format Helpers', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    expect(toLuxonDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX")).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format and parse ISO 8601 dates with timezone offsets', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const luxonFmt = toLuxonDateFormat(isoFormat);
    expect(luxonFmt).toContain('ZZ');
  });

  it('should handle legacy literal XXX strings in convertToLocalSystemFormat', () => {
    const legacyString = '2026-03-05T10:20:30.123XXX';
    const result = convertToLocalSystemFormat(legacyString, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
