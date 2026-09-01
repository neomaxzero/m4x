import { useEffect, useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'

const projects = [
  {
    name: 'Stepcraft',
    href: 'https://www.stepcraft.app',
    className: 'project--stepcraft',
    detail:
      'Co-founder · Frontend & Product. 5k+ active players · 3k+ Discord community.',
    logo: (
      <span className="project__identity">
        <img
          src="https://www.stepcraft.app/assets/images/favicon/android-chrome-512x512.png"
          alt=""
        />
        <strong>Stepcraft</strong>
      </span>
    ),
    note: 'co-founded',
  },
  {
    name: 'Tike',
    href: 'https://www.tike.com.ar',
    detail:
      'Co-founder · Frontend & Product. 4+ years · 300k+ tickets sold.',
    logo: <img src="/tike-logo.svg" alt="Tike" />,
    note: 'co-founded',
  },
  {
    name: 'WeTransfer',
    href: 'https://wetransfer.com',
    className: 'project--wetransfer',
    detail:
      'Senior Frontend Engineer II · Transfer Team. Platform evolution and reliable uploads.',
    logo: (
      <img
        className="project__brand-logo project__brand-logo--wetransfer"
        src="https://upload.wikimedia.org/wikipedia/commons/3/36/WeTransfer_logo.svg"
        alt="WeTransfer"
      />
    ),
  },
  {
    name: 'Coolblue',
    href: 'https://www.coolblue.nl',
    className: 'project--coolblue',
    detail:
      'Senior Frontend Engineer · Search & Product. E-commerce, experimentation and performance.',
    logo: (
      <img
        className="project__brand-logo project__brand-logo--icon"
        src="https://upload.wikimedia.org/wikipedia/commons/1/1e/Coolblue_Logo.svg"
        alt="Coolblue"
      />
    ),
  },
  {
    name: 'Creative Fabrica',
    href: 'https://www.creativefabrica.com',
    className: 'project--creative-fabrica',
    detail:
      'Senior Frontend Engineer · Growth Team. Next.js migration and frontend-platform optimization.',
    logo: (
      <img
        className="project__brand-logo project__brand-logo--icon"
        src="https://www.google.com/s2/favicons?domain=creativefabrica.com&sz=256"
        alt="Creative Fabrica"
      />
    ),
  },
] as const

export const Route = createFileRoute('/portfolio')({
  head: () => ({
    meta: [
      { title: 'Portfolio | 0000' },
      {
        name: 'description',
        content: 'Selected work by Maximiliano Cespedes.',
      },
    ],
  }),
  component: Portfolio,
})

function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [pointerIndex, setPointerIndex] = useState<number | null>(null)
  const [focusIndex, setFocusIndex] = useState<number | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const isInteracting = pointerIndex !== null || focusIndex !== null

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    updateMotionPreference()
    mediaQuery.addEventListener('change', updateMotionPreference)

    return () => mediaQuery.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    if (isInteracting || prefersReducedMotion) return

    const rotation = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % projects.length)
    }, 6000)

    return () => window.clearInterval(rotation)
  }, [isInteracting, prefersReducedMotion])

  const activeProject = projects[activeIndex]

  return (
    <main className="portfolio">
      <header className="portfolio__header">
        <Link to="/">0000</Link>
        <p>Maximiliano Cespedes.</p>
      </header>

      <section className="portfolio__content" aria-labelledby="portfolio-title">
        <div className="project-detail" aria-live="off">
          <div className="project-detail__content" key={activeProject.name}>
            <strong>{activeProject.name}</strong>
            <p id="active-project-detail">{activeProject.detail}</p>
          </div>
        </div>

        <div className="portfolio__logos">
          <h1 id="portfolio-title">Portfolio</h1>

          <div className="project-list">
            {projects.map((project, index) => (
              <a
                className={`project ${project.className ?? ''} ${
                  index === activeIndex ? 'project--active' : ''
                }`}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${project.name}`}
                aria-describedby={
                  index === activeIndex ? 'active-project-detail' : undefined
                }
                onMouseEnter={() => {
                  setPointerIndex(index)
                  setActiveIndex(index)
                }}
                onMouseLeave={() => setPointerIndex(null)}
                onFocus={() => {
                  setFocusIndex(index)
                  setActiveIndex(index)
                }}
                onBlur={() => setFocusIndex(null)}
                key={project.name}
              >
                {project.logo}
                {project.note ? <small>{project.note}</small> : null}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
