import { DateTime } from 'luxon';
import { describe, expect, it } from 'vitest';

import { convertToLocalSystemFormat, toLuxonDateFormat } from './date-formats';

describe('ISO 8601 Date Format with Luxon', () => {
  const isoFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";

  it('should convert XXX to ZZ for Luxon formatting', () => {
    expect(toLuxonDateFormat(isoFormat)).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
  });

  it('should correctly format and parse ISO 8601 dates with timezone offsets', () => {
    const date = DateTime.fromISO('2026-03-05T10:20:30.123', { zone: 'Asia/Kolkata' });
    const formatted = date.toFormat(toLuxonDateFormat(isoFormat));

    expect(formatted).toBe('2026-03-05T10:20:30.123+05:30');

    const converted = convertToLocalSystemFormat(formatted, isoFormat, 'Asia/Kolkata');
    expect(converted).not.toBe('Invalid date');
  });

  it('should support parsing legacy dates stamped with literal XXX', () => {
    const legacyStampedText = '2026-03-05T10:20:30.123XXX';
    const converted = convertToLocalSystemFormat(legacyStampedText, isoFormat, 'Asia/Kolkata');

    expect(converted).not.toBe('Invalid date');
  });
});
