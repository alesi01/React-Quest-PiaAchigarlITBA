function Inventario({ items }) {
  return (
    <ul>
      <li>{items[0]?.nombre}</li>
    </ul>
  );
}

function Mision3() {
  const objetos = [
    { id: 1, nombre: 'Poción', enStock: true },
    { id: 2, nombre: 'Escudo', enStock: false },
    { id: 3, nombre: 'Mapa', enStock: true },
  ];
  return (
    <div>
      <h2>🎒 Inventario del gremio</h2>
      <Inventario items={objetos} />
    </div>
  );
}
export default Mision3;
