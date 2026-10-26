import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemExpression } from './date-formats';

describe('ISO 8601 Date Format Helpers', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should parse legacy date strings containing literal XXX', () => {
    const legacyText = '2026-03-05T10:20:30.123XXX';
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const result = convertToLocalSystemFormat(legacyText, isoFormat, 'UTC');
    expect(result).not.toBe('Invalid date');
  });
});
