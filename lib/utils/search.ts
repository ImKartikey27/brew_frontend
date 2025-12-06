/**
 * Highlight matching text in a string
 * Returns JSX-compatible array with highlighted parts
 */
export function getHighlightedMatches(text: string, query: string) {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return text.split(regex).map((part, index) => ({
    text: part,
    isMatch: regex.test(part),
    key: index,
  }));
}

/**
 * Check if a task matches the search query
 */
export function taskMatchesQuery(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.toLowerCase());
}
