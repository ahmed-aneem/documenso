import { DateTime } from 'luxon';
import { toLuxonDateFormat, convertToLocalSystemFormat, VALID_DATE_FORMAT_VALUES } from './date-formats';

describe('ISO 8601 Date Format Support', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format ISO 8601 with timezone offset instead of literal XXX', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const luxonFormat = toLuxonDateFormat(format);
    const date = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'UTC' });
    const formatted = date.toFormat(luxonFormat);

    expect(formatted).toBe('2026-03-05T10:20:30.123+00:00');
    expect(formatted).not.toContain('XXX');
  });

  it('should convert and parse local system format correctly with ISO 8601', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const sampleText = '2026-03-05T10:20:30.123+00:00';
    const result = convertToLocalSystemFormat(sampleText, format, 'UTC');

    expect(result).not.toBe('Invalid date');
  });

  it('should handle legacy literal XXX strings in convertToLocalSystemFormat', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyText = '2026-03-05T10:20:30.123XXX';
    const result = convertToLocalSystemFormat(legacyText, format, 'UTC');

    expect(result).not.toBe('Invalid date');
  });

  it('should validate all standard date format values', () => {
    VALID_DATE_FORMAT_VALUES.forEach((val) => {
      expect(typeof val).toBe('string');
    });
  });
});
