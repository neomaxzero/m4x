import { Link, createFileRoute } from '@tanstack/react-router'

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
  return (
    <main className="portfolio">
      <header className="portfolio__header">
        <Link to="/">0000</Link>
        <p>Maximiliano Cespedes.</p>
      </header>

      <section className="portfolio__content" aria-labelledby="portfolio-title">
        <h1 id="portfolio-title">Portfolio</h1>

        <div className="project-list">
          <a
            className="project project--stepcraft"
            href="https://www.stepcraft.app"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Stepcraft"
          >
            <span className="project__identity">
              <img
                src="https://www.stepcraft.app/assets/images/favicon/android-chrome-512x512.png"
                alt=""
              />
              <strong>Stepcraft</strong>
            </span>
            <small>co-founded</small>
          </a>

          <a
            className="project"
            href="https://www.tike.com.ar"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Tike"
          >
            <img src="/tike-logo.svg" alt="Tike" />
            <small>co-founded</small>
          </a>

          <a
            className="project project--wetransfer"
            href="https://wetransfer.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit WeTransfer"
          >
            <img
              className="project__brand-logo project__brand-logo--wetransfer"
              src="https://upload.wikimedia.org/wikipedia/commons/3/36/WeTransfer_logo.svg"
              alt="WeTransfer"
            />
          </a>

          <a
            className="project project--coolblue"
            href="https://www.coolblue.nl"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Coolblue"
          >
            <img
              className="project__brand-logo project__brand-logo--icon"
              src="https://upload.wikimedia.org/wikipedia/commons/1/1e/Coolblue_Logo.svg"
              alt="Coolblue"
            />
          </a>

          <a
            className="project project--creative-fabrica"
            href="https://www.creativefabrica.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Creative Fabrica"
          >
            <img
              className="project__brand-logo project__brand-logo--icon"
              src="https://www.google.com/s2/favicons?domain=creativefabrica.com&amp;sz=256"
              alt="Creative Fabrica"
            />
          </a>
        </div>
      </section>
    </main>
  )
}
