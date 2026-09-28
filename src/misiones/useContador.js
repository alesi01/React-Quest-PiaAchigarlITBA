import { useState } from 'react';

export function useContador(inicial = 0) {
  const [valor, setValor] = useState(inicial);

  const incrementar = () => setValor((prev) => prev + 1);
  const decrementar = () => setValor((prev) => Math.max(0, prev - 1));

  return { valor, incrementar, decrementar };
}
