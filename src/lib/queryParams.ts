import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

type ParamValue = string | string[] | undefined;

export function useQueryParams<T extends Record<string, ParamValue>>(defaults: T) {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => {
    const entries: [string, ParamValue][] = Object.entries(defaults).map(([key, defaultValue]) => {
      if (Array.isArray(defaultValue)) {
        const values = searchParams.getAll(key);
        return [key, values.length ? values : defaultValue];
      }
      const value = searchParams.get(key);
      return [key, value ?? defaultValue];
    });
    return Object.fromEntries(entries) as T;
  }, [defaults, searchParams]);

  const update = useCallback(
    (next: Partial<T>, options?: { replace?: boolean }) => {
      const newParams = new URLSearchParams(searchParams);
      Object.entries(next).forEach(([key, value]) => {
        newParams.delete(key);
        if (Array.isArray(value)) {
          value.filter(Boolean).forEach((item) => newParams.append(key, item));
        } else if (value) {
          newParams.set(key, value);
        }
      });
      setSearchParams(newParams, { replace: options?.replace ?? true });
    },
    [searchParams, setSearchParams],
  );

  return [params, update] as const;
}
