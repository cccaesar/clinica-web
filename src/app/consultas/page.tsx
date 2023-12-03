'use client'
import Navbar from "../components/navbar";
import Features from "../components/features";
import Pagination from "../components/pagination";

export default function Consultas() {
    const routeNavigation = [
        { name: 'Home', path: '/', current: false },
        { name: 'Médicos', path: 'medicos', current: false },
        { name: 'Pacientes', path: 'pacientes', current: false },
        { name: 'Consultas', path: 'consultas', current: true },
    ]
    const featuresTitle = 'Aqui você poderá cadastrar, atualizar, cancelar ou apenas ver dados das consultas';
    const featuresDescription = 'É necessário cadastrar os pacientes e médicos antes de marcar consultas';
    const registerDescription = 'Cadastre uma nova consulta'
    return (
        <main>
            <Navbar routeNavigation={routeNavigation}></Navbar>
            <Features title={featuresTitle} description={featuresDescription} subject='consultas' registerDescription={registerDescription}>
                <Pagination entityName='consulta'/>
            </Features>
        </main>
    )
}