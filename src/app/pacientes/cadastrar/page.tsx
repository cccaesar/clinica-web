'use client'
import Navbar from "../../components/navbar";
import Form from "../../components/form";
import { register } from "@/app/pacientes/cadastrar/actions";
import { estados } from "@/consts/estados";

export interface GenericInputInterface {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    id: string;
    autoComplete?: string;
    options?: string[];
    maxlength?: number;
    minLength?: number;
}

export default function CadastrarPaciente() {
    const routeNavigation = [
        { name: 'Home', path: '/', current: false },
        { name: 'Médicos', path: '/medicos', current: false },
        { name: 'Pacientes', path: '/pacientes', current: true },
        { name: 'Consultas', path: '/consultas', current: false },
    ];
    const inputs: GenericInputInterface[] = [
        {
            label: 'Nome',
            type: 'text',
            id: 'nome',
            name: 'nome',
            autoComplete: 'nome',
        },
        {
            label: 'E-mail',
            type: 'email',
            id: 'email',
            name: 'email',
            autoComplete: 'email',
        },
        {
            label: 'Telefone',
            type: 'tel',
            id: 'phone',
            name: 'phone',
            autoComplete: 'phone',
        },
        {
            label: 'CPF',
            type: 'text',
            id: 'cpf',
            name: 'cpf',
            autoComplete: 'cpf',
            maxlength: 11,
            minLength: 11
        },
        {
            label: 'Logradouro',
            type: 'text',
            id: 'logradouro',
            name: 'logradouro',
            autoComplete: 'logradouro',
        },
        {
            label: 'Número',
            type: 'text',
            id: 'numero',
            name: 'numero',
            autoComplete: 'numero',
        },
        {
            label: 'Complemento',
            type: 'text',
            id: 'complemento',
            name: 'complemento',
            autoComplete: 'complemento',
        },
        {
            label: 'Bairro',
            type: 'text',
            id: 'bairro',
            name: 'bairro',
            autoComplete: 'bairro',
        },
        {
            label: 'Cidade',
            type: 'text',
            id: 'cidade',
            name: 'cidade',
            autoComplete: 'cidade',
        },
        {
            label: 'UF',
            type: 'select',
            id: 'uf',
            name: 'uf',
            autoComplete: 'uf',
            options: estados
        },
        {
            label: 'CEP',
            type: 'text',
            id: 'cep',
            name: 'cep',
            autoComplete: 'cep',
        },
    ]

    return (
        <main>
            <Navbar routeNavigation={routeNavigation}></Navbar>
            <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl">
                    <h1 className="text-base font-semibold leading-7 text-white-900">Preencha corretamente os dados do(a) paciente</h1>
                    <Form inputs={inputs} action={register}></Form>
                </div>
            </div>
        </main>
    )
}