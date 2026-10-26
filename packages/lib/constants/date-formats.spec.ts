import { describe, it, expect } from 'vitest';
import { DateTime } from 'luxon';
import { toLuxonDateFormat, convertToLocalSystemFormatisValidDateFormat } from './date-formats';

describe('Date formats ISO 8601 offset support', () => {
  it('should map XXX to ZZ via toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format and parse ISO 8601 dates with timezone offsets', () => {
    const dt = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'Asia/Kolkata' });
    const formatted = dt.toFormat(toLuxonDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX"));
    expect(formatted).toBe('2026-03-05T10:20:30.123+05:30');
  });

  it('should parse legacy dates stamped with literal XXX', () => {
    const legacyText = '2026-03-05T10:20:30.123XXX';
    const result = convertToLocalSystemFormat(legacyText, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
