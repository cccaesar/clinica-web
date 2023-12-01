import { z } from 'zod';
import axios from "axios";
import { useRouter } from 'next/router';

export async function update(formData: FormData) {
  const router = useRouter();
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
    router.push('/medicos');
    return { message: `Dados do médico atualizados com sucesso` }
  } catch (e) {
    return { message: 'Não foi possivel registrar esse médico' }
  }
}