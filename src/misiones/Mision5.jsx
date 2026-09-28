import { useContador } from './useContador.js';

function Mision5() {
  const { valor, incrementar, decrementar } = useContador(0);

  return (
    <div>
      <h2>⚡ Energía reutilizable</h2>
      <p className="valor-energia">{valor}</p>
      <button onClick={decrementar}>-</button>
      <button onClick={incrementar}>+</button>
    </div>
  );
}
export default Mision5;
