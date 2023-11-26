'use client'
import Navbar from './components/navbar'

export default function Home() {
  const paths = ['pacientes', 'consultas', 'medicos'];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Bem vindo a nossa clínica.</h1>
      <Navbar paths={paths}></Navbar>
    </main>
  )
}
