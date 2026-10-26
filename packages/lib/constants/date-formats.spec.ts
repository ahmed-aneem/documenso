import { DateTime } from 'luxon';
import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat, VALID_DATE_FORMAT_VALUES } from './date-formats';

describe('ISO 8601 Date Format with Luxon', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    const isoFormat = VALID_DATE_FORMAT_VALUES[VALID_DATE_FORMAT_VALUES.length - 1];
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format and parse ISO 8601 dates with timezone offset', () => {
    const isoFormat = VALID_DATE_FORMAT_VALUES[VALID_DATE_FORMAT_VALUES.length - 1];
    const luxonFormat = toLuxonDateFormat(isoFormat);
    
    const date = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'Asia/Kolkata' });
    const formatted = date.toFormat(luxonFormat);
    
    expect(formatted).toBe('2026-03-05T10:20:30.123+05:30');

    const localConverted = convertToLocalSystemFormat(formatted, isoFormat, 'Asia/Kolkata');
    expect(localConverted).not.toBe('Invalid date');
  });

  it('should support legacy strings containing literal XXX', () => {
    const isoFormat = VALID_DATE_FORMAT_VALUES[VALID_DATE_FORMAT_VALUES.length - 1];
    const legacyString = '2026-03-05T10:20:30.123XXX';
    
    const converted = convertToLocalSystemFormat(legacyString, isoFormat, 'Asia/Kolkata');
    expect(converted).not.toBe('Invalid date');
  });
});
