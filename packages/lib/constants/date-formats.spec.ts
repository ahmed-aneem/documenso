import { describe, it, expect } from 'vitest';
import { DateTime } from 'luxon';
import { toLuxonDateFormat, convertToLocalSystemFormat, VALID_DATE_FORMAT_VALUES } from './date-formats';

describe('ISO 8601 and Date Formats', () => {
  it('should map ISO 8601 format token XXX to Luxon ZZ correctly', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");

    const dt = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'Asia/Kolkata' });
    const formatted = dt.toFormat(toLuxonDateFormat(isoFormat));

    expect(formatted).toBe('2026-03-05T10:20:30.123+05:30');
  });

  it('should convert local system format successfully with ISO 8601', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const sampleDateStr = '2026-03-05T10:20:30.123+05:30';
    const converted = convertToLocalSystemFormat(sampleDateStr, isoFormat, 'Asia/Kolkata');

    expect(converted).not.toBe('Invalid date');
  });

  it('should fallback correctly for legacy dates containing literal XXX', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyStr = '2026-03-05T10:20:30.123XXX';
    const converted = convertToLocalSystemFormat(legacyStr, isoFormat, 'Asia/Kolkata');

    expect(converted).not.toBe('Invalid date');
  });

  it('should contain ISO 8601 in valid date format values', () => {
    expect(VALID_DATE_FORMAT_VALUES).toContain("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
  });
});
