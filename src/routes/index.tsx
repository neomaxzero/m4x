import { Link, createFileRoute } from '@tanstack/react-router'
import PortfolioLayout from '../components/PortfolioLayout'

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Maximiliano Céspedes · 0000' },
    { name: 'description', content: 'Maximiliano Céspedes. Product engineer and independent builder, based in the Netherlands.' },
  ] }),
  component: Home,
})

function Home() {
  return (
    <PortfolioLayout className="landing">
      <div className="page-intro">
        <h1>Maximiliano<br />Céspedes.</h1>
        <p>Product engineer & independent builder.</p>
        <Link className="text-link" to="/portfolio">View portfolio <span aria-hidden="true">→</span></Link>
      </div>
    </PortfolioLayout>
  )
}
