import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: '0000.com.ar' },
      {
        name: 'description',
        content: 'Maximiliano Céspedes. Product engineer and independent builder.',
      },
    ],
  }),
  component: Home,
})

function Home() {
  return (
    <main className="home">
      <header className="home__header">
        <h1>0000</h1>
        <p>Maximiliano Cespedes.</p>
      </header>

      <section className="home__statement" aria-labelledby="statement-title">
        <h2 id="statement-title">I design and build digital products.</h2>
        <p>
          Product-minded engineering for ambitious ideas, from early direction to polished interfaces.
        </p>
        <Link className="home__portfolio-link" to="/portfolio">View portfolio →</Link>
      </section>

      <footer className="home__footer">
        <div className="home__details">
          <section aria-labelledby="work-title">
            <h2 id="work-title">Selected focus</h2>
            <p>Product engineering<br />Frontend systems<br />AI product advisory</p>
          </section>

          <section aria-labelledby="availability-title">
            <h2 id="availability-title">Availability</h2>
            <p>Open for selected projects<br />Remote from the Netherlands</p>
          </section>
        </div>

        <div className="home__footer-links">
          <a className="home__contact" href="mailto:hello@0000.com.ar">hello@0000.com.ar</a>
          <nav className="home__links" aria-label="Links">
            <Link to="/portfolio">Portfolio</Link>
            <a href="https://www.linkedin.com/in/neomaxzero/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/neomaxzero/" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://blog.0000.com.ar" target="_blank" rel="noreferrer">Blog</a>
          </nav>
        </div>
      </footer>
    </main>
  )
}
