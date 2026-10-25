import { DateTime } from 'luxon';
import { convertToLocalSystemFormat, toLuxonDateFormat, VALID_DATE_FORMAT_VALUES } from './date-formats';

describe('ISO 8601 date format timezone support', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format ISO 8601 with timezone offset instead of literal XXX', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const luxonFormat = toLuxonDateFormat(format);
    const date = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'Asia/Kolkata' });
    
    const formatted = date.toFormat(luxonFormat);
    expect(formatted).not.toContain('XXX');
    expect(formatted).toMatch(/^2026-03-05T10:20:30\.123\+[0-9]{2}:[0-9]{2}$/);
  });

  it('should successfully parse legacy dates containing literal XXX or offsets', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyText = '2026-03-05T10:20:30.123XXX';
    
    const result = convertToLocalSystemFormat(legacyText, format, 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
