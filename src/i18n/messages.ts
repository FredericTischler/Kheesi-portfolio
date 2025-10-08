import en from "./en.json";
import fr from "./fr.json";

import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/types";

const dictionaries: Record<Locale, Messages> = {
  fr: fr as Messages,
  en: en as Messages,
};

export function getMessages(locale: Locale): Messages {
  const dictionary = dictionaries[locale];
  if (!dictionary) {
    throw new Error(`Missing translations for locale: ${locale}`);
  }
  return dictionary;
}

export const messages = dictionaries;
