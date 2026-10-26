import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('ISO 8601 Date Format Helpers', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should convert custom text with ISO format successfully', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const testDateStr = '2026-03-05T10:20:30.123+05:30';
    const result = convertToLocalSystemFormat(testDateStr, isoFormat, 'UTC');
    expect(result).not.toBe('Invalid date');
  });

  it('should fall back correctly for legacy text containing literal XXX', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyStr = '2026-03-05T10:20:30.123XXX';
    const result = convertToLocalSystemFormat(legacyStr, isoFormat, 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
