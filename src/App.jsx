import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Testimonials from './components/Testimonials.jsx'
import Partners from './components/Partners.jsx'
import ProjectModal from './components/ProjectModal.jsx'
import QuoteModal from './components/QuoteModal.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [activeId, setActiveId] = useState('accueil')
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [quoteWorkType, setQuoteWorkType] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const sections = ['accueil', 'services', 'realisations', 'a-propos', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveId(visible.target.id)
    }, { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.5, 0.8] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined
    const elements = gsap.utils.toArray('[data-reveal]')
    const animations = elements.map((element) => gsap.fromTo(element, { autoAlpha: 0, y: 18 }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.65,
      ease: 'power2.out',
      delay: Number(element.dataset.revealDelay || 0),
      scrollTrigger: { trigger: element, start: 'top 88%', once: true },
    }))
    return () => animations.forEach((animation) => animation.kill())
  }, [])

  useEffect(() => {
    const update = () => setShowScrollTop(window.scrollY > 520)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('modal-open', Boolean(quoteOpen || selectedProject))
    return () => document.body.classList.remove('modal-open')
  }, [quoteOpen, selectedProject])

  const openQuote = (workType = '') => {
    setSelectedProject(null)
    setQuoteWorkType(workType)
    setQuoteOpen(true)
  }

  const closeQuote = () => setQuoteOpen(false)

  return (
    <>
      <Header activeId={activeId} onQuote={() => openQuote()} />
      <main>
        <Hero onQuote={() => openQuote()} />
        <Services onSelect={openQuote} />
        <About />
        <Projects onSelect={setSelectedProject} />
        <Testimonials />
        <Partners />
      </main>
      <Footer />
      <ScrollToTop visible={showScrollTop} />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} onQuote={() => openQuote()} />
      <QuoteModal open={quoteOpen} onClose={closeQuote} prefilledWorkType={quoteWorkType} />
    </>
  )
}
