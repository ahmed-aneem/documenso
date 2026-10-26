import { describe, expect, it } from 'vitest';
import { DateTime } from 'luxon';
import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('ISO 8601 Date Format with Timezone Offset', () => {
  it('should map XXX to ZZ via toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format and parse ISO 8601 dates with timezone offset', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const luxonFormat = toLuxonDateFormat(format);
    const dt = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'Asia/Kolkata' });

    const formatted = dt.toFormat(luxonFormat);
    expect(formatted).toBe('2026-03-05T10:20:30.123+05:30');

    const localResult = convertToLocalSystemFormat('2026-03-05T10:20:30.123+05:30', format, 'Asia/Kolkata');
    expect(localResult).not.toBe('Invalid date');
  });

  it('should support legacy strings stamped with literal XXX', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const localResult = convertToLocalSystemFormat('2026-03-05T10:20:30.123XXX', format, 'Asia/Kolkata');
    expect(localResult).not.toBe('Invalid date');
  });
});
