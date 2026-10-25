import { toLuxonDateFormat, convertToLocalSystemFormat, VALID_DATE_FORMAT_VALUES } from './date-formats';

describe('ISO 8601 Date Format Handling', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should successfully convert and format ISO 8601 dates with timezone offsets', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const testDateString = '2026-03-05T10:20:30.123+05:30';
    
    const result = convertToLocalSystemFormat(testDateString, isoFormat, 'Asia/Kolkata');
    expect(result).not.toBe('Invalid date');
  });

  it('should fall back and parse legacy dates stamped with literal XXX', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyStampedString = '2026-03-05T10:20:30.123XXX';

    const result = convertToLocalSystemFormat(legacyStampedString, isoFormat, 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
