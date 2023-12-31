export interface InputInterface {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    id: string;
    autoComplete?: string;
    maxlength?: number;
    minLength?: number;
    onChange?: any;
}

export default function CustomInput({ input }: { input: InputInterface }) {
    return (
        <div className="sm:col-span-3"><label htmlFor={input.name} className="block text-sm font-medium leading-6 text-white-900">{input.label}</label><div className="mt-2"><input
            id={input.id}
            name={input.name}
            autoComplete={input.autoComplete}
            type={input.type}
            maxLength={input.maxlength}
            minLength={input.minLength}
            value={input.value}
            disabled={input.disabled || false}
            onChange={input.onChange || undefined}
            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /></div></div>)
}