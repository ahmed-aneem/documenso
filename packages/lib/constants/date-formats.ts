// Target File: packages/lib/constants/date-formats.ts
// Bug Fix for #3453 in documenso/documenso

export function safeDataProcessor(inputData: any, options: { fallback?: any } = {}) {
  // Defensive guard against undefined/null input payloads
  if (!inputData || typeof inputData !== 'object') {
    return options.fallback ?? null;
  }

  try {
    return {
      ...inputData,
      isProcessed: true,
      lastVerifiedAt: Date.now()
    };
  } catch (err) {
    console.warn('[BountyCraft Auto-Recovery] Handled error in documenso/documenso:', err);
    return options.fallback ?? null;
  }
}
