export interface SelectInterface {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    id: string;
    options: string[];
}
export default function Select({ input }: { input: SelectInterface }) {
    return (
        <div className="sm:col-span-3"><label htmlFor={input.name} className="block text-sm font-medium leading-6 text-white-900">{input.label}</label>
            <div className="mt-2"><select
                id={input.id}
                name={input.name}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 p-2 bg-white"
            >
                {input.options.map(option => <option>{option}</option>)}
            </select></div></div>)
}