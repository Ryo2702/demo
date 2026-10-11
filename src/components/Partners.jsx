import SectionHeader from './SectionHeader.jsx'
import { siteContent } from '../data/siteContent.js'

export default function Partners() {
  return (
    <section className="section section--partners" aria-labelledby="partners-title">
      <div className="container">
        <SectionHeader eyebrow="ILS NOUS FONT CONFIANCE" title="Des collaborations de confiance." />
        <h2 className="sr-only" id="partners-title">Partenaires</h2>
        <div className="partner-grid" aria-label="Références partenaires à confirmer">
          {siteContent.partners.map((partner, index) => (
            <div className={`partner-wordmark partner-wordmark--${index + 1}`} key={partner}>
              <span aria-hidden="true">{index === 0 ? '✺' : index === 1 ? '◉' : index === 2 ? '▰' : index === 3 ? '◇' : '⌁'}</span>
              <strong>{partner}</strong>
            </div>
          ))}
        </div>
        <p className="content-note">Noms repris de la référence fournie — relations et droits d’usage à confirmer avant publication.</p>
      </div>
    </section>
  )
}
