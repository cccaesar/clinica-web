export interface InputInterface {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    id: string;
    autoComplete?: string;
}

export default function Input({ input }: { input: InputInterface }) {
    return (
        <div className="sm:col-span-3"><label htmlFor={input.name} className="block text-sm font-medium leading-6 text-white-900">{input.label}</label><div className="mt-2"><input
            id={input.id}
            name={input.name}
            autoComplete={input.autoComplete}
            type={input.type}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /></div></div>)
}