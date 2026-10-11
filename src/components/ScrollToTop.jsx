import { ArrowUp } from 'lucide-react'

export default function ScrollToTop({ visible }) {
  if (!visible) return null
  return (
    <button className="scroll-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Retour en haut de la page">
      <ArrowUp size={17} aria-hidden="true" />
    </button>
  )
}
