import { DateTime } from 'luxon';
import { convertToLocalSystemFormat, toLuxonDateFormat } from './date-formats';

describe('ISO 8601 Date Format Handling', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    expect(toLuxonDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX")).toBe(
      "yyyy-MM-dd'T'HH:mm:ss.SSSZZ"
    );
  });

  it('should correctly format and parse ISO 8601 with timezone offset', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const luxonFormat = toLuxonDateFormat(format);
    const dt = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'Asia/Kolkata' });
    const formatted = dt.toFormat(luxonFormat);

    expect(formatted).toBe('2026-03-05T10:20:30.123+05:30');

    const converted = convertToLocalSystemFormat(formatted, format, 'Asia/Kolkata');
    expect(converted).not.toBe('Invalid date');
  });

  it('should fallback to legacy literal XXX when parsing old stamps', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyStamped = '2026-03-05T10:20:30.123XXX';

    const converted = convertToLocalSystemFormat(legacyStamped, format, 'Asia/Kolkata');
    expect(converted).not.toBe('Invalid date');
  });
});
