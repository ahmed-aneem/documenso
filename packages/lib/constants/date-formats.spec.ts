import { describe, it, expect } from 'vitest';
import { toLuxonDateFormat, convertToLocalSystemProgramInternal, convertToLocalSystemFormat } from './date-formats';

describe('ISO 8601 date format handling', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    expect(toLuxonDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX")).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format and parse ISO 8601 with timezone offset', () => {
    const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const luxonFmt = toLuxonDateFormat(isoFormat);
    expect(luxonFmt).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");

    const formatted = convertToLocalSystemFormat('2026-03-05T10:20:30.123+05:30', isoFormat, 'Asia/Kolkata');
    expect(formatted).not.toBe('Invalid date');
  });
});
