import { Link } from '@tanstack/react-router'

interface HeaderProps {
  showHome: boolean
}

export default function Header({ showHome }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header__brand">m4x</div>
      <nav className="site-header__nav" aria-label="Primary">
        {showHome && <Link to="/">Home</Link>}
        <a href="https://blog.m4x.io">Blog</a>
      </nav>
    </header>
  )
}
