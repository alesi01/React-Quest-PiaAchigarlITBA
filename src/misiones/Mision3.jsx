function Inventario({ items }) {
  if (items.length === 0) {
    return <p>No hay objetos en el inventario</p>;
  }
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.nombre} — {item.enStock ? '✅ En stock' : '❌ Agotado'}
        </li>
      ))}
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
      <h3>Inventario de un aventurero nuevo</h3>
      <Inventario items={[]} />
    </div>
  );
}
export default Mision3;
