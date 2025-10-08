import { useLocale } from "@/i18n/LocaleProvider";
import { messages } from "@/i18n/messages";
import type { Messages } from "@/i18n/types";

type Namespace = keyof Messages;

export function useTranslations<N extends Namespace>(namespace: N): Messages[N] {
  const { locale } = useLocale();
  const dictionary = messages[locale];
  const segment = dictionary?.[namespace];

  if (!segment) {
    throw new Error(`Missing translations for namespace "${String(namespace)}" in locale "${locale}"`);
  }

  return segment;
}
