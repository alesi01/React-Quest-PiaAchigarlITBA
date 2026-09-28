import { useEffect, useState } from 'react';

function Mision4() {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSegundos((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <h2>⏱ Cronómetro de la mazmorra</h2>
      <p className="segundos">{segundos}</p>
    </div>
  );
}
export default Mision4;
