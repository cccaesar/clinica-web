'use client'
import Navbar from "../../components/navbar";
import Form from "../../components/form";
import { z } from 'zod';
import { estados } from "@/consts/estados";
import { useSearchParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

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
    nome: z.string(),
    telefone: z.string(),
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
    return { message: 'Failed to update medico' }
  }

  const data = parse.data

  try {
    const res = await axios.patch(`http://localhost:3000/api/medico/${crm}`, data);
    return { message: `Dados do médico atualizados com sucesso` }
  } catch (e) {
    return { message: 'Não foi possivel registrar esse médico' }
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
        //router.push('/medicos');
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
        </main>
    )
}