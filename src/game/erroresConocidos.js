// Diccionario de errores en criollo: el primer patrón que matchea gana.
// Nunca se oculta el error crudo — esto solo agrega una traducción arriba.

export const DICCIONARIO_ERRORES = [
  {
    match: /Cannot read propert(y|ies) of undefined \(reading '([^']+)'\)/,
    mensaje:
      'Estás intentando usar algo que todavía no existe o no le llegó como prop. Revisá qué le estás pasando al componente.',
  },
  {
    match: /is not a function/,
    mensaje:
      'Estás llamando a algo como si fuera una función, pero no lo es. ¿Nombre mal escrito o falta importar?',
  },
  {
    match: /Rendered (fewer|more) hooks (than during the previous render|than expected)/,
    mensaje:
      'Un hook (useState/useEffect) se está llamando de forma condicional. Los hooks siempre se llaman en el mismo orden, en el nivel superior del componente.',
  },
  {
    match: /Objects are not valid as a React child/,
    mensaje:
      'Estás intentando mostrar un objeto directamente en el JSX. Mostrá una propiedad puntual (ej. objeto.nombre) en vez del objeto entero.',
  },
  {
    match: /Too many re-renders/,
    mensaje:
      'Estás llamando a setEstado directamente en el cuerpo del componente (no dentro de un evento o efecto), y eso dispara un renderizado infinito. Moové esa llamada a un manejador de evento (onClick, etc.) o a un useEffect.',
  },
  {
    match: /Maximum update depth exceeded/,
    mensaje:
      'Un useEffect está actualizando el estado en cada render sin las dependencias correctas, generando un bucle infinito. Revisá el array de dependencias.',
  },
  {
    match: /^(\w+) is not defined/,
    mensaje:
      'Estás usando algo que no existe: revisá que esté bien escrito y que lo hayas importado o definido antes de usarlo.',
  },
  {
    match: /Cannot update a component[^)]*while rendering a different component/,
    mensaje:
      'Estás actualizando el estado de un componente mientras se está dibujando otro. Los cambios de estado van dentro de un evento o un useEffect, nunca directamente en el render.',
  },
  {
    match: /Element type is invalid/,
    mensaje:
      'El componente que estás usando no se está importando/exportando bien. Revisá el export default del archivo y el import donde lo usás.',
  },
]

export function traducirError(mensaje) {
  const encontrado = DICCIONARIO_ERRORES.find((d) => d.match.test(mensaje))
  return encontrado?.mensaje ?? null
}
