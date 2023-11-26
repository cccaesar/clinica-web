'use client'
import Navbar from "../components/navbar";

export default function Pacientes() {
    const routeNavigation = [
        { name: 'Home', path: '/', current: false },
        { name: 'Médicos', path: 'medicos', current: false },
        { name: 'Pacientes', path: 'pacientes', current: true },
        { name: 'Consultas', path: 'consultas', current: false },
    ]
    return (
        <main>
            <Navbar routeNavigation={routeNavigation}></Navbar>
        </main>
    )
}