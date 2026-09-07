import { useState } from 'react'

const projects = [
  {
    name: 'Stepcraft', label: 'A reason to take the long way home.',
    description: 'An everyday walk becomes a world to explore. A mobile RPG where your steps power the adventure.',
    contribution: 'Co-founder · Frontend & Product',
    proof: '5k+ active players · 3k+ Discord community',
    href: 'https://www.stepcraft.app',
  },
  {
    name: 'Tike', label: 'Behind every great night.',
    description: 'From the first ticket to the door. A ticketing platform that helps independent organizers bring people together.',
    contribution: 'Co-founder · Frontend & Product',
    proof: '300k+ tickets sold · 4+ years building',
    href: 'https://www.tike.com.ar',
  },
] as const

function StepcraftScene() {
  return (
    <div className="stepcraft-scene">
      <img className="stepcraft-scene__world" src="/work/stepcraft-world.png" alt="" width="2000" height="1280" loading="eager" />
      <img className="stepcraft-scene__app" src="/work/stepcraft-app.png" alt="Stepcraft: explore Heart Grove and forage using your daily steps" width="680" height="1381" loading="eager" />
    </div>
  )
}

export default function SelectedWork() {
  const [selected, setSelected] = useState(0)
  const project = projects[selected]

  return (
    <section className="selected-work" id="work" aria-labelledby="work-title">
      <div className="section-heading"><h2 id="work-title">Independent products</h2></div>
      <div className="work-layout">
        <div className="work-index">
          <div className="project-picker" aria-label="Choose a project">
            {projects.map((item, index) => (
              <button key={item.name} type="button" aria-pressed={selected === index} aria-controls="project-preview" onClick={() => setSelected(index)}>
                <span className="project-picker__number">0{index + 1}</span>{item.name}<span className="project-picker__arrow" aria-hidden="true">→</span>
              </button>
            ))}
          </div>
          <div className="work-copy" aria-live="polite" aria-atomic="true">
            <div key={project.name} className="work-copy__inner">
              <h3>{project.label}</h3>
              <p>{project.description}</p>
              <p className="work-copy__role">{project.contribution}</p>
              <a className="text-link" href={project.href} target="_blank" rel="noreferrer">Explore {project.name} <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
        <figure id="project-preview" className="work-preview">
          <div className="work-preview__image" key={project.name}>
            {selected === 0 ? <StepcraftScene /> : <div className="tike-scene"><img src="/work/tike-app.png" alt="Tike ticket checkout with an interactive seating map and section selection" width="2732" height="2048" loading="lazy" /></div>}
          </div>
          <figcaption><span>{project.name}</span><span>{project.proof}</span></figcaption>
        </figure>
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section className="experience" aria-labelledby="experience-title">
      <h2 id="experience-title">Team experience</h2>
      <div>
        <a href="https://wetransfer.com" target="_blank" rel="noreferrer"><strong>WeTransfer</strong><span>Senior Frontend Engineer II · Transfer</span><span aria-hidden="true">↗</span></a>
        <a href="https://www.coolblue.nl" target="_blank" rel="noreferrer"><strong>Coolblue</strong><span>Senior Frontend Engineer · Search & Product</span><span aria-hidden="true">↗</span></a>
        <a href="https://www.creativefabrica.com" target="_blank" rel="noreferrer"><strong>Creative Fabrica</strong><span>Senior Frontend Engineer · Growth</span><span aria-hidden="true">↗</span></a>
      </div>
    </section>
  )
}
