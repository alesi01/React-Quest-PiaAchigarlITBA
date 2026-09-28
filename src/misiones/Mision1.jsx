function TarjetaPerfil({ nombre, nivel, esLegendario = false, children }) {
  return (
    <div className="tarjeta-perfil">
      <h3>{nombre} · Nivel {nivel}</h3>
      {esLegendario && <span className="insignia">⭐ Legendario</span>}
      {children}
    </div>
  );
}

function Mision1() {
  return (
    <>
      <TarjetaPerfil nombre="Aria" nivel={12} esLegendario>
        <p className="equipo">Equipo: Espada de fuego</p>
      </TarjetaPerfil>
      <TarjetaPerfil nombre="Bram" nivel={7} />
    </>
  );
}
export default Mision1;
