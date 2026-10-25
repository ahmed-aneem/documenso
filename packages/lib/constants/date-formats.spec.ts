import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemGroup, convertToLocalSystemFormat } from './date-formats';

describe('ISO 8601 Date Formatting and Parsing', () => {
  it('should map XXX to ZZ for Luxon', () => {
    const storedFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(storedFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly parse and convert ISO 8601 dates with timezone offsets', () => {
    const storedFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const sampleDateStr = '2026-03-05T10:20:30.123+05:30';
    
    const result = convertToLocalSystemFormat(sampleDateStr, storedFormat, 'Asia/Kolkata');
    expect(result).not.toBe('Invalid date');
  });

  it('should support legacy literal XXX formatted dates', () => {
    const storedFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyDateStr = '2026-03-05T10:20:30.123XXX';

    const result = convertToLocalSystemFormat(legacyDateStr, storedFormat, 'Asia/Kolkata');
    expect(result).not.toBe('Invalid date');
  });
});
