'use client'
import Navbar from "../components/navbar";
import Features from "../components/features";

export default function Medicos() {
    const routeNavigation = [
        { name: 'Home', path: '/', current: false },
        { name: 'Médicos', path: 'medicos', current: true },
        { name: 'Pacientes', path: 'pacientes', current: false },
        { name: 'Consultas', path: 'consultas', current: false },
    ]
    const featuresTitle = 'Aqui você poderá cadastrar, atualizar ou excluir os médicos registrados';
    const featuresDescription = 'Oferecemos serviços de ortopedia, cardiologia, ginecologia e dermatologia.';
    const registerDescription = 'Cadastre um(a) novo(a) médico(a)'
    return (
        <main>
            <Navbar routeNavigation={routeNavigation}></Navbar>
            <Features title={featuresTitle} description={featuresDescription} subject='medicos' registerDescription={registerDescription}></Features>
        </main>
    )
}