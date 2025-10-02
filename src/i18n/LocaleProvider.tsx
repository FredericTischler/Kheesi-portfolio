import { createContext, type ReactNode, useContext, useMemo } from "react";

import { DEFAULT_LOCALE, type Locale, buildLocalizedPath, getBasePath } from "@/i18n/config";

type LocaleContextValue = {
  locale: Locale;
  defaultLocale: Locale;
  basePath: string;
  buildPath: (path: string) => string;
  switchPath: (path: string, targetLocale: Locale) => string;
};

export const LocaleContext = createContext<LocaleContextValue | null>(null);

type LocaleProviderProps = {
  locale: Locale;
  children: ReactNode;
};

export function LocaleProvider({ locale, children }: LocaleProviderProps) {
  const basePath = getBasePath(locale);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      defaultLocale: DEFAULT_LOCALE,
      basePath,
      buildPath: (path: string) => buildLocalizedPath(locale, path),
      switchPath: (path: string, targetLocale: Locale) => buildLocalizedPath(targetLocale, path),
    }),
    [basePath, locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
