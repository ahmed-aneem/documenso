import { DateTime } from 'luxon';
import { describe, expect, it } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat, VALID_DATE_FORMAT_VALUES } from './date-formats';

describe('ISO 8601 Date Format with Luxon', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format ISO 8601 with timezone offset instead of literal XXX', () => {
    const date = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'Asia/Kolkata' });
    const luxonFormat = toLuxonDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
    const formatted = date.toFormat(luxonFormat);

    expect(formatted).toBe('2026-03-05T10:20:30.123+05:30');
    expect(formatted).not.toContain('XXX');
  });

  it('should successfully convert and parse local system format with ISO 8601', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const sampleText = '2026-03-05T10:20:30.123+05:30';
    const result = convertToLocalSystemFormat(sampleText, isoFormat, 'Asia/Kolkata');
    expect(result).not.toBe('Invalid date');
  });

  it('should contain the ISO 8601 format in valid date format values', () => {
    expect(VALID_DATE_FORMAT_VALUES).toContain("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
  });
});
