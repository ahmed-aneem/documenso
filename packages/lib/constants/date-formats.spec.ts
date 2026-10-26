import { DateTime } from 'luxon';
import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('ISO 8601 Date Format Support', () => {
  it('should map XXX to ZZ via toLuxonDateFormat', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(format)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format ISO 8601 dates with timezone offsets using Luxon', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const luxonFormat = toLuxonDateFormat(format);
    const date = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'UTC' });
    const formatted = date.toFormat(luxonFormat);
    expect(formatted).toBe('2026-03-05T10:20:30.123+00:00');
  });

  it('should parse legacy strings containing literal XXX in convertToLocalSystemFormat', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyString = '2026-03-05T10:20:30.123XXX';
    const result = convertToLocalSystemFormat(legacyString, format, 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
