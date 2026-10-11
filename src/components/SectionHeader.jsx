export default function SectionHeader({ eyebrow, title, link, linkLabel, dark = false }) {
  return (
    <div className={`section-header${dark ? ' section-header--dark' : ''}`} data-reveal>
      <div>
        <p className="eyebrow"><span>{eyebrow}</span></p>
        <h2>{title}</h2>
      </div>
      {link && (
        <a className="text-link" href={link}>
          {linkLabel}
          <span aria-hidden="true">→</span>
        </a>
      )}
    </div>
  )
}
