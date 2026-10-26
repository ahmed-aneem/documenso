import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemModel, convertToLocalSystemFormat } from './date-formats';

describe('ISO 8601 Date Format with Luxon', () => {
  it('should correctly map XXX to ZZ via toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should format ISO 8601 correctly with timezone offset instead of literal XXX', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const luxonFormat = toLuxonDateFormat(isoFormat);
    const date = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'Asia/Kolkata' });
    const formatted = date.toFormat(luxonFormat);
    expect(formatted).not.toContain('XXX');
    expect(formatted).toMatch(/2026-03-05T10:20:30\.123\+\d{2}:\d{2}/);
  });

  it('should parse legacy date strings containing literal XXX', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyString = '2026-03-05T10:20:30.123XXX';
    const result = convertToLocalSystemFormat(legacyString, isoFormat, 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
