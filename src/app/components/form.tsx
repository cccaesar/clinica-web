import Input from "./input";
import Select from "./select";
import { SelectInterface } from "./select";
import { InputInterface } from "./input";

export interface FormattedInputs {
    comboboxes: SelectInterface[];
    genericsFields: InputInterface[];
}

function isSelect(input: SelectInterface | InputInterface): input is SelectInterface {
    return (input as SelectInterface).options !== undefined;
}

export default function Form({ inputs }: { inputs: any[] }) {
    const formattedInputs: (SelectInterface | InputInterface)[] = inputs.map(input => {
        if (input.type === 'select')
            return input as SelectInterface;
        else
            return input as InputInterface;
    })
    return (
        <form>
            <div className="space-y-12">
                <div className="border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {formattedInputs.map(input => {
                            if(isSelect(input))
                                return (<Select input={input}></Select>)
                            else
                                return (<Input input={input}></Input>)
                        })}
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </form>
    )
}
