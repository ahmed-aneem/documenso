import { DateTime } from 'luxon';
import { toLuxonDateFormat, convertToLocalSystemFormat, VALID_DATE_FORMAT_VALUES } from './date-formats';

describe('ISO 8601 Date Format with Luxon', () => {
  it('should correctly map XXX to ZZ in toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format and parse ISO 8601 with timezone offset', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const luxonFormat = toLuxonDateFormat(isoFormat);

    const date = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'Asia/Kolkata' });
    const formatted = date.toFormat(luxonFormat);

    expect(formatted).not.toContain('XXX');
    expect(formatted).toMatch(/2026-03-05T10:20:30\.123\+05:30/);

    const converted = convertToLocalSystemFormat(formatted, isoFormat, 'Asia/Kolkata');
    expect(converted).not.toBe('Invalid date');
  });

  it('should fall back correctly when parsing legacy literal XXX strings', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyFormatted = '2026-03-05T10:20:30.123XXX';
    const converted = convertToLocalSystemFormat(legacyFormatted, isoFormat, 'UTC');
    expect(converted).not.toBe('Invalid date');
  });

  it('should include ISO format in VALID_DATE_FORMAT_VALUES', () => {
    expect(VALID_DATE_FORMAT_VALUES).toContain("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
  });
});
