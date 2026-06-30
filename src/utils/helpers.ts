// Pure utility functions — no React, DOM, or network dependencies

/**
 * Generates a unique ID string (used for Toast IDs, etc.)
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Formats an ISO date string to a human-readable format
 * e.g. "2024-01-15T10:30:00" → "Jan 15, 2024"
 */
export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Truncates a string to a max length, appending "..." if truncated
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}
