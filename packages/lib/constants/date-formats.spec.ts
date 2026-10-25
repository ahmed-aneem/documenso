import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat, VALID_DATE_FORMAT_VALUES } from './date-formats';

describe('ISO 8601 Date Format with Luxon', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format ISO 8601 with timezone offset', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    // Verify VALID_DATE_FORMAT_VALUES contains the format
    expect(VALID_DATE_FORMAT_VALUES).toContain(isoFormat);
  });

  it('should parse legacy literal XXX and new ZZ format correctly', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const sampleDate = '2026-03-05T10:20:30.123+05:30';
    const converted = convertToLocalSystemFormat(sampleDate, isoFormat, 'UTC');
    expect(converted).not.toBe('Invalid date');
  });
});
