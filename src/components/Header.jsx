import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Menu, Phone, X } from 'lucide-react'
import Logo from './Logo.jsx'
import { siteContent } from '../data/siteContent.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

export default function Header({ activeId, onQuote }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const closeMenu = () => setOpen(false)
  const handleQuote = () => {
    closeMenu()
    onQuote()
  }

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <div className="container site-header__inner">
        <a className="site-header__logo" href="#accueil" onClick={closeMenu} aria-label="Retour à l'accueil">
          <Logo />
        </a>

        <nav className="desktop-nav" aria-label="Navigation principale">
          {siteContent.navigation.map((item) => (
            <a key={item.id} className={activeId === item.id ? 'is-active' : ''} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <a className="phone-link" href={siteContent.contact.phoneHref}>
            <Phone size={15} strokeWidth={2.5} aria-hidden="true" />
            <span>{siteContent.contact.phone}</span>
          </a>
          <button className="button button--primary button--compact" type="button" onClick={onQuote}>
            Demander un devis <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            className="mobile-menu"
            initial={reduced ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
          >
            <nav aria-label="Navigation mobile">
              {siteContent.navigation.map((item) => (
                <a key={item.id} className={activeId === item.id ? 'is-active' : ''} href={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mobile-menu__actions">
              <a className="phone-link" href={siteContent.contact.phoneHref} onClick={closeMenu}>
                <Phone size={16} aria-hidden="true" /> {siteContent.contact.phone}
              </a>
              <button className="button button--primary" type="button" onClick={handleQuote}>
                Demander un devis <ArrowRight size={17} aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
