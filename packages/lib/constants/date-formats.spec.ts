import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat, VALID_DATE_FORMAT_VALUES } from './date-formats';

describe('Date Formats ISO 8601 Offset Fix', () => {
  it('should map XXX to ZZ for Luxon formatting', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should validate ISO 8601 format string exists in valid format values', () => {
    expect(VALID_DATE_FORMAT_VALUES).toContain("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
  });

  it('should successfully convert and parse dates with ISO 8601 format', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const testDateStr = '2026-03-05T10:20:30.123+05:30';
    
    const result = convertToLocalSystemFormat(testDateStr, format, 'Asia/Kolkata');
    expect(result).not.toBe('Invalid date');
  });
});
