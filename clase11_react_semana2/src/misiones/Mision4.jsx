import { useState } from 'react';

function Mision4() {
  const [segundos, setSegundos] = useState(0);

  return (
    <div>
      <h2>⏱ Cronómetro de la mazmorra</h2>
      <p className="segundos">{segundos}</p>
    </div>
  );
}
export default Mision4;
