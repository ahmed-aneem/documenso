import { DateTime } from 'luxon';
import { describe, it, expect } from 'vitest';
import {
  toLuxonDateFormat,
  convertToLocalSystemFormat,
  VALID_DATE_FORMAT_VALUES,
} from './date-formats';

describe('ISO 8601 Date Format Support', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format ISO 8601 with timezone offset using Luxon', () => {
    const isoFormat = VALID_DATE_FORMAT_VALUES[VALID_DATE_FORMAT_VALUES.length - 1];
    const dt = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'UTC' });
    const formatted = dt.toFormat(toLuxonDateFormat(isoFormat));
    expect(formatted).toBe('2026-03-05T10:20:30.123+00:00');
  });

  it('should convert to local system format properly when parsing ISO 8601 dates', () => {
    const isoFormat = VALID_DATE_FORMAT_VALUES[VALID_DATE_FORMAT_VALUES.length - 1];
    const testDateString = '2026-03-05T10:20:30.123+00:00';
    const result = convertToLocalSystemFormat(testDateString, isoFormat, 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
