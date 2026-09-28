import { useState } from 'react';

function Mision2() {
  const [energia, setEnergia] = useState(0);

  return (
    <div>
      <h2>⚡ Cristal de energía</h2>
      <p className="valor-energia">{energia}</p>
      <button onClick={() => setEnergia((prev) => Math.max(0, prev - 1))}>-</button>
      <button onClick={() => setEnergia((prev) => prev + 1)}>+</button>
    </div>
  );
}
export default Mision2;
