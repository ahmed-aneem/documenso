import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat, VALID_DATE_FORMAT_VALUES } from './date-formats';

describe('Date Formats & ISO 8601 Offset Handling', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly validate VALID_DATE_FORMAT_VALUES contains ISO 8601', () => {
    expect(VALID_DATE_FORMAT_VALUES).toContain("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
  });

  it('should convert and parse legacy or new ISO 8601 date fields', () => {
    const legacyStamped = '2026-03-05T10:20:30.123XXX';
    const result = convertToLocalSystemFormat(legacyStamped, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
