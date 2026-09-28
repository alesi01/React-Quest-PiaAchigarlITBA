import { useEffect, useState } from 'react';
import { useContador } from './useContador.js';

const CATALOGO = [
  { id: 1, nombre: 'Poción de vida', precio: 50 },
  { id: 2, nombre: 'Escudo de roble', precio: 120 },
  { id: 3, nombre: 'Mapa del tesoro', precio: 30 },
];

function Producto({ id, nombre, precio, onAgregar }) {
  const { valor, incrementar, decrementar } = useContador(1);

  return (
    <div className="producto">
      <h4>{nombre}</h4>
      <p>${precio}</p>
      <button onClick={decrementar}>-</button>
      <span>{valor}</span>
      <button onClick={incrementar}>+</button>
      <button onClick={() => onAgregar({ id, nombre, precio, cantidad: valor })}>
        Agregar al carrito
      </button>
    </div>
  );
}

function Mision6() {
  const [carrito, setCarrito] = useState([]);
  const [segundosOferta, setSegundosOferta] = useState(30);

  useEffect(() => {
    const id = setInterval(() => {
      setSegundosOferta((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const agregarAlCarrito = (nuevoItem) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.nombre === nuevoItem.nombre);
      if (existe) {
        return prev.map((item) =>
          item.nombre === nuevoItem.nombre
            ? { ...item, cantidad: item.cantidad + nuevoItem.cantidad }
            : item
        );
      }
      return [...prev, nuevoItem];
    });
  };

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div>
      <h2>🏪 El mercado del reino</h2>
      <p className="oferta">
        ⚡ Oferta relámpago: quedan <span className="oferta-segundos">{segundosOferta}</span>s
      </p>

      {CATALOGO.map((p) => (
        <Producto key={p.id} {...p} onAgregar={agregarAlCarrito} />
      ))}

      <h3>Carrito</h3>
      {carrito.length === 0 ? (
        <p>🛒 El carrito está vacío</p>
      ) : (
        <ul>
          {carrito.map((item) => (
            <li key={item.nombre}>
              {item.nombre} x{item.cantidad}
            </li>
          ))}
        </ul>
      )}
      <p className="total">Total: ${total}</p>
    </div>
  );
}

export default Mision6;
