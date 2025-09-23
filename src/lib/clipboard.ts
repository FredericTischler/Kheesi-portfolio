import { useCallback, useState } from "react";

export function useClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (value: string) => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), timeout);
      } catch (error) {
        console.error("Clipboard error", error);
      }
    },
    [timeout],
  );

  return { copied, copy } as const;
}
