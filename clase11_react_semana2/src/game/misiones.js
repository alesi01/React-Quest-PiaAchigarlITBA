// Metadatos de cada misión: historia, objetivos (se verifican en vivo), pistas y solución.
// 👉 Los alumnos NO necesitan tocar este archivo. Solo editan src/misiones/*.jsx

let ultimoValorM4 = null
let ultimoValorM6 = null

export const MISIONES = [
  {
    id: 1,
    file: 'Mision1.jsx',
    titulo: 'La ficha del héroe',
    emoji: '🪪',
    concepto: 'Props, destructuring y children',
    historia:
      'El Gran Archivista del reino necesita fichas de personaje para los héroes nuevos. Armá TarjetaPerfil: un componente que reciba los datos por props y pueda envolver contenido extra (equipo, historia) sin reescribir la tarjeta cada vez.',
    objetivos: [
      {
        label: 'Usá destructuring de props para recibir nombre y nivel, y mostralos en al menos dos tarjetas con datos distintos',
        test: (r) => {
          const cs = [...r.querySelectorAll('.tarjeta-perfil')]
          return cs.length >= 2 && new Set(cs.map((c) => c.textContent)).size >= 2
        },
      },
      {
        label: 'Dale un valor por defecto false a esLegendario directamente en la firma del componente, y mostrá una insignia ⭐ solo cuando sea true',
        test: (r, e) => {
          const cs = [...r.querySelectorAll('.tarjeta-perfil')]
          return (
            /esLegendario\s*=\s*false/.test(e.source) &&
            cs.some((c) => /legendario/i.test(c.textContent)) &&
            cs.some((c) => !/legendario/i.test(c.textContent))
          )
        },
      },
      {
        label: 'Usá props.children para envolver contenido extra dentro de al menos una tarjeta',
        test: (r) => !!r.querySelector('.tarjeta-perfil .equipo'),
      },
    ],
    pistas: [
      'Las props llegan como un objeto: desestructuralas directo en el parámetro → function TarjetaPerfil({ nombre, nivel, esLegendario = false, children })',
      'El valor por defecto va pegado al parámetro, no con ||: esLegendario = false dentro de las llaves de destructuring.',
      'Todo lo que pongas ENTRE <TarjetaPerfil> y </TarjetaPerfil> te llega como children: <TarjetaPerfil ...><p className="equipo">Espada de fuego</p></TarjetaPerfil>',
    ],
    solucion: `function TarjetaPerfil({ nombre, nivel, esLegendario = false, children }) {
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
export default Mision1;`,
  },
  {
    id: 2,
    file: 'Mision2.jsx',
    titulo: 'El cristal de energía',
    emoji: '⚡',
    concepto: 'useState y eventos',
    historia:
      'El cristal de energía del héroe empieza vacío. Armá los botones para cargar y descargar energía — pero recordá: en React nunca se muta el estado directamente.',
    objetivos: [
      {
        label: 'Convertí la energía en estado con useState, iniciando en 0',
        test: (r, e) => /useState\(0\)/.test(e.source) && !!r.querySelector('.valor-energia'),
      },
      {
        label: 'Conectá los botones +/- con onClick, actualizando con el patrón funcional (setEnergia(prev => ...))',
        test: (r, e) => r.querySelectorAll('button').length >= 2 && /set\w+\(\s*\(?\s*\w+\s*\)?\s*=>/.test(e.source),
      },
      {
        label: 'Mostrá el valor actual de la energía en pantalla',
        test: (r) => {
          const el = r.querySelector('.valor-energia')
          return !!el && /^\d+$/.test(el.textContent.trim())
        },
      },
    ],
    pistas: [
      'useState(0) te da un valor y una función para cambiarlo: const [energia, setEnergia] = useState(0)',
      'Patrón funcional: setEnergia((prev) => prev + 1) — nunca energia++ ni energia = energia + 1',
      'Conectá cada botón: <button onClick={() => setEnergia((prev) => prev + 1)}>+</button>',
    ],
    solucion: `import { useState } from 'react';

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
export default Mision2;`,
  },
  {
    id: 3,
    file: 'Mision3.jsx',
    titulo: 'El inventario del gremio',
    emoji: '🎒',
    concepto: 'Renderizado condicional',
    historia:
      'El inventario del gremio está desordenado. Mostrá qué hay en stock y qué no, y avisá con claridad cuando esté vacío.',
    objetivos: [
      {
        label: "Por cada objeto mostrá '✅ En stock' o '❌ Agotado' según su propiedad enStock (ternario o &&)",
        test: (r) => /en stock/i.test(r.textContent) && /agotado/i.test(r.textContent),
      },
      {
        label: 'Renderizá la lista con .map() y una key única (al menos 3 objetos)',
        test: (r) => r.querySelectorAll('ul > li').length >= 3,
      },
      {
        label: "Agregá un early return que muestre 'No hay objetos en el inventario' cuando la lista está vacía, y probalo renderizando el componente con una lista vacía",
        test: (r) => /no hay objetos/i.test(r.textContent),
      },
    ],
    pistas: [
      "Ternario dentro del <li>: {item.enStock ? '✅ En stock' : '❌ Agotado'}",
      '.map() necesita key: items.map((item) => <li key={item.id}>...)',
      'Antes del return principal: if (items.length === 0) return <p>No hay objetos en el inventario</p> — y renderizá el componente dos veces: una con datos, otra con items={[]}',
    ],
    solucion: `function Inventario({ items }) {
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
export default Mision3;`,
  },
  {
    id: 4,
    file: 'Mision4.jsx',
    titulo: 'El cronómetro de la mazmorra',
    emoji: '⏱',
    concepto: 'useEffect y cleanup',
    historia:
      'El cronómetro de la mazmorra debe arrancar solo apenas entrás, y no debe quedar corriendo de fondo si te vas. Usá el array de dependencias y la función de limpieza.',
    objetivos: [
      {
        label: 'Iniciá un setInterval en un useEffect que sume 1 segundo por tick, mostrado en pantalla',
        test: (r) => {
          const el = r.querySelector('.segundos')
          if (!el) return false
          const val = Number(el.textContent)
          if (Number.isNaN(val)) return false
          const subio = ultimoValorM4 !== null && val > ultimoValorM4
          ultimoValorM4 = val
          return subio
        },
      },
      {
        label: 'Limpiá el intervalo con clearInterval en el cleanup del efecto',
        test: (_r, e) => /useEffect\(/.test(e.source) && /return\s*\(?\)?\s*=>\s*{?[^}]*clearInterval/.test(e.source),
      },
      {
        label: 'El efecto debe correr una sola vez al montar (array de dependencias vacío [])',
        test: (_r, e) => /useEffect\([\s\S]*?,\s*\[\]\s*\)/.test(e.source),
      },
    ],
    pistas: [
      'useEffect(() => {...}, []) corre una sola vez, al montar.',
      'Guardá el id de setInterval y devolvé una función que lo limpie: return () => clearInterval(id)',
      'El segundo argumento de useEffect es el array de dependencias: [] significa "solo al montar".',
    ],
    solucion: `import { useEffect, useState } from 'react';

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
export default Mision4;`,
  },
  {
    id: 5,
    file: 'Mision5.jsx',
    titulo: 'La herramienta reutilizable',
    emoji: '🔧',
    concepto: 'Custom hooks',
    historia:
      'Ya armaste el contador de energía a mano. Convertilo en una herramienta reutilizable: un custom hook que cualquier misión (¡o el jefe final!) pueda usar sin copiar y pegar código.',
    objetivos: [
      {
        label: 'Paso 1 · Completá useContador.js: debe exportar una función useContador que devuelva { valor, incrementar, decrementar }',
        test: (_r, e) => e.hookExportado === true,
      },
      {
        label: 'Paso 2 · Importá useContador en Mision5.jsx',
        test: (_r, e) => /import\s*{\s*useContador\s*}\s*from\s*['"]\.\/useContador/.test(e.source),
      },
      {
        label: 'Paso 3 · Usalo para mostrar el valor y conectar los botones +/-',
        test: (r, e) => /useContador\(/.test(e.source) && r.querySelectorAll('button').length >= 2 && !!r.querySelector('.valor-energia'),
      },
    ],
    pistas: [
      'Un custom hook es una función que empieza con "use" y puede llamar a otros hooks adentro (useState, etc.).',
      'Adentro de useContador: const [valor, setValor] = useState(inicial), definí incrementar/decrementar, y return { valor, incrementar, decrementar }.',
      'En Mision5.jsx: const { valor, incrementar, decrementar } = useContador(0)',
    ],
    solucion: `// useContador.js
import { useState } from 'react';

export function useContador(inicial = 0) {
  const [valor, setValor] = useState(inicial);
  const incrementar = () => setValor((prev) => prev + 1);
  const decrementar = () => setValor((prev) => Math.max(0, prev - 1));
  return { valor, incrementar, decrementar };
}

// Mision5.jsx
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
export default Mision5;`,
  },
  {
    id: 6,
    file: 'Mision6.jsx',
    titulo: 'Jefe final: el mercado del reino',
    emoji: '🏪',
    concepto: 'Todo junto',
    historia:
      '¡El jefe final! El mercado del reino necesita un carrito de compras: mostrá el catálogo, dejá que los héroes agreguen productos, y anunciá con un contador regresivo la oferta relámpago de hoy.',
    objetivos: [
      {
        label: 'Catálogo renderizado con .map() y key (al menos 3 productos)',
        test: (r) => r.querySelectorAll('.producto').length >= 3,
      },
      {
        label: 'Cada producto usa useContador para su selector de cantidad (+/-)',
        test: (r, e) =>
          /useContador\(/.test(e.source) &&
          [...r.querySelectorAll('.producto')].every((p) => p.querySelectorAll('button').length >= 2),
      },
      {
        label: 'El carrito se muestra vacío o con productos según corresponda (carrito.length)',
        test: (_r, e) => /carrito\.length\s*===?\s*0/.test(e.source) || /carrito\.length\s*>\s*0/.test(e.source),
      },
      {
        label: 'Un useEffect con setInterval/clearInterval (cleanup) hace bajar el contador de la oferta relámpago',
        test: (r) => {
          const el = r.querySelector('.oferta-segundos')
          if (!el) return false
          const val = Number(el.textContent)
          if (Number.isNaN(val)) return false
          const bajo = ultimoValorM6 !== null && val < ultimoValorM6
          ultimoValorM6 = val
          return bajo
        },
      },
      {
        label: 'Mostrá el total del carrito calculado a partir de los productos agregados',
        test: (r) => {
          const el = r.querySelector('.total')
          return !!el && /\d/.test(el.textContent)
        },
      },
    ],
    pistas: [
      'Cada producto es un componente que recibe nombre y precio por props, y usa useContador para su propia cantidad.',
      'El carrito es un array en el estado del componente padre: agregar un producto es setCarrito((prev) => [...prev, item]) — nunca lo mutes con .push().',
      'Para la oferta relámpago: useEffect con setInterval que resta 1 cada segundo, clearInterval en el cleanup, con [] de dependencias.',
    ],
    solucion: `import { useEffect, useState } from 'react';
import { useContador } from './useContador.js';

const CATALOGO = [
  { id: 1, nombre: 'Poción de vida', precio: 50 },
  { id: 2, nombre: 'Escudo de roble', precio: 120 },
  { id: 3, nombre: 'Mapa del tesoro', precio: 30 },
];

function Producto({ nombre, precio, onAgregar }) {
  const { valor, incrementar, decrementar } = useContador(1);
  return (
    <div className="producto">
      <h4>{nombre}</h4>
      <p>\${precio}</p>
      <button onClick={decrementar}>-</button>
      <span>{valor}</span>
      <button onClick={incrementar}>+</button>
      <button onClick={() => onAgregar({ nombre, precio, cantidad: valor })}>
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

  const agregarAlCarrito = (item) => setCarrito((prev) => [...prev, item]);
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div>
      <h2>🏪 El mercado del reino</h2>
      <p className="oferta">⚡ Oferta relámpago: quedan <span className="oferta-segundos">{segundosOferta}</span>s</p>

      {CATALOGO.map((p) => (
        <Producto key={p.id} {...p} onAgregar={agregarAlCarrito} />
      ))}

      <h3>Carrito</h3>
      {carrito.length === 0 ? (
        <p>🛒 El carrito está vacío</p>
      ) : (
        <ul>
          {carrito.map((item, i) => (
            <li key={i}>{item.nombre} x{item.cantidad}</li>
          ))}
        </ul>
      )}
      <p className="total">Total: \${total}</p>
    </div>
  );
}
export default Mision6;`,
  },
  {
    id: 7,
    file: 'Mision7.jsx',
    titulo: 'Bonus: cazá los 5 bugs',
    emoji: '🐛',
    concepto: 'Debugging de hooks y estado',
    historia:
      'Este panel del héroe tiene 5 bugs escondidos. Vite y el panel de errores te van a ayudar con los que rompen el render — los otros son más sutiles: no tiran error, simplemente no funcionan bien. Arreglá uno, guardá, y fijate qué pasa.',
    objetivos: [
      {
        label: 'Bug 1 · Mostrá el nombre del héroe, no el objeto entero',
        test: (r) => !!r.querySelector('.panel-heroe'),
      },
      {
        label: 'Bug 2 · Sacá el hook useModoHeroe de adentro del if para que no truene al terminar el combate',
        test: (r) => {
          const parrafos = [...r.querySelectorAll('.panel-heroe p')]
          const modoP = parrafos.find((p) => /modo:/i.test(p.textContent))
          return !!modoP && /reposo/i.test(modoP.textContent)
        },
      },
      {
        label: 'Bug 3 · Agregale una key única a cada <li> de la lista',
        test: (_r, e) => /\.map\(\s*\([^)]*\)\s*=>[\s\S]*?<li[^>]*\bkey\s*=/.test(e.source),
      },
      {
        label: 'Bug 4 · El título de la pestaña debe actualizarse si cambia el nombre del héroe (dependencia correcta)',
        test: (_r, e) => /useEffect\([\s\S]*?document\.title[\s\S]*?,\s*\[\s*heroe\.nombre\s*\]\s*\)/.test(e.source),
      },
      {
        label: 'Bug 5 · Los 3 items iniciales tienen que aparecer en la lista (sin mutar el estado)',
        test: (r, e) => r.querySelectorAll('.panel-heroe li').length >= 3 && !/\.push\(/.test(e.source),
      },
    ],
    pistas: [
      'El panel de errores en criollo (y la consola del navegador, F12) te dicen exactamente qué objeto/qué hook está fallando — empezá por ahí.',
      'Un hook nunca puede estar adentro de un if. Sacalo afuera y pasale la condición como argumento: useModoHeroe(combate).',
      'Para listas: nunca mutes con .push() — usá setItems((prev) => [...prev, nuevo]). Para efectos: la dependencia va siempre que uses una variable adentro. Para listas renderizadas: key va en el elemento que devuelve el .map().',
    ],
    solucion: `import { useEffect, useState } from 'react';

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

  useEffect(() => {
    document.title = \`Panel de \${heroe.nombre}\`;
  }, [heroe.nombre]);

  useEffect(() => {
    setItems([
      { id: 1, nombre: 'Poción' },
      { id: 2, nombre: 'Escudo' },
      { id: 3, nombre: 'Mapa' },
    ]);
  }, []);

  const modo = useModoHeroe(combate);

  return (
    <div className="panel-heroe">
      <h2>Panel de {heroe.nombre}</h2>
      <p>Modo: {modo}</p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.nombre}</li>
        ))}
      </ul>
    </div>
  );
}
export default Mision7;`,
  },
]

export const RANGOS = [
  { xp: 0, nombre: 'Aprendiz de Hooks' },
  { xp: 70, nombre: 'Domador de Estado' },
  { xp: 160, nombre: 'Arquitecto de Efectos' },
  { xp: 260, nombre: 'Hook Wizard 🧙‍♂️' },
  { xp: 350, nombre: 'Leyenda de React Avanzado 👑' },
]
