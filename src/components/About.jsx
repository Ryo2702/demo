import { ArrowRight } from 'lucide-react'
import { siteContent } from '../data/siteContent.js'

export default function About() {
  return (
    <section className="about" id="a-propos" aria-labelledby="about-title">
      <div className="about__copy" data-reveal>
        <div className="about__copy-inner">
          <p className="eyebrow eyebrow--light"><span>{siteContent.about.eyebrow}</span></p>
          <h2 id="about-title">{siteContent.about.title}</h2>
          <p>{siteContent.about.description}</p>
          <a className="button button--outline-light" href="#contact">
            En savoir plus <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="about__media" data-reveal>
        <img src={siteContent.about.image} alt="Équipe en atelier — image de présentation à remplacer par la photo ADP Toiture SA" loading="lazy" />
        <span className="image-note">Photo de l'équipe à remplacer</span>
      </div>
    </section>
  )
}
