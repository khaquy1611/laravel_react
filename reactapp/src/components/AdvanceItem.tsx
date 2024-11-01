
import { Controller, useFormContext } from "react-hook-form"
import Select from 'react-select'

type OptionItem = {
    value: number,
    label: string
}

interface IAdvanceItem {
    options: OptionItem[],
    name: string
    placeholder?: string
    root?: number
}

const AdvanceItem = ({
    options,
    name
}: IAdvanceItem) => {

    const { control } = useFormContext()
    const defaultValue =   options.find(option => option.value === 2)


    return (

        <Controller 
            name={name}
            control={control}
            defaultValue={defaultValue?.value || null}
            render={({ field}) => (
                <Select  
                    options={options} 
                    className="w-full text-[13px] mb-[15px]"
                    placeholder="Chọn trạng thái"
                    onChange={(selected) => {
                        field.onChange(selected?.value)
                    }}
                    value={options.find(option => option.value === field.value) || defaultValue}
                />
            )}
        />
    )
}

export default AdvanceItem