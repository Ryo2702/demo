export default function Logo({ light = false }) {
  return (
    <span className={`brand-logo${light ? ' brand-logo--light' : ''}`} aria-label="ADP Toiture SA">
      <svg className="brand-logo__mark" viewBox="0 0 44 36" aria-hidden="true">
        <path d="M3 17 22 2l19 15" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" />
        <path d="M9 16v15h26V16" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <path d="M7 20 22 9l15 11" fill="none" stroke="var(--red)" strokeWidth="3.5" />
      </svg>
      <span className="brand-logo__wordmark">adp<span>toiture sa</span></span>
    </span>
  )
}
