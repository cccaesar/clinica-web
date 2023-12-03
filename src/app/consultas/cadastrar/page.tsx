'use client'
import { z } from 'zod';
import axios from "axios";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { format } from 'date-fns';
import Navbar from "../../components/navbar";
import Form from "../../components/form";

export interface GenericInputInterface {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    id: string;
    autoComplete?: string;
    url?: string;
    options?: string[];
}

export async function register(formData: FormData) {
    const schema = z.object({
        pacienteId: z.string(),
        medicoId: z.string().optional(),
        dataHora: z.string(),
    });

    const parse = schema.safeParse({
        pacienteId: formData.get('pacienteId'),
        medicoId: formData.get('medicoId'),
        dataHora: formData.get('appointment-time'),
    });

    if (!parse.success) {
        return { message: 'Formulário invalido', error: parse.error.message }
    }

    const data = {
        pacienteId: parse.data.pacienteId,
        dataHora: format(new Date(parse.data.dataHora), "yyyy-MM-dd HH:mm:ss"),
        medicoId: parse.data.medicoId || null
    }

    try {
        const res = await axios.post(`http://localhost:3000/api/consulta`, data)
        return { message: `Consulta agendada`, data: res.data }
    } catch (e: any) {
        const errorMessage: string = e?.message || ''
        return { message: 'Não foi possivel agendar essa consulta', error: errorMessage }
    }
}

export default function CadastrarConsulta() {
    const routeNavigation = [
        { name: 'Home', path: '/', current: false },
        { name: 'Médicos', path: '/medicos', current: false },
        { name: 'Pacientes', path: '/pacientes', current: false },
        { name: 'Consultas', path: '/consultas', current: true },
    ];
    const inputs: GenericInputInterface[] = [
        {
            label: 'Paciente',
            type: 'infiniteScroll',
            id: 'pacienteId',
            name: 'pacienteId',
            url: 'http://localhost:3000/api/paciente/',
            options: []
        },
        {
            label: 'Médico',
            type: 'infiniteScroll',
            id: 'medicoId',
            name: 'medicoId',
            url: 'http://localhost:3000/api/medico/',
            options: []
        },
        {
            label: 'Data e Hora',
            type: 'datetime-local',
            id: 'appointment-time',
            name: 'appointment-time',
        }
    ]

    const router = useRouter();
    const [error, setError] = useState('');
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const handleRegister = async (formData: any) => {
        const result = await register(formData);
        if (result?.data) {
            router.push('/consultas');
        } else {
            setError(result?.error || '');
            onOpen();
        }
    };
    return (
        <main>
            <Navbar routeNavigation={routeNavigation}></Navbar>
            <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl">
                    <h1 className="text-base font-semibold leading-7 text-white-900">Preencha corretamente os dados da consulta</h1>
                    <Form inputs={inputs} action={handleRegister}></Form>
                </div>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Erro ao cadastrar os dados do médico</ModalHeader>
                            <ModalBody>
                                <p>
                                    {error}
                                </p>
                                <p>
                                    Verifique se preencheu corretamente o formulário, caso contrário tente mais tarde
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" variant="light" onPress={onClose}>
                                    Entendi
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </main>
    )
}