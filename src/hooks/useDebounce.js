// IA-ASSISTED: Utilizei o Inner AI para auxiliar na criação do hook
// de debounce. Entendi como o useEffect com setTimeout funciona para atrasar
// a execução e como o cleanup function evita memory leaks, para atender o problema de
// delay na busca.

import { useState, useEffect } from "react";

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
