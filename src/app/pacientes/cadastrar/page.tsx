'use client'
import Navbar from "../../components/navbar";
import Form from "../../components/form";
import { estados } from "@/consts/estados";
import { SafeParseReturnType, z } from 'zod';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

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

export async function register(formData: FormData) {
  const schema = z.object({
    nome: z.string(),
    email: z.string().email(),
    telefone: z.string(),
    cpf: z.string(),
    endereco: z.object({
      cep: z.string(),
      logradouro: z.string(),
      bairro: z.string(),
      cidade: z.string(),
      uf: z.string(),
      complemento: z.string().optional(),
      numero: z.string().optional()
    })
  })
  const parse = schema.safeParse({
    nome: formData.get('nome'),
    cpf: formData.get('cpf'),
    email: formData.get('email'),
    telefone: formData.get('phone'),
    endereco: {
      cep: formData.get('cep'),
      logradouro: formData.get('logradouro'),
      bairro: formData.get('bairro'),
      cidade: formData.get('cidade'),
      uf: formData.get('uf'),
      complemento: formData.get('complemento'),
      numero: formData.get('numero')
    }
  })

  if (!parse.success) {
    return { message: 'Formulário invalido', error: parse.error.message }
  }

  const data = parse.data

  try {
    const res = await axios.post(`http://localhost:3000/api/paciente`, data);
    window.alert(`Paciente ${data.cpf} registrado`);
    return { message: `Paciente ${data.cpf} registrado`, data: res.data }
  } catch (e: any) {
    const errorMessage: string = e?.message || '';
    return { message: 'Não podemos registrar esse paciente', error: errorMessage }
  }
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
    ];
    const [error, setError] = useState('');
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();
    const handleRegister = async (formData: any) => {
        const result = await register(formData);
        if (result?.data) {
            router.push('/pacientes');
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
                    <h1 className="text-base font-semibold leading-7 text-white-900">Preencha corretamente os dados do(a) paciente</h1>
                    <Form inputs={inputs} action={handleRegister}></Form>
                </div>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Erro ao cadastrar os dados do paciente</ModalHeader>
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