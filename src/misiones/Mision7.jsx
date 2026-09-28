import { useEffect, useState } from 'react';

function useModoHeroe(activo) {
  const [modo, setModo] = useState(activo ? 'combate' : 'reposo');
  useEffect(() => {
    setModo(activo ? 'combate' : 'reposo');
  }, [activo]);
  return modo;
}

function Mision7() {
  const [heroe] = useState({ nombre: 'Kai', clase: 'Mago' });
  const [combate, setCombate] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const t = setTimeout(() => setCombate(false), 300);
    return () => clearTimeout(t);
  }, []);

  // Bug 4 corregido: agregada dependencia `heroe.nombre`
  useEffect(() => {
    document.title = `Panel de ${heroe.nombre}`;
  }, [heroe.nombre]);

  // Bug 5 corregido: sin mutación directa con .push()
  useEffect(() => {
    setItems([
      { id: 1, nombre: 'Poción' },
      { id: 2, nombre: 'Escudo' },
      { id: 3, nombre: 'Mapa' },
    ]);
  }, []);

  // Bug 2 corregido: el hook se llama de forma incondicional
  const modo = useModoHeroe(combate);

  return (
    <div className="panel-heroe">
      {/* Bug 1 corregido: heroe.nombre en vez del objeto entero */}
      <h2>Panel de {heroe.nombre}</h2>
      <p>Modo: {modo}</p>
      <ul>
        {items.map((item) => (
          /* Bug 3 corregido: key agregada */
          <li key={item.id}>{item.nombre}</li>
        ))}
      </ul>
    </div>
  );
}
export default Mision7;
