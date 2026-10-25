import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemGroup, convertToLocalSystemFormat, VALID_DATE_FORMAT_VALUES } from './date-formats';

describe('Date Formats & ISO 8601 Offset Handling', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format and convert ISO 8601 with timezone offset', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const testDateString = '2026-03-05T10:20:30.123+05:30';
    
    const result = convertToLocalSystemFormat(testDateString, isoFormat, 'Asia/Kolkata');
    expect(result).not.toBe('Invalid date');
  });
});
