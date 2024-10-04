/* REACT */
import React from 'react'

/* COMPONENT */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

/* SETTINGS */
import { SelectOption } from '@/types/Base'
import { useFilterContext } from '@/contexts/FilterContext'

export interface SelectConfig {
  name: string
  placeholder: string
  options: SelectOption[]
  width?: string
}

export interface CustomFilterProps {
  handleFilter: (value: string, field: string) => void
}

const CustomFilter: React.FC<CustomFilterProps> = ({ handleFilter }) => {
  const { filters } = useFilterContext()

  return (
    <div className="flex item-center mt-[10px]">
      {filters &&
        filters.map((filter, index) => (
          <div className="mr-[10px]" key={index}>
            <Select onValueChange={value => handleFilter(value, filter.name)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={filter.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {filter.options &&
                  filter.options.map((option, optionIndex) => (
                    <SelectItem key={optionIndex} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        ))}
    </div>
  )
}

export default CustomFilter
