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

  // Bug 4: falta la dependencia `heroe.nombre`
  useEffect(() => {
    document.title = `Panel de ${heroe.nombre}`;
  }, []);

  // Bug 5: mutación directa de estado
  useEffect(() => {
    items.push({ id: 1, nombre: 'Poción' });
    items.push({ id: 2, nombre: 'Escudo' });
    items.push({ id: 3, nombre: 'Mapa' });
    setItems(items);
  }, []);

  // Bug 2: hook llamado condicionalmente
  if (combate) {
    var modo = useModoHeroe(true);
  }

  return (
    <div className="panel-heroe">
      {/* Bug 1: objeto entero en vez de heroe.nombre */}
      <h2>Panel de {heroe}</h2>
      <p>Modo: {modo}</p>
      <ul>
        {items.map((item) => (
          <li>{item.nombre}</li> // Bug 3: falta key
        ))}
      </ul>
    </div>
  );
}
export default Mision7;
