import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat, VALID_DATE_FORMAT_VALUES } from './date-formats';

describe('ISO 8601 Date Format with Luxon', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should validate all valid date format values include ISO8601', () => {
    expect(VALID_DATE_FORMAT_VALUES).toContain("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
  });

  it('should correctly parse and format dates with ISO 8601 format', () => {
    const formatted = convertToLocalSystemFormat('2026-03-05T10:20:30.123+05:30', "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", 'UTC');
    expect(formatted).not.toBe('Invalid date');
    expect(formatted).toContain('2026-03-05');
  });

  it('should fallback to legacy literal XXX values gracefully', () => {
    const formatted = convertToLocalSystemFormat('2026-03-05T10:20:30.123XXX', "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", 'UTC');
    expect(formatted).not.toBe('Invalid date');
  });
});
