export type Language = 'fr' | 'en';

// English dictionaries are retained for a later URL-addressable rollout.
export function useLang() {
  return { lang: 'fr' as const };
}
