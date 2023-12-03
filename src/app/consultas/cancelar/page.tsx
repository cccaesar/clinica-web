'use client'
import React, { useState, useCallback } from 'react';
import { z } from 'zod';
import { useSearchParams, useRouter } from 'next/navigation';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem } from '@nextui-org/react';
import axios from 'axios';
import Navbar from '@/app/components/navbar';
import { SelectInterface } from '@/app/components/select';
import { useFormStatus } from 'react-dom';
import { MotivoCancelamento } from '@/consts/motivo-cancelamento';

function getOptionValue(option: string): string {
    if(option === MotivoCancelamento.MEDICO_CANCELOU) {
        return 'MEDICO_CANCELOU';
    } else if(option === MotivoCancelamento.PACIENTE_DESISTIU) {
        return 'PACIENTE_DESISTIU';
    } else if(option === MotivoCancelamento.OUTROS) {
        return 'OUTROS';
    } else {
        return '';
    }
}

export async function cancelAppointment(formData: FormData) {
    console.log('cancelAppointment formData', formData)
    const searchParams = new URLSearchParams(document.location.search);
    const id = searchParams.get('id');
    const schema = z.object({
        cancellationReason: z.string(),
    });

    const parse = schema.safeParse({
        cancellationReason: formData.get('cancellationReason'),
    });

    if (!parse.success) {
        return { message: 'Formulário inválido', error: parse.error.message };
    }

    const data = {
        cancellationReason: parse.data.cancellationReason,
        appointmentId: id,
    };

    try {
        const res = await axios.put(`http://localhost:3000/api/consulta/cancelar`, data);
        return { message: `Consulta cancelada`, data: res.data };
    } catch (e: any) {
        const errorMessage: string = e?.message || '';
        return { message: 'Não foi possível cancelar essa consulta', error: errorMessage };
    }
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit" aria-disabled={pending}>
            Salvar
        </button>
    )
}


export default function CancelarConsulta() {
    const router = useRouter();
    const routeNavigation = [
        { name: 'Home', path: '/', current: false },
        { name: 'Médicos', path: '/medicos', current: false },
        { name: 'Pacientes', path: '/pacientes', current: false },
        { name: 'Consultas', path: '/consultas', current: true },
    ];
    const [error, setError] = useState('');
    const [option, setOption] = useState('');
    const inputs: SelectInterface[] = [
        {
            label: 'Motivo de cancelamento',
            type: 'select',
            id: 'cancellationReason',
            name: 'cancellationReason',
            options: ["Paciente desistiu", "Médico cancelou", "Outros"],
        },
    ];
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleCancellation = async (formData: any) => {
        console.log('option', option);
        console.log('getOptionValue(option)', getOptionValue(option));
        formData.set('cancellationReason', getOptionValue(option));
        const result = await cancelAppointment(formData);
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
                    <h1 className="text-base font-semibold leading-7 text-white-900">Deseja realmente cancelar essa consulta?</h1>
                    <form action={handleCancellation} onChange={(event) => console.log('form event', event)}>
                        <div className="space-y-12">
                            <div className="border-gray-900/10 pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 items-end">
                                    {inputs.map(input => (
                                    <Select
                                        key={input.name}
                                        label={input.label}
                                        className="sm:col-span-3 mt-2"
                                        onChange={(event) => setOption(event.target.value)}
                                    >
                                        {input.options.map((option) => (
                                            <SelectItem key={option} value={getOptionValue(option)} textValue={option}>
                                                { option }
                                            </SelectItem>
                                        ))}
                                    </Select>))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <SubmitButton />
                        </div>
                    </form>
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