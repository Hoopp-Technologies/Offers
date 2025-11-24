/**
 * Capitalizes only the first letter of a string, leaving the rest unchanged.
 * @param text - The text to capitalize
 * @returns The text with only the first letter capitalized
 */
export const capitalizeText = (text: string): string => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
