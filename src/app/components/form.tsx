import Select from "./select";
import { SelectInterface } from "./select";
import CustomInput, { InputInterface } from "./input";
import { useFormStatus } from 'react-dom'
import { Input } from "@nextui-org/react";
import InfiniteScroll, {InfiniteSelectInterface} from "./infinite-scroll";

export interface FormattedInputs {
    comboboxes: SelectInterface[];
    infiniteScrolls: InfiniteSelectInterface[]
    genericsFields: InputInterface[];
}

function isSelect(input: SelectInterface | InputInterface | InfiniteSelectInterface): input is SelectInterface {
    return (input as SelectInterface).options !== undefined && (input as InfiniteSelectInterface).url === undefined;
}

function isInfiniteScroll(input: SelectInterface | InputInterface | InfiniteSelectInterface): input is InfiniteSelectInterface {
    return (input as InfiniteSelectInterface).url !== undefined;
}
function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit" aria-disabled={pending}>
            Salvar
        </button>
    )
}

export default function Form({ inputs, action }: { inputs: any[], action: any }) {
    const formattedInputs: (SelectInterface | InputInterface | InfiniteSelectInterface)[] = inputs.map(input => {
        if (isSelect(input))
            return input as SelectInterface;
        if(isInfiniteScroll(input))
            return input as InfiniteSelectInterface;
        else
            return input as InputInterface;
    });
    return (
        <form action={action}>
            <div className="space-y-12">
                <div className="border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 items-end">
                        {formattedInputs.map(input => {
                            if (isSelect(input))
                                return (<Select key={input.name} input={input}></Select>)
                            else if(isInfiniteScroll(input))
                                return (<InfiniteScroll key={input.name} label={input.label} placeholder={input.placeholder || ''} name={input.name} url={input.url}></InfiniteScroll>)
                            else if (input.type !== 'datetime-local')
                                return (<Input key={input.name} variant="underlined" label={input.label} value={input.value}></Input>)
                            else
                                return (<CustomInput key={input.name} input={input}/>)
                        })}
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <SubmitButton />
            </div>
        </form>
    )
}
