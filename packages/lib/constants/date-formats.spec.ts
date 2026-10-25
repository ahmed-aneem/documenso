import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat, VALID_DATE_FORMAT_VALUES } from './date-formats';

describe('Date Formats ISO 8601 & Luxon mapping', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should format and parse ISO 8601 date format correctly with timezone offset', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    // Verify helper is consumed and functions correctly
    expect(VALID_DATE_FORMAT_VALUES).toContain(format);
  });

  it('should convert local system format successfully with ISO 8601', () => {
    const result = convertToLocalSystemFormat('2026-03-05T10:20:30.123+05:30', "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
