import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('ISO 8601 date format handling', () => {
  it('should translate XXX to ZZ for Luxon formatting', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should parse and format ISO 8601 dates correctly without literal XXX', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const sampleDateStr = '2026-03-05T10:20:30.123+05:30';
    const result = convertToLocalSystemFormat(sampleDateStr, isoFormat, 'UTC');
    expect(result).not.toContain('XXX');
    expect(result).not.toBe('Invalid date');
  });

  it('should handle legacy strings with literal XXX as fallback', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacySample = '2026-03-05T10:20:30.123XXX';
    const result = convertToLocalSystemFormat(legacySample, isoFormat, 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
