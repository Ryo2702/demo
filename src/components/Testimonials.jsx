import { ArrowRight, Quote, Star } from 'lucide-react'
import SectionHeader from './SectionHeader.jsx'
import { siteContent } from '../data/siteContent.js'

export default function Testimonials() {
  return (
    <section className="section section--testimonials" id="avis" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHeader eyebrow="ILS NOUS FONT CONFIANCE" title="Des clients satisfaits." link="#avis" linkLabel="Voir tous les avis" dark />
        <h2 className="sr-only" id="testimonials-title">Avis clients</h2>
        <div className="testimonial-grid">
          {siteContent.testimonials.map((testimonial, index) => (
            <article className="testimonial-card" key={testimonial.name} data-reveal data-reveal-delay={index * 0.06}>
              <div className="testimonial-card__stars" aria-label="5 étoiles sur 5">
                {Array.from({ length: 5 }).map((_, starIndex) => <Star key={starIndex} size={14} fill="currentColor" aria-hidden="true" />)}
              </div>
              <p>« {testimonial.quote} »</p>
              <strong>{testimonial.name}</strong>
              <span>{testimonial.category}</span>
              <Quote className="testimonial-card__quote" size={43} fill="currentColor" aria-hidden="true" />
            </article>
          ))}
        </div>
        <p className="content-note content-note--dark">Avis présentés à titre d’exemple — à vérifier et valider avant publication.</p>
      </div>
    </section>
  )
}
