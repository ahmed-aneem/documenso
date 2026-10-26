import { DateTime } from 'luxon';
import { convertToLocalSystemFormat, toLuxonDateFormat, VALID_DATE_FORMAT_VALUES } from './date-formats';

describe('ISO 8601 Date Format with Luxon', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format and parse ISO 8601 with timezone offset', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const luxonFormat = toLuxonDateFormat(format);
    
    const dt = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'Asia/Kolkata' });
    const formatted = dt.toFormat(luxonFormat);

    expect(formatted).toMatch(/^2026-03-05T10:20:30\.123[+-]\d{2}:\d{2}$/);

    const converted = convertToLocalSystemFormat(formatted, format, 'Asia/Kolkata');
    expect(converted).not.toBe('Invalid date');
  });

  it('should handle legacy literal XXX strings gracefully', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyString = '2026-03-05T10:20:30.123XXX';
    const converted = convertToLocalSystemFormat(legacyString, format, 'UTC');
    expect(converted).not.toBe('Invalid date');
  });

  it('should validate valid date format values array length', () => {
    expect(VALID_DATE_FORMAT_VALUES.length).toBeGreaterThan(0);
  });
});
