import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import axios from "axios";

export async function register(formData: FormData) {
  const schema = z.object({
    nome: z.string(),
    email: z.string().email(),
    telefone: z.string(),
    cpf: z.string().length(11),
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
    console.log('parse.error.message', parse.error.message);
    return { message: 'Failed to create todo' }
  }

  const data = parse.data

  try {
    await axios.post(`http://localhost:3000/api/paciente`, data);
    revalidatePath('/')
    window.alert(`Paciente ${data.cpf} registrado`);
    return { message: `Paciente ${data.cpf} registrado` }
  } catch (e) {
    return { message: 'Não podemos registrar esse paciente' }
  }
}

export async function deactivate(formData: FormData) {
  const schema = z.object({
    cpf: z.string().length(11),
  })
  const data = schema.parse({
    cpf: formData.get('cpf'),
  })

  try {
    await axios.delete(`http://localhost:3000/api/paciente/${data.cpf}`)
    revalidatePath('/')
    return { message: `Paciente ${data.cpf} deletado` }
  } catch (e) {
    return { message: 'Não foi possivel deletar esse paciente' }
  }
}