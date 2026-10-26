import { describe, expect, it } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemGroup, convertToLocalSystemFormat } from './date-formats';

describe('ISO 8601 date format handling', () => {
  it('should map XXX to ZZ for Luxon format', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly parse and convert ISO 8601 string containing timezone offset', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const sampleDateStr = '2026-03-05T10:20:30.123+05:30';
    
    const result = convertToLocalSystemFormat(sampleDateStr, isoFormat, 'UTC');
    expect(result).not.toBe('Invalid date');
  });

  it('should handle legacy strings with literal XXX fallback', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyDateStr = '2026-03-05T10:20:30.123XXX';

    const result = convertToLocalSystemFormat(legacyDateStr, isoFormat, 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
