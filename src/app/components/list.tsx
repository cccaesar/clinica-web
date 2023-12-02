'use client'
import { PencilSquareIcon, TrashIcon, UserIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";

export interface ItemInterface {
    nome: string;
    email: string;
    cpf?: string;
    crm?: string;
    telefone?: string;
    especialidade?: string;
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

export default function List({ items }: { items: ItemInterface[] }) {
    const [itemType, setItemType] = useState('');
    const [chosenId, setChosenId] = useState('');
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const handleDelete = async () => {
        await deactivate(itemType, chosenId);
    };
    return (
        <>
            <ul role="list" className="divide-y divide-gray-100">
                {items.map((person) => (
                    <li key={person.email} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <UserIcon className="h-12 w-12 flex-none rounded-full" />
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{person.nome}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                            </div>
                            <div className="min-w-0 flex-auto">
                                <a
                                    className="cursor-pointer"
                                    onClick={() => router.push(`${person.crm ? 'medicos' : 'pacientes'}/editar?id=${person.crm || person.cpf || ''}`)}>
                                    <PencilSquareIcon className="h-3 w-3 flex-none" />
                                </a>
                            </div>
                            <div className="min-w-0 flex-auto">
                                <a
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setItemType(person.crm ? 'medico' : 'paciente')
                                        setChosenId(person?.crm || person?.cpf || '');
                                        onOpenChange();
                                    }}>
                                    <TrashIcon className="h-3 w-3 flex-none" />
                                </a>
                            </div>
                        </div>
                        {person.crm ? (
                            <div className="mt-1 flex items-center gap-x-1.5">
                                <p className="text-sm leading-6 text-gray-900">Especialidade: {`${person.especialidade?.toLowerCase()}`}</p>
                                <p className="text-sm leading-6 text-gray-900">CRM: {person.crm}</p>
                            </div>
                        ) : (
                            <div className="mt-1 flex items-center gap-x-1.5">
                                <p className="text-sm leading-6 text-gray-900">CPF: {person.cpf}</p>
                                <p className="text-sm leading-6 text-gray-900">Telefone: {person.telefone}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Deseja realmente excluir esse {items[0].crm ? 'médico' : 'paciente'}?</ModalHeader>
                            <ModalBody>
                                <p>
                                    Uma vez deletado, você não terá mais acesso aos dados desse {items[0].crm ? 'médico' : 'paciente'}
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
