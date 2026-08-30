import { Link } from '@tanstack/react-router'

interface HeaderProps {
  showHome: boolean
}

export default function Header({ showHome }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header__brand">0000.com.ar</div>
      <nav className="site-header__nav" aria-label="Primary">
        {showHome && <Link to="/">Home</Link>}
        <a href="https://blog.0000.com.ar">Blog</a>
      </nav>
    </header>
  )
}
