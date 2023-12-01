import { PencilSquareIcon, UserIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export interface ItemInterface {
    nome: string;
    email: string;
    cpf?: string;
    crm?: string;
    telefone?: string;
    especialidade?: string;
}

export default function List({ items }: { items: ItemInterface[] }) {
    const router = useRouter();
    return (
        <ul role="list" className="divide-y divide-gray-100">
            {items.map((person) => (
                <li key={person.email} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <UserIcon className="h-12 w-12 flex-none rounded-full" />
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{person.nome}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                        </div>
                    </div>
                    <div className="flex min-w-0 gap-x-4">
                        <a
                        onClick={() => router.push(`${person.crm ? 'medicos' : 'pacientes'}/editar?id=${person.crm || person.cpf || ''}`)}>
                            <PencilSquareIcon className="h-12 w-12 flex-none rounded-full" />
                        </a>
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
    )
}
