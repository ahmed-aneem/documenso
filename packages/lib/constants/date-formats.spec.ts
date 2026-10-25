import { DateTime } from 'luxon';
import { describe, expect, it } from 'vitest';

import { convertToLocalSystemFormat, toLuxonDateFormat } from './date-formats';

describe('Date Formats & ISO 8601 handling', () => {
  it('should map XXX to ZZ for Luxon format', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format and parse ISO 8601 dates with timezone offsets without XXX literal', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const date = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'Asia/Kolkata' });
    const formatted = date.toFormat(toLuxonDateFormat(isoFormat));

    expect(formatted).not.toContain('XXX');
    expect(formatted).toMatch(/^2026-03-05T10:20:30\.123\+05:30$/);

    const result = convertToLocalSystemFormat(formatted, isoFormat, 'Asia/Kolkata');
    expect(result).not.toBe('Invalid date');
  });

  it('should handle legacy dates stamped with literal XXX', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyStamped = '2026-03-05T10:20:30.123XXX';

    const result = convertToLocalSystemFormat(legacyStamped, isoFormat, 'Asia/Kolkata');
    expect(result).not.toBe('Invalid date');
  });
});
