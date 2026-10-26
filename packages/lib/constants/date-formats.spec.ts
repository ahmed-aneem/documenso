import { DateTime } from 'luxon';
import { convertToLocalSystemFormat, toLuxonDateFormat } from './date-formats';

describe('ISO 8601 date format handling', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(format)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format and parse ISO 8601 with timezone offsets using Luxon', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const luxonFormat = toLuxonDateFormat(format);
    const dt = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'Asia/Kolkata' });
    const formatted = dt.toFormat(luxonFormat);

    expect(formatted).toMatch(/^2026-03-05T10:20:30\.123[+-]\d{2}:\d{2}$/);

    const converted = convertToLocalSystemFormat(formatted, format, 'Asia/Kolkata');
    expect(converted).not.toBe('Invalid date');
  });

  it('should handle legacy strings stamped with literal XXX', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyFormatted = '2026-03-05T10:20:30.123XXX';
    const converted = convertToLocalSystemFormat(legacyFormatted, format, 'Asia/Kolkata');
    expect(converted).not.toBe('Invalid date');
  });
});
