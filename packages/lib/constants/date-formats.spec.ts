import { DateTime } from 'luxon';
import { toLuxonDateFormat, convertToLocalSystemFormat, VALID_DATE_FORMAT_VALUES } from './date-formats';

describe('ISO 8601 date format and timezone offset handling', () => {
  it('should map XXX to ZZ via toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format ISO 8601 with timezone offset using Luxon', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const luxonFormat = toLuxonDateFormat(format);
    const date = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'Asia/Kolkata' });
    const formatted = date.toFormat(luxonFormat);
    expect(formatted).toBe('2026-03-05T10:20:30.123+05:30');
  });

  it('convertToLocalSystemFormat should correctly parse and format ISO 8601 dates', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const input = '2026-03-05T10:20:30.123+05:30';
    const result = convertToLocalSystemFormat(input, format, 'Asia/Kolkata');
    expect(result).not.toBe('Invalid date');
  });

  it('should include ISO 8601 in VALID_DATE_FORMAT_VALUES', () => {
    expect(VALID_DATE_FORMAT_VALUES).toContain("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
  });
});
