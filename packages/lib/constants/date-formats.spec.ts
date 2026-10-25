import { DateTime } from 'luxon';
import { toLuxonDateFormat, convertToLocalSystemFormat, VALID_DATE_FORMAT_VALUES } from './date-formats';

describe('ISO 8601 Date Format handling', () => {
  it('should correctly convert XXX to ZZ for Luxon', () => {
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

  it('should fall back to legacy XXX string parsing', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyString = '2026-03-05T10:20:30.123XXX';
    const converted = convertToLocalSystemFormat(legacyString, isoFormat, 'Asia/Kolkata');
    expect(converted).toBeDefined();
  });

  it('should include ISO 8601 in valid date format values', () => {
    expect(VALID_DATE_FORMAT_VALUES).toContain("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
  });
});
