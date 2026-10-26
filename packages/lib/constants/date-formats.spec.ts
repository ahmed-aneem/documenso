import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('ISO 8601 date format handling', () => {
  it('should map XXX to ZZ for Luxon compatibility', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(format)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should successfully parse and convert ISO 8601 dates with offset', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const sampleDate = '2026-03-05T10:20:30.123+05:30';
    const result = convertToLocalSystemFormat(sampleDate, format, 'UTC');
    expect(result).not.toBe('Invalid date');
  });

  it('should fallback and parse legacy dates containing literal XXX', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const sampleLegacyDate = '2026-03-05T10:20:30.123XXX';
    const result = convertToLocalSystemFormat(sampleLegacyDate, format, 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
