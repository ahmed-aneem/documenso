import { DateTime } from 'luxon';
import { describe, expect, it } from 'vitest';

import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('Date Formats & ISO 8601 Offset', () => {
  it('should correctly map XXX to ZZ in toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should format ISO 8601 dates with timezone offset correctly using Luxon', () => {
    const date = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'Asia/Kolkata' });
    const formatted = date.toFormat(toLuxonDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX"));
    expect(formatted).toBe('2026-03-05T10:20:30.123+05:30');
  });

  it('should parse and convert ISO 8601 dates with convertToLocalSystemFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const sampleDateStr = '2026-03-05T10:20:30.123+05:30';
    const result = convertToLocalSystemFormat(sampleDateStr, isoFormat, 'Asia/Kolkata');
    expect(result).not.toBe('Invalid date');
  });
});
