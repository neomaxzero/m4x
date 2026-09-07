import { createFileRoute } from '@tanstack/react-router'
import PortfolioLayout from '../components/PortfolioLayout'
import SelectedWork, { Experience } from '../components/SelectedWork'

export const Route = createFileRoute('/portfolio')({
  head: () => ({ meta: [
    { title: 'Selected work · Maximiliano Céspedes' },
    { name: 'description', content: 'Independent products and team experience. Selected work by Maximiliano Céspedes.' },
  ] }),
  component: Portfolio,
})

function Portfolio() {
  return (
    <PortfolioLayout>
      <div className="page-intro">
        <h1>Selected work.</h1>
        <p>Products I co-founded. Teams I’ve helped build.</p>
      </div>
      <SelectedWork />
      <Experience />
    </PortfolioLayout>
  )
}
