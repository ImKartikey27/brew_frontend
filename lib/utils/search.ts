/**
 * Highlight matching text in a string
 * Returns array with highlighted parts
 */
export function getHighlightedMatches(
  text: string,
  query: string
): { text: string; isMatch: boolean; key: number }[] {
  if (!query.trim()) {
    return [{ text, isMatch: false, key: 0 }];
  }

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return text.split(regex).map((part, index) => ({
    text: part,
    isMatch: part.toLowerCase() === query.toLowerCase(),
    key: index,
  }));
}

/**
 * Check if a task matches the search query
 */
export function taskMatchesQuery(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.toLowerCase());
}
