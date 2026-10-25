import { describe, it, expect } from 'vitest';
import { DateTime } from 'luxon';
import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('ISO 8601 date format offset handling', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(format)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should format ISO 8601 with timezone offset instead of literal XXX', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const luxonFormat = toLuxonDateFormat(format);
    const date = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'Asia/Kolkata' });
    const formatted = date.toFormat(luxonFormat);

    expect(formatted).toBe('2026-03-05T10:20:30.123+05:30');
  });

  it('should correctly parse and convert customText with convertToLocalSystemFormat', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const text = '2026-03-05T10:20:30.123+05:30';
    const result = convertToLocalSystemFormat(text, format, 'Asia/Kolkata');
    expect(result).not.toBe('Invalid date');
  });
});
