import { DateTime } from 'luxon';
import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('date-formats ISO 8601 handling', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format ISO 8601 with timezone offset using Luxon', () => {
    const date = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'Asia/Kolkata' });
    const formatted = date.toFormat(toLuxonDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX"));
    expect(formatted).toBe('2026-03-05T10:20:30.123+05:30');
  });

  it('should successfully convert and parse local system format with ISO 8601', () => {
    const sampleDateStr = '2026-03-05T10:20:30.123+05:30';
    const result = convertToLocalSystemFormat(sampleDateStr, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", 'Asia/Kolkata');
    expect(result).not.toBe('Invalid date');
  });

  it('should fall back to legacy XXX parsing for backwards compatibility', () => {
    const legacyDateStr = '2026-03-05T10:20:30.123XXX';
    const result = convertToLocalSystemFormat(legacyDateStr, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", 'Asia/Kolkata');
    expect(result).not.toBe('Invalid date');
  });
});
