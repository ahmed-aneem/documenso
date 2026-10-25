import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemModel, convertToLocalSystemFormat } from './date-formats';

describe('ISO 8601 Date Format with Luxon', () => {
  it('should map XXX to ZZ via toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should format ISO 8601 correctly with timezone offset instead of literal XXX', () => {
    // Testing conversion/formatting logic through convertToLocalSystemFormat
    const sampleDateStr = '2026-03-05T10:20:30.123+05:30';
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    
    // Parse and format back via convertToLocalSystemFormat
    const result = convertToLocalSystemFormat(sampleDateStr, isoFormat, 'UTC');
    expect(result).not.toContain('XXX');
  });

  it('should parse legacy date containing literal XXX correctly', () => {
    const legacyDateStr = '2026-03-05T10:20:30.123XXX';
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";

    const result = convertToLocalSystemFormat(legacyDateStr, isoFormat, 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
