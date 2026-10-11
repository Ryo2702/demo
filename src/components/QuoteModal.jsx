import { forwardRef, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, CheckCircle2, X } from 'lucide-react'
import { siteContent } from '../data/siteContent.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

const initialValues = { fullName: '', email: '', phone: '', workType: '', location: '', description: '', website: '' }

export default function QuoteModal({ open, onClose, prefilledWorkType = '' }) {
  const closeRef = useRef(null)
  const firstFieldRef = useRef(null)
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!open) return undefined
    setValues((current) => ({ ...current, workType: prefilledWorkType || current.workType }))
    setStatus('idle')
    setErrors({})
    window.setTimeout(() => firstFieldRef.current?.focus(), 50)
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose, prefilledWorkType])

  const update = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }))

  const validate = () => {
    const nextErrors = {}
    if (!values.fullName.trim()) nextErrors.fullName = 'Indiquez votre nom complet.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = 'Indiquez une adresse e-mail valide.'
    if (!values.phone.trim()) nextErrors.phone = 'Indiquez un numéro de téléphone.'
    if (!values.workType) nextErrors.workType = 'Choisissez un type de travaux.'
    if (!values.location.trim()) nextErrors.location = 'Indiquez la localisation du projet.'
    if (!values.description.trim()) nextErrors.description = 'Décrivez brièvement votre projet.'
    return nextErrors
  }

  const submit = (event) => {
    event.preventDefault()
    if (values.website) return
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    const subject = encodeURIComponent(`Demande de devis — ${values.workType}`)
    const body = encodeURIComponent([
      `Nom : ${values.fullName}`,
      `E-mail : ${values.email}`,
      `Téléphone : ${values.phone}`,
      `Type de travaux : ${values.workType}`,
      `Localisation : ${values.location}`,
      '',
      values.description,
    ].join('\n'))
    setStatus('mailto')
    window.location.href = `mailto:${siteContent.contact.email}?subject=${subject}&body=${body}`
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal-backdrop" role="presentation" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduced ? undefined : { opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
          <motion.div className="quote-modal" role="dialog" aria-modal="true" aria-labelledby="quote-title" initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: 16 }}>
            <button className="modal-close" ref={closeRef} type="button" onClick={onClose} aria-label="Fermer la demande de devis">
              <X size={21} aria-hidden="true" />
            </button>
            <div className="quote-modal__header">
              <p className="eyebrow"><span>VOTRE PROJET</span></p>
              <h2 id="quote-title">Demander un devis.</h2>
              <p>Quelques informations suffisent pour que nous puissions revenir vers vous.</p>
            </div>

            {status === 'mailto' ? (
              <div className="form-success" role="status">
                <CheckCircle2 size={30} aria-hidden="true" />
                <h3>Votre messagerie va s’ouvrir.</h3>
                <p>Vérifiez les informations, puis envoyez l’e-mail à ADP Toiture SA. Aucune demande n’est envoyée automatiquement depuis ce site.</p>
                <button className="button button--primary" type="button" onClick={onClose}>Fermer</button>
              </div>
            ) : (
              <form className="quote-form" onSubmit={submit} noValidate>
                <div className="form-grid">
                  <FormField label="Nom complet" name="fullName" value={values.fullName} onChange={update} error={errors.fullName} ref={firstFieldRef} required />
                  <FormField label="Adresse e-mail" name="email" type="email" value={values.email} onChange={update} error={errors.email} required />
                  <FormField label="Téléphone" name="phone" type="tel" value={values.phone} onChange={update} error={errors.phone} required />
                  <label className={`form-field${errors.workType ? ' has-error' : ''}`}>
                    <span>Type de travaux <em>*</em></span>
                    <select name="workType" value={values.workType} onChange={update} aria-invalid={Boolean(errors.workType)}>
                      <option value="">Sélectionnez une prestation</option>
                      {siteContent.services.map((service) => <option key={service.title} value={service.title}>{service.title}</option>)}
                    </select>
                    {errors.workType && <small>{errors.workType}</small>}
                  </label>
                  <FormField label="Localisation du projet" name="location" value={values.location} onChange={update} error={errors.location} required />
                  <label className={`form-field form-field--full${errors.description ? ' has-error' : ''}`}>
                    <span>Description du projet <em>*</em></span>
                    <textarea name="description" rows="4" value={values.description} onChange={update} aria-invalid={Boolean(errors.description)} />
                    {errors.description && <small>{errors.description}</small>}
                  </label>
                  <label className="form-field form-field--honeypot" aria-hidden="true">
                    <span>Site web</span>
                    <input name="website" value={values.website} onChange={update} tabIndex="-1" autoComplete="off" />
                  </label>
                </div>
                <p className="form-help">Les photos de votre projet peuvent être jointes directement dans votre e-mail après ouverture de votre messagerie.</p>
                <button className="button button--primary" type="submit">
                  Envoyer ma demande <ArrowRight size={16} aria-hidden="true" />
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const FormField = forwardRef(function FormField({ label, name, value, onChange, error, type = 'text', required = false, ...props }, ref) {
  return (
    <label className={`form-field${error ? ' has-error' : ''}`}>
      <span>{label} {required && <em>*</em>}</span>
      <input ref={ref} name={name} type={type} value={value} onChange={onChange} aria-invalid={Boolean(error)} {...props} />
      {error && <small>{error}</small>}
    </label>
  )
})
