import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, X } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

export default function ProjectModal({ project, onClose, onQuote }) {
  const closeRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!project) return undefined
    closeRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="modal-backdrop" role="presentation" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduced ? undefined : { opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
          <motion.div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: 16 }}>
            <button className="modal-close" ref={closeRef} type="button" onClick={onClose} aria-label="Fermer le projet">
              <X size={21} aria-hidden="true" />
            </button>
            <img src={project.image} alt={`${project.title}, ${project.location}`} />
            <div className="project-modal__content">
              <p className="eyebrow"><span>RÉALISATION</span></p>
              <h2 id="project-modal-title">{project.title}</h2>
              <p className="project-modal__location">{project.location}</p>
              <p>{project.description}</p>
              <button className="button button--primary" type="button" onClick={onQuote}>
                Demander un devis <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
