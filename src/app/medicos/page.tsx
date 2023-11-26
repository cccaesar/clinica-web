'use client'
import Navbar from "../components/navbar"

export default function Medicos() {
    const routeNavigation = [
        { name: 'Home', path: '/', current: false },
        { name: 'Médicos', path: 'medicos', current: true },
        { name: 'Pacientes', path: 'pacientes', current: false },
        { name: 'Consultas', path: 'consultas', current: false },
    ]
    return (
        <main>
            <Navbar routeNavigation={routeNavigation}></Navbar>
        </main>
    )
}