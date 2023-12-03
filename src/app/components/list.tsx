'use client'
import { PencilSquareIcon, TrashIcon, UserIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Avatar
} from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { format } from "date-fns";
import { MotivoCancelamento } from "@/consts/motivo-cancelamento";

export interface MedicInterface {
    nome: string;
    email: string;
    crm: string;
    especialidade: string;
}

export interface PatientInterface {
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
}

export interface AppointmentInterface {
    id: string;
    pacienteNome: string;
    pacienteCpf: string;
    medicoNome: string;
    medicoCrm: string;
    medicoEspecialidade: string;
    dataHora: string;
    motivoCancelamento: string | null;
}

function isMedic(input: MedicInterface | PatientInterface | AppointmentInterface): input is MedicInterface {
    return (input as MedicInterface).crm !== undefined;
}

function isPerson(input: MedicInterface | PatientInterface | AppointmentInterface): input is MedicInterface | PatientInterface {
    return (input as MedicInterface).email !== undefined;
}

function isPatient(input: MedicInterface | PatientInterface | AppointmentInterface): input is PatientInterface {
    return (input as PatientInterface).cpf !== undefined;
}

function isAppointment(input: MedicInterface | PatientInterface | AppointmentInterface): input is AppointmentInterface {
    return (input as AppointmentInterface).dataHora !== undefined;
}

function getItemType(item: MedicInterface | PatientInterface | AppointmentInterface): string {
    if (isMedic(item)) {
        return 'medico';
    }
    else if (isPatient(item)) {
        return 'paciente';
    }
    else if (isAppointment(item)) {
        return 'consulta';
    }
    return ''
}

export async function deactivate(itemType: string, id: string) {
    try {
        const res = await axios.delete(`http://localhost:3000/api/${itemType}/${id}`);
        return { message: `Médico deletado com sucesso`, data: res.data };
    } catch (e: any) {
        const errorMessage: string = e?.message || '';
        window.alert('Não foi possivel deletar essa pessoa');
        return { message: `Não foi possivel atualizar esse ${itemType}`, error: errorMessage };
    }
}

export default function List({ items }: { items: any[] }) {
    const formattedItems: (MedicInterface | PatientInterface | AppointmentInterface)[] = items.map(item => {
        if (isMedic(item))
            return item as MedicInterface;
        else if (isPatient(item))
            return item as PatientInterface;
        else
            return item as AppointmentInterface;
    })
    const [itemType, setItemType] = useState('');
    const [chosenId, setChosenId] = useState('');
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const handleDelete = async () => {
        await deactivate(itemType, chosenId);
    };
    return (
        <>
            <ul role="list" className={`divide-y divide-gray-100`}>
                {formattedItems.map((item) => (
                    <li key={isPerson(item) ? item?.email : item?.id} className={`flex justify-between gap-x-6 py-5`}>
                        <div className="flex min-w-0 gap-x-4">
                            <Avatar name={isAppointment(item) ? item.id : item.nome} className="h-12 w-12 flex-none rounded-full" />
                            {isPerson(item) ?
                                (
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{item.nome}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.email}</p>
                                    </div>
                                ) : (
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">Especialidade do médico: {item.medicoEspecialidade.toLowerCase()}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Data e hora da consulta: {format(new Date(item.dataHora), 'dd/MM/yyyy HH:mm')}</p>
                                    </div>
                                )}
                            {isPerson(item) && (<div className="min-w-0 flex-auto">
                                <a
                                    className="cursor-pointer"
                                    onClick={() => router.push(`${getItemType(item)}s/editar?id=${isMedic(item) ? item.crm : item.cpf}`)}>
                                    <PencilSquareIcon className="h-3 w-3 flex-none" />
                                </a>
                            </div>)}
                            { isPerson(item) || item.motivoCancelamento === null && (<div className="min-w-0 flex-auto">
                                <a
                                    className="cursor-pointer"
                                    onClick={() => {
                                        if(isPerson(item)) {
                                            setItemType(getItemType(item))
                                            setChosenId(() => {
                                                if (isMedic(item)) {
                                                    return item.crm;
                                                }
                                                return item.cpf;
                                            });
                                            onOpenChange();
                                        } else {
                                            router.push(`/consultas/cancelar?id=${item.id}`)
                                        }
                                    }}>
                                    <TrashIcon className="h-3 w-3 flex-none" />
                                </a>
                            </div>)}
                        </div>
                        {isMedic(item) && (
                            <div className="mt-1 flex flex-col items-end gap-x-1.5">
                                <p className="text-sm leading-6 text-gray-900">Especialidade: {`${item.especialidade?.toLowerCase()}`}</p>
                                <p className="text-sm leading-6 text-gray-900">CRM: {item.crm}</p>
                            </div>
                        )
                        }
                        {
                            isPatient(item) && (
                                <div className="mt-1 flex flex-col items-end gap-x-1.5">
                                    <p className="text-sm leading-6 text-gray-900">CPF: {item.cpf}</p>
                                    <p className="text-sm leading-6 text-gray-900">Telefone: {item.telefone}</p>
                                </div>
                            )
                        }
                        {
                            isAppointment(item) && (
                                <div className="mt-1 flex flex-col items-end gap-x-1.5">
                                    <p className="text-sm leading-6 text-gray-900">Médico: {item.medicoNome}</p>
                                    <p className="text-sm leading-6 text-gray-900">Paciente: {item.pacienteNome}</p>
                                    {isAppointment(item) && item.motivoCancelamento !== null && (<p className="text-sm leading-6 text-gray-900">Motivo de cancelamento: {MotivoCancelamento.getOptionLabel(item.motivoCancelamento)}</p>)}
                                </div>
                            )
                        }
                    </li>
                ))}
            </ul>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Deseja realmente excluir esse(a) {getItemType(items[0])}?</ModalHeader>
                            <ModalBody>
                                <p>
                                    Uma vez deletado, você não terá mais acesso aos dados desse(a) {getItemType(items[0])}
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={async () => {
                                    await handleDelete();
                                    onClose();
                                    router.push('/');
                                }}>
                                    Deletar
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Cancelar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
