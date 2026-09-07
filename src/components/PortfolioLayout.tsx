import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

function BrandMark() {
  return <img src="/brand-mark.svg" alt="" width="96" height="96" />
}

export default function PortfolioLayout({ children, className = '' }: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`site-shell ${className}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="masthead">
        <Link className="brand" to="/" aria-label="0000 home"><BrandMark /></Link>
        <span className="masthead__location">Based in the Netherlands</span>
        <nav aria-label="Main navigation">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ 'aria-current': 'page' }}>Home</Link>
          <Link to="/portfolio" activeProps={{ 'aria-current': 'page' }}>Portfolio</Link>
        </nav>
      </header>
      <main id="main">{children}</main>
      <footer className="site-footer">
        <a href="mailto:hello@0000.com.ar">hello@0000.com.ar</a>
        <nav aria-label="Elsewhere">
          <a href="https://www.linkedin.com/in/neomaxzero/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/neomaxzero/" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://blog.0000.com.ar" target="_blank" rel="noreferrer">Blog</a>
        </nav>
      </footer>
    </div>
  )
}
