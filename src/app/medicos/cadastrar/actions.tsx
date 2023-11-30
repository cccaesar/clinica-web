import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import axios from "axios";

export async function register(formData: FormData) {
  const schema = z.object({
    nome: z.string(),
    email: z.string().email(),
    telefone: z.string(),
    crm: z.string(),
    especialidade: z.string(),
    endereco: z.object({
      cep: z.string().min(8).max(9),
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
    crm: formData.get('crm'),
    especialidade: formData.get('especialidade')?.toString().toUpperCase(),
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
    return { message: 'Failed to create todo' }
  }

  const data = parse.data

  try {
    const res = await axios.post(`http://localhost:3000/api/medico`, data)
    console.log('res', res);
    revalidatePath('/')
    return { message: `Medico ${data.crm} registrado` }
  } catch (e) {
    return { message: 'Não foi possivel registrar esse médico' }
  }
}

export async function deactivate(formData: FormData) {
  const schema = z.object({
    crm: z.string(),
  })
  const data = schema.parse({
    crm: formData.get('crm'),
  })

  try {
    await axios.delete(`http://localhost:3000/api/medico/${data.crm}`)
    revalidatePath('/')
    return { message: `Médico ${data.crm} deletado` }
  } catch (e) {
    return { message: 'Não foi possivel deletar esse medico' }
  }
}