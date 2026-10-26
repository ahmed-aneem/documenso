import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('ISO 8601 Date Format with Luxon', () => {
  it('should correctly map XXX to ZZ using toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should parse and format ISO 8601 date strings with timezones correctly', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    // Test converting a date string
    const sampleDate = '2026-03-05T10:20:30.123+05:30';
    const converted = convertToLocalSystemFormat(sampleDate, isoFormat, 'UTC');
    expect(converted).not.toBe('Invalid date');
  });

  it('should fallback gracefully for legacy strings containing literal XXX', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyString = '2026-03-05T10:20:30.123XXX';
    const converted = convertToLocalSystemFormat(legacyString, isoFormat, 'UTC');
    expect(converted).not.toBe('Invalid date');
  });
});
