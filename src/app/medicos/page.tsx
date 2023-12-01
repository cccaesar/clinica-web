'use client'
import Navbar from "../components/navbar";
import Features from "../components/features";
import Pagination from "../components/pagination";

export default function Medicos() {
    const routeNavigation = [
        { name: 'Home', path: '/', current: false },
        { name: 'Médicos', path: 'medicos', current: true },
        { name: 'Pacientes', path: 'pacientes', current: false },
        { name: 'Consultas', path: 'consultas', current: false },
    ]
    const featuresTitle = 'Aqui você poderá cadastrar, atualizar, excluir ou apenas ver dados dos médicos';
    const featuresDescription = 'Oferecemos serviços de ortopedia, cardiologia, ginecologia e dermatologia.';
    const registerDescription = 'Cadastre um(a) novo(a) médico(a)'
    return (
        <main>
            <Navbar routeNavigation={routeNavigation}></Navbar>
            <Features title={featuresTitle} description={''} subject='medicos' registerDescription={registerDescription}>
                <Pagination entityName='medico' />
            </Features>
        </main>
    )
}