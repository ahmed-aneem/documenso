import { DateTime } from 'luxon';
import { describe, expect, it } from 'vitest';

import { convertToLocalSystemFormat, toLuxonDateFormat } from './date-formats';

describe('ISO 8601 Date Format with Luxon', () => {
  it('should map XXX to ZZ in toLuxonDateFormat', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    expect(toLuxonDateFormat(format)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format and parse ISO 8601 dates with timezone offsets', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const luxonFormat = toLuxonDateFormat(format);

    const date = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'Asia/Kolkata' });
    const formatted = date.toFormat(luxonFormat);

    expect(formatted).toBe('2026-03-05T10:20:30.123+05:30');

    const converted = convertToLocalSystemFormat(formatted, format, 'Asia/Kolkata');
    expect(converted).not.toBe('Invalid date');
  });

  it('should fallback to parsing legacy literal XXX format', () => {
    const format = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    const legacyFormatted = '2026-03-05T10:20:30.123XXX';

    const converted = convertToLocalSystemFormat(legacyFormatted, format, 'Asia/Kolkata');
    expect(converted).not.toBe('Invalid date');
  });
});
