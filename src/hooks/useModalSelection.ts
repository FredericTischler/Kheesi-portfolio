import { useCallback, useState } from "react";

export function useModalSelection<T>() {
  const [selected, setSelected] = useState<T | null>(null);
  const openModal = useCallback((value: T) => setSelected(value), []);
  const closeModal = useCallback(() => setSelected(null), []);

  return {
    selected,
    isOpen: selected !== null,
    openModal,
    closeModal,
  } as const;
}
