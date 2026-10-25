import { DateTime } from 'luxon';
import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('ISO 8601 Date Format with Luxon', () => {
  it('should convert XXX to ZZ for Luxon', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(format)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format and parse ISO 8601 dates with timezone offsets', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const luxonFormat = toLuxonDateFormat(format);
    
    const date = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'Asia/Kolkata' });
    const formatted = date.toFormat(luxonFormat);
    
    expect(formatted).toMatch(/^2026-03-05T10:20:30\.123\+\d{2}:\d{2}$/);
  });

  it('should fallback and parse legacy dates containing literal XXX', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyText = '2026-03-05T10:20:30.123XXX';
    
    const result = convertToLocalSystemFormat(legacyText, format, 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
