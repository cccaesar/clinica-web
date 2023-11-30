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
    </main>
  )
}
