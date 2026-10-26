import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemFormat } from './date-formats';

describe('Date formats and ISO 8601 offset handling', () => {
  it('should map XXX to ZZ via toLuxonDateFormat', () => {
    expect(toLuxonDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX")).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
    expect(toLuxonDateFormat('yyyy-MM-dd')).toBe('yyyy-MM-dd');
  });

  it('should parse and format ISO 8601 dates with proper timezone offset', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const testDateText = '2026-03-05T10:20:30.123+05:30';
    
    const converted = convertToLocalSystemFormat(testDateText, isoFormat, 'Asia/Kolkata');
    expect(converted).not.toBe('Invalid date');
    expect(converted).toContain('+05:30');
  });

  it('should handle legacy dates containing literal XXX gracefully', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyText = '2026-03-05T10:20:30.123XXX';

    const converted = convertToLocalSystemFormat(legacyText, isoFormat, 'UTC');
    expect(converted).not.toBe('Invalid date');
  });
});
