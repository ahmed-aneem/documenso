import { DateTime } from 'luxon';
import { convertToLocalSystemFormat, toLuxonDateFormat, VALID_DATE_FORMAT_VALUES } from './date-formats';

describe('ISO 8601 Date Format Handling', () => {
  it('should translate XXX to ZZ for Luxon format', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format and parse ISO 8601 dates with timezone offsets', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const luxonFormat = toLuxonDateFormat(isoFormat);
    
    const dt = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'Asia/Kolkata' });
    const formatted = dt.toFormat(luxonFormat);
    
    expect(formatted).toBe('2026-03-05T10:20:30.123+05:30');

    const converted = convertToLocalSystemFormat('2026-03-05T10:20:30.123+05:30', isoFormat, 'Asia/Kolkata');
    expect(converted).not.toBe('Invalid date');
  });

  it('should handle legacy literal XXX strings in convertToLocalSystemFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyString = '2026-03-05T10:20:30.123XXX';
    
    const result = convertToLocalSystemFormat(legacyString, isoFormat, 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
