import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

const trustedCompanies = [
  {
    name: 'WeTransfer',
    note: 'Product experience',
  },
  {
    name: 'Coolblue',
    note: 'Commerce platform',
  },
  {
    name: 'Creative Fabrica',
    note: 'Creator tools',
  },
  {
    name: 'Stepcraft',
    note: 'Founded product',
  },
  {
    name: 'm4x',
    note: 'Indie lab',
  },
]

const services = [
  {
    icon: 'systems',
    title: 'Product engineering for ambitious teams',
    body: 'From idea to shipped product.',
  },
  {
    icon: 'signal',
    title: 'Performance and observability',
    body: 'Faster, clearer, easier to trust.',
  },
  {
    icon: 'cube',
    title: 'Frontend architecture and modernization',
    body: 'Cleaner systems for faster teams.',
  },
  {
    icon: 'ai',
    title: 'AI / product advisory',
    body: 'Useful AI, with judgment.',
  },
  {
    icon: 'diamond',
    title: 'Design systems and UI foundations',
    body: 'Shared foundations that raise quality.',
  },
]

const writing = [
  {
    number: '01',
    date: 'APR 13, 2026',
    title: 'UI Patterns for Agent-Driven Products',
    body: 'Less clutter, more clarity.',
    href: 'https://blog.m4x.io/2026/2026-ui-patterns-for-agent-driven-products/',
  },
  {
    number: '02',
    date: 'APR 02, 2026',
    title: 'Vibe Coding Is Here to Stay, But It Needs Guardrails',
    body: 'AI work needs smaller boundaries.',
    href: 'https://blog.m4x.io/2026/2026-vibeding-is-here-to-stay/',
  },
  {
    number: '03',
    date: 'MAR 30, 2026',
    title: 'Staying Sane When AI Agents Keep Changing Your Workflow',
    body: 'How to keep the tool useful.',
    href: 'https://blog.m4x.io/2026/2026-staying-sane-when-ai-keep-changing-your-workflow/',
  },
  {
    number: '04',
    date: 'MAR 26, 2026',
    title: 'Frontend Interviews Should Measure Judgment, Not Memory',
    body: 'Senior work is not typing speed.',
    href: 'https://blog.m4x.io/2026/2026-fe-interviews-what-to-measure-in-the-ai-era/',
  },
]

const capabilities = [
  'NEXT.JS / REACT',
  'PRODUCT ENGINEERING',
  'FRONTEND ARCHITECTURE',
  'DESIGN SYSTEMS',
  'PERFORMANCE',
  'OBSERVABILITY',
  'EXPERIMENTATION',
  'AI & PRODUCT ADVISORY',
]

const palettes = [
  { id: 'sage', label: 'Sage' },
  { id: 'moss', label: 'Moss' },
  { id: 'eucalyptus', label: 'Eucalyptus' },
  { id: 'olive', label: 'Olive' },
] as const

type PaletteId = (typeof palettes)[number]['id']

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'm4x | Product systems for the AI era' },
      {
        name: 'description',
        content: 'Maximiliano Cespedes is a senior product engineer helping teams build smarter product systems for the AI era.',
      },
    ],
  }),
  component: Home,
})

function Home() {
  const [palette, setPalette] = useState<PaletteId>('eucalyptus')

  return (
    <div className="site-shell" data-theme={palette}>
      <header className="site-header" aria-label="Primary navigation">
        <a className="brand-mark" href="#top" aria-label="m4x home">
          <img src="/m4x-logo.svg" alt="m4x" />
        </a>
        <nav className="site-nav">
          <a href="#work">Work</a>
          <a href="#thinking">Thinking</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="https://blog.m4x.io" target="_blank" rel="noreferrer">Blog</a>
        </nav>
        <div className="header-meta">
          <p className="availability"><span aria-hidden="true" /> Remote, NL<br />Available for new projects</p>
        </div>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="micro-label">Maximiliano Céspedes</p>
            <p className="micro-stack">Senior product engineer<br />12+ years of experience</p>
            <h1 id="hero-title">Building smarter product systems for the <em>AI</em> era.</h1>
            <p className="hero-intro">I help teams turn ambiguous product problems into polished, reliable interfaces.</p>
            <div className="hero-actions">
              <a className="button-primary" href="#contact">Let's work together <span aria-hidden="true">→</span></a>
              <a className="text-link" href="#work">View selected work <span aria-hidden="true">→</span></a>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <AbstractArt variant="hero" />
            <div className="hero-tags">Systems thinker<br />Product engineer<br />Founder mindset<br />Builder</div>
          </div>
        </section>

        <section id="work" className="grid-section work-grid" aria-labelledby="work-title">
          <SectionIntro eyebrow="Selected work" title="Trust" body="Teams and products I have helped shape." link="Start a conversation" />
          {trustedCompanies.map((item, index) => (
            <article className="logo-card" key={item.name}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h2>{item.name}</h2>
              <p>{item.note}</p>
            </article>
          ))}
        </section>

        <section className="grid-section services-grid" aria-labelledby="services-title">
          <SectionIntro eyebrow="Ways I can help" title="Collaboration modes" body="Focused product and frontend support." link="Let's work together" />
          <div className="service-list" id="services-title">
            {services.map((service) => (
              <article className="service-item" key={service.title}>
                <Icon name={service.icon} />
                <h2>{service.title}</h2>
                <p>{service.body}</p>
              </article>
            ))}
          </div>
          <blockquote className="quote-panel">Strategy when needed. Code when it matters.</blockquote>
        </section>

        <section id="thinking" className="grid-section writing-grid" aria-labelledby="thinking-title">
          <SectionIntro eyebrow="Writing / Thinking" title="From the blog" body="Recent notes on AI, product judgment and frontend work." link="Read all articles" />
          {writing.map((item) => (
            <article className="writing-card" key={item.number}>
              <div className="card-meta"><span>{item.number}</span><span>{item.date}</span></div>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
              <a className="text-link" href={item.href} target="_blank" rel="noreferrer">Read article <span aria-hidden="true">→</span></a>
            </article>
          ))}
        </section>

        <section id="about" className="grid-section about-grid" aria-labelledby="about-title">
          <SectionIntro eyebrow="About" title="A bit more" body="Engineer, maker and advisor." />
          <div className="about-art" aria-hidden="true"><AbstractArt variant="small" /></div>
          <div className="about-copy" id="about-title">
            <p>I'm Maximiliano Céspedes, senior frontend / product engineer, founder-minded builder, and advisor.</p>
            <p>I care about craft, systems thinking, product judgment and interfaces that feel trustworthy.</p>
          </div>
          <ul className="capability-list" aria-label="Capabilities">
            {capabilities.map((capability) => <li key={capability}>{capability}</li>)}
          </ul>
        </section>

        <section id="contact" className="grid-section contact-grid" aria-labelledby="contact-title">
          <SectionIntro eyebrow="Contact" title="Let's connect" body="Open to meaningful projects." />
          <h2 id="contact-title">Let's build something that <em>matters.</em></h2>
          <p className="contact-body">If you need product-minded frontend help, I would like to hear what you are building.</p>
          <div className="contact-card">
            <a className="send-button" href="mailto:hello@m4x.io" aria-label="Email hello@m4x.io">↗</a>
            <a className="conversation-link" href="mailto:hello@m4x.io">Start a conversation <span aria-hidden="true">→</span></a>
            <a className="email-link" href="mailto:hello@m4x.io">hello@m4x.io</a>
            <p className="location-line">Remote, NL (CET)</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>© 2026 m4x</span>
        <a href="#top">Privacy</a>
        <a href="#top">Terms</a>
        <div className="palette-switcher" aria-label="Theme palette">
          {palettes.map((item) => (
            <button
              key={item.id}
              type="button"
              className={palette === item.id ? 'palette-switcher__button palette-switcher__button--active' : 'palette-switcher__button'}
              aria-pressed={palette === item.id}
              onClick={() => setPalette(item.id)}
            >
              <span className={`palette-switcher__swatch palette-switcher__swatch--${item.id}`} aria-hidden="true" />
              {item.label}
            </button>
          ))}
        </div>
        <span>With care <span className="footer-dot" aria-hidden="true" /></span>
      </footer>
    </div>
  )
}

function SectionIntro({ eyebrow, title, body, link }: { eyebrow: string; title: string; body: string; link?: string }) {
  return (
    <aside className="section-intro">
      <p className="micro-label">{eyebrow}</p>
      <h2>{title}</h2>
      <span className="accent-rule" aria-hidden="true" />
      <p>{body}</p>
      {link ? <a className="text-link" href="#contact">{link} <span aria-hidden="true">→</span></a> : null}
    </aside>
  )
}

function Icon({ name }: { name: string }) {
  return (
    <span className={`service-icon service-icon--${name}`} aria-hidden="true">
      <span />
    </span>
  )
}

function AbstractArt({ variant }: { variant: 'hero' | 'small' }) {
  return (
    <div className={`abstract-art abstract-art--${variant}`}>
      <span className="art-panel art-panel--one" />
      <span className="art-panel art-panel--two" />
      <span className="art-panel art-panel--three" />
      <span className="art-line art-line--one" />
      <span className="art-line art-line--two" />
      <span className="art-arc art-arc--one" />
      <span className="art-arc art-arc--two" />
      <span className="art-dots" />
    </div>
  )
}
