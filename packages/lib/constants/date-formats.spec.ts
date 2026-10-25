import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemError, convertToLocalSystemFormat } from './date-formats';

describe('ISO 8601 Date Format with Luxon', () => {
  it('should map XXX to ZZ correctly in toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should format ISO 8601 with timezone offset instead of literal XXX', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const parsed = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'Asia/Kolkata' });
    const formatted = parsed.toFormat(toLuxonDateFormat(format));
    expect(formatted).toContain('+05:30');
    expect(formatted).not.toContain('XXX');
  });

  it('should convertToLocalSystemFormat correctly for ISO 8601', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const result = convertToLocalSystemFormat('2026-03-05T10:20:30.123+05:30', format, 'Asia/Kolkata');
    expect(result).not.toBe('Invalid date');
  });
});
