import { ArrowUpRight, MapPin } from 'lucide-react'
import SectionHeader from './SectionHeader.jsx'
import { siteContent } from '../data/siteContent.js'

export default function Projects({ onSelect }) {
  return (
    <section className="section section--projects" id="realisations" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader eyebrow="NOS RÉALISATIONS" title="Des projets variés à Genève." link="#realisations" linkLabel="Voir toutes nos réalisations" />
        <h2 className="sr-only" id="projects-title">Réalisations de toiture à Genève</h2>
        <div className="project-grid">
          {siteContent.projects.map((project, index) => (
            <article className="project-card" key={project.title} data-reveal data-reveal-delay={index * 0.05}>
              <button type="button" onClick={() => onSelect(project)} aria-label={`Voir le projet ${project.title}`}>
                <span className="project-card__media">
                  <img src={project.image} alt={`${project.title}, ${project.location}`} loading="lazy" />
                  <span className="project-card__open" aria-hidden="true"><ArrowUpRight size={17} /></span>
                </span>
                <span className="project-card__body">
                  <strong>{project.title}</strong>
                  <span><MapPin size={14} fill="currentColor" aria-hidden="true" /> {project.location}</span>
                </span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
