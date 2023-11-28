'use client'
import Features from "../components/features";
import Navbar from "../components/navbar";

export default function Pacientes() {
    const routeNavigation = [
        { name: 'Home', path: '/', current: false },
        { name: 'Médicos', path: 'medicos', current: false },
        { name: 'Pacientes', path: 'pacientes', current: true },
        { name: 'Consultas', path: 'consultas', current: false },
    ]
    const featuresTitle = 'Aqui você poderá cadastrar, atualizar ou excluir os pacientes registrados';
    const featuresDescription = 'É necessário cadastrar os pacientes antes de marcar consultas para eles';
    const registerDescription = 'Cadastre um(a) novo(a) paciente'
    return (
        <main>
            <Navbar routeNavigation={routeNavigation}></Navbar>
            <Features title={featuresTitle} description={featuresDescription} subject='pacientes' registerDescription={registerDescription}></Features>
        </main>
    )
}