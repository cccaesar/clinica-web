'use client'

import { z } from 'zod';
import { useSearchParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

import Navbar from "../../components/navbar";
import Form from "../../components/form";
import { estados } from "@/consts/estados";

export interface GenericInputInterface {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    id: string;
    autoComplete?: string;
    value?: string;
    options?: string[];
    onChange?: any;
}

export async function update(formData: FormData) {
    const searchParams = new URLSearchParams(document.location.search);
    const crm = searchParams.get('id')
    const schema = z.object({
        nome: z.string().optional(),
        telefone: z.string().optional(),
        endereco: z.object({
            cep: z.string().optional(),
            logradouro: z.string().optional(),
            bairro: z.string().optional(),
            cidade: z.string().optional(),
            uf: z.string().optional(),
            complemento: z.string().optional(),
            numero: z.string().optional(),
        }).optional(),
    })

    const isEnderecoValid = schema.safeParse({ endereco: formData.get('endereco') }).success;

    const parse = isEnderecoValid ? schema.safeParse({
        nome: formData.get('nome'),
        telefone: formData.get('phone'),
        endereco: formData.get('endereco'),
    }) : schema.safeParse({
        nome: formData.get('nome'),
        telefone: formData.get('phone'),
    });

    if (!parse.success) {
        return { message: 'Failed to update medico' }
    }

    const data = parse.data

    try {
        const res = await axios.patch(`http://localhost:3000/api/medico/${crm}`, data);
        return { message: `Dados do médico atualizados com sucesso`, data: res.data }
    } catch (e: any) {
        const errorMessage: string = e?.message || ''
        return { message: 'Não foi possivel atualizar esse médico', error: errorMessage }
    }
}

export default function EditarMedico() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const routeNavigation = [
        { name: 'Home', path: '/', current: false },
        { name: 'Médicos', path: '/medicos', current: true },
        { name: 'Pacientes', path: '/pacientes', current: false },
        { name: 'Consultas', path: '/consultas', current: false },
    ];
    const [nome, setNome] = useState('');
    const [error, setError] = useState('');
    const inputs: GenericInputInterface[] = [
        {
            label: 'Nome',
            type: 'text',
            id: 'nome',
            name: 'nome',
            autoComplete: 'nome',
        },
        {
            label: 'Telefone',
            type: 'tel',
            id: 'phone',
            name: 'phone',
            autoComplete: 'phone',
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
            options: estados,
        },
        {
            label: 'CEP',
            type: 'text',
            id: 'cep',
            name: 'cep',
            autoComplete: 'cep',
        },
    ]
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const fetchData = useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/medico/${id}`);
            setNome(res.data['nome']);
        } catch (e) {
            console.error('Error fetching data:', e);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleUpdate = async (formData: any) => {
        const result = await update(formData);
        if (result?.data) {
            router.push('/medicos');
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
                    <h1 className="text-base font-semibold leading-7 text-white-900">Preencha corretamente os dados do(a) medico(a) {nome}</h1>
                    <Form inputs={inputs} action={handleUpdate}></Form>
                </div>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Erro ao atualizar os dados do médico</ModalHeader>
                            <ModalBody>
                                <p>
                                    {error}
                                </p>
                                <p>
                                    Verifique se preencheu corretamente o formulário, caso contrário tente mais tarde
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
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