import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat, VALID_DATE_FORMAT_VALUES } from './date-formats';

describe('Date Formats ISO 8601 & Luxon Translation', () => {
  it('should correctly translate XXX to ZZ in toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should validate ISO 8601 format exists in VALID_DATE_FORMAT_VALUES', () => {
    expect(VALID_DATE_FORMAT_VALUES).toContain("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
  });

  it('should correctly parse and format dates with ISO 8601 format', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const testDateString = '2026-03-05T10:20:30.123+05:30';
    
    // Test convertToLocalSystemFormat handles the format correctly
    const converted = convertToLocalSystemFormat(testDateString, format, 'UTC');
    expect(converted).not.toBe('Invalid date');
  });
});
