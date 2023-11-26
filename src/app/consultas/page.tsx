'use client'
import Navbar from "../components/navbar";

export default function Consultas() {
    const routeNavigation = [
        { name: 'Home', path: '/', current: false },
        { name: 'Médicos', path: 'medicos', current: false },
        { name: 'Pacientes', path: 'pacientes', current: false },
        { name: 'Consultas', path: 'consultas', current: true },
    ]
    return (
        <main>
            <Navbar routeNavigation={routeNavigation}></Navbar>
        </main>
    )
}