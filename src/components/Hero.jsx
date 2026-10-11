import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { siteContent } from '../data/siteContent.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

export default function Hero({ onQuote }) {
  const reduced = useReducedMotion()
  const initial = reduced ? false : { opacity: 0, y: 18 }
  const animate = { opacity: 1, y: 0 }

  return (
    <section className="hero" id="accueil" aria-labelledby="hero-title">
      <img className="hero__image" src={siteContent.hero.image} alt="Travaux de toiture dans un environnement alpin" fetchPriority="high" />
      <div className="hero__overlay" />
      <div className="container hero__content">
        <motion.p className="eyebrow eyebrow--hero" initial={initial} animate={animate} transition={{ duration: 0.55, delay: 0.15 }}>
          <span>{siteContent.hero.eyebrow}</span>
        </motion.p>
        <motion.h1 id="hero-title" initial={initial} animate={animate} transition={{ duration: 0.6, delay: 0.25 }}>
          {siteContent.hero.titleLead} <span>{siteContent.hero.titleAccent}</span>
        </motion.h1>
        <motion.p className="hero__description" initial={initial} animate={animate} transition={{ duration: 0.6, delay: 0.37 }}>
          {siteContent.hero.description}
        </motion.p>
        <motion.div className="hero__actions" initial={initial} animate={animate} transition={{ duration: 0.6, delay: 0.5 }}>
          <button className="button button--primary" type="button" onClick={onQuote}>
            Demander un devis <ArrowRight size={17} aria-hidden="true" />
          </button>
          <a className="button button--outline-light" href="#services">
            Nos services
          </a>
        </motion.div>
      </div>
    </section>
  )
}
