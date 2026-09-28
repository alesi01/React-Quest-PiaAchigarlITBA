import { Component, Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import { traducirError } from './erroresConocidos.js'

class Frontera extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidUpdate(prev) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) this.setState({ error: null })
  }
  render() {
    if (this.state.error) {
      const mensaje = String(this.state.error.message || this.state.error)
      const traduccion = traducirError(mensaje)
      return (
        <div className="error-amigable">
          <strong>🛠 Todavía no compila</strong>
          <p className="traduccion">
            {traduccion
              ? `💬 ${traduccion}`
              : '🤔 No tengo una traducción para este error, pero acá está tal cual lo tira React ⤵'}
          </p>
          <pre className="error-crudo">{mensaje}</pre>
          <small>Leé el mensaje, arreglá el archivo y guardá. Si no se actualiza, apretá 🔄 Reintentar.</small>
        </div>
      )
    }
    return this.props.children
  }
}

export default function Preview({ mision, onResultado }) {
  const [version, setVersion] = useState(0)
  const [sello, setSello] = useState(0)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!import.meta.hot) return
    const alActualizar = () => {
      setSello(Date.now())
      setVersion((v) => v + 1)
    }
    import.meta.hot.on('vite:afterUpdate', alActualizar)
    return () => import.meta.hot.off('vite:afterUpdate', alActualizar)
  }, [])

  const Comp = useMemo(() => {
    const url = `/src/misiones/${mision.file}${sello ? `?t=${sello}` : ''}`
    return lazy(() => import(/* @vite-ignore */ url))
  }, [mision.file, version, sello])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const verificar = async () => {
      let source = ''
      try {
        const raw = await import(/* @vite-ignore */ `/src/misiones/${mision.file}?raw${sello ? `&t=${sello}` : ''}`)
        source = raw.default.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')
      } catch {
        /* sin código fuente, seguimos igual */
      }
      const extra = { source }
      if (mision.id === 5) {
        try {
          const mod = await import(/* @vite-ignore */ `/src/misiones/useContador.js${sello ? `?t=${sello}` : ''}`)
          extra.hookExportado = typeof mod.useContador === 'function'
        } catch {
          extra.hookExportado = false
        }
      }
      const resultados = mision.objetivos.map((o) => {
        try {
          return !!o.test(el, extra)
        } catch {
          return false
        }
      })
      onResultado(mision.id, resultados)
    }
    verificar()
    const obs = new MutationObserver(verificar)
    obs.observe(el, { childList: true, subtree: true, characterData: true, attributes: true })
    const t = setTimeout(verificar, 400)
    return () => {
      obs.disconnect()
      clearTimeout(t)
    }
  }, [mision, version, sello, onResultado])

  return (
    <div className="ventana">
      <div className="ventana-barra">
        <span className="dot r" /> <span className="dot y" /> <span className="dot g" />
        <span className="ventana-url">localhost:5173 · {mision.file}</span>
        <button
          className="mini"
          onClick={() => {
            setSello(Date.now())
            setVersion((v) => v + 1)
          }}
        >
          🔄 Reintentar
        </button>
      </div>
      <div className="ventana-cuerpo">
        <div ref={rootRef} className="vista">
          <Frontera resetKey={version} key={version}>
            <Suspense fallback={<p>Cargando…</p>}>
              <Comp />
            </Suspense>
          </Frontera>
        </div>
      </div>
    </div>
  )
}
