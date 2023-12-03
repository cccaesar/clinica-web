import { Select, SelectItem } from "@nextui-org/react";

export interface SelectInterface {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    id: string;
    options: string[];
}
export default function SelectInput({ input }: { input: SelectInterface }) {
    console.log('SelectInput', input);
    return (
        <Select
            label={input.label}
            className="sm:col-span-3 mt-2"
        >
            {input.options.map((option) => (
                <SelectItem key={option} textValue={option}>
                    {option}
                </SelectItem>
            ))}
        </Select>
    )
}