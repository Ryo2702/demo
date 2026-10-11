import { ArrowRight } from 'lucide-react'
import SectionHeader from './SectionHeader.jsx'
import ServiceIcon from './ServiceIcon.jsx'
import { siteContent } from '../data/siteContent.js'

export default function Services({ onSelect }) {
  return (
    <section className="section section--services" id="services" aria-labelledby="services-title">
      <div className="container">
        <SectionHeader eyebrow="NOS SERVICES" title="Notre savoir-faire." link="#services" linkLabel="Voir tous nos services" />
        <h2 className="sr-only" id="services-title">Nos services de toiture</h2>
        <div className="service-grid">
          {siteContent.services.map((service, index) => (
            <button className="service-card" type="button" key={service.title} onClick={() => onSelect(service.title)} data-reveal data-reveal-delay={index * 0.05}>
              <span className="service-card__media">
                <img src={service.image} alt={`${service.title} — illustration`} loading="lazy" />
                <span className="service-card__icon"><ServiceIcon name={service.icon} /></span>
              </span>
              <span className="service-card__body">
                <strong>{service.title}</strong>
                <span>{service.description}</span>
                <span className="service-card__arrow" aria-hidden="true"><ArrowRight size={16} /></span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
