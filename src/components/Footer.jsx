import { Mail, MapPin, Phone } from 'lucide-react'
import Logo from './Logo.jsx'
import { siteContent } from '../data/siteContent.js'

export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container">
        <div className="site-footer__main">
          <a className="site-footer__brand" href="#accueil" aria-label="Retour à l'accueil"><Logo /></a>
          <nav className="footer-nav" aria-label="Navigation du pied de page">
            {siteContent.navigation.map((item) => <a key={item.id} href={item.href}>{item.label}</a>)}
          </nav>
          <div className="footer-contact">
            <a href={siteContent.contact.phoneHref}><Phone size={15} aria-hidden="true" /> {siteContent.contact.phone}</a>
            <a href={`mailto:${siteContent.contact.email}`}><Mail size={15} aria-hidden="true" /> {siteContent.contact.email}</a>
            <a href="https://maps.google.com/?q=Chem.+Frank-Thomas+24B,+1208+Genève" target="_blank" rel="noreferrer"><MapPin size={15} aria-hidden="true" /> {siteContent.contact.address}</a>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© 2024 ADP Toiture SA. Tous droits réservés.</span>
          <div>
            <a href="#legal">Mentions légales</a>
            <a href="#legal">Politique de confidentialité</a>
          </div>
        </div>
        <div className="legal-note" id="legal">
          <strong>Informations légales</strong>
          <span>Les pages juridiques définitives doivent être ajoutées et vérifiées avant mise en ligne.</span>
        </div>
      </div>
    </footer>
  )
}
