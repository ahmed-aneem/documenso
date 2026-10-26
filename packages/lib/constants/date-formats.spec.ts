import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('ISO 8601 Date Format with Luxon', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should successfully parse and convert ISO 8601 custom text with offset', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const sampleDateText = '2026-03-05T10:20:30.123+05:30';
    const result = convertToLocalSystemFormat(sampleDateText, isoFormat, 'Asia/Kolkata');
    expect(result).not.toBe('Invalid date');
  });

  it('should fall back and parse legacy strings with literal XXX', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyText = '2026-03-05T10:20:30.123XXX';
    const result = convertToLocalSystemFormat(legacyText, isoFormat, 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
