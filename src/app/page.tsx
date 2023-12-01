import Features from './components/features'
import Navbar from './components/navbar'

export default function Home() {
  const routeNavigation = [
    { name: 'Home', path: '', current: true },
    { name: 'Médicos', path: '/medicos', current: false },
    { name: 'Pacientes', path: '/pacientes', current: false },
    { name: 'Consultas', path: '/consultas', current: false },
]
  return (
    <main>
      <Navbar routeNavigation={routeNavigation}></Navbar>
      <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Bem vindo ao portal da nossa clínica!
          </p>
        </div>
      </div>
    </div>
    </main>
  )
}
