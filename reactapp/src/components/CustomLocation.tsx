/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useMemo, useEffect } from "react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Select from 'react-select'
import { Controller, useFormContext } from "react-hook-form"
import useLocationState from "@/hooks/useLocationState"
import { useQuery } from "react-query";
import { queryKey } from "@/constants/query";
import { pagination } from "@/services/ProjectService"
import { getDropdown } from "@/helpers/myHelper"

interface ICustomLocation {
    data: any,
    showProject?: boolean
}

interface Option {
    value: number,
    label: string
}

const CustomLocation = ({
    data,
    showProject
} : ICustomLocation ) => {

    const { formState: { errors }, getValues, control } = useFormContext()
    const { provinces, districts, wards, setProvinceId, setDistrictId } = useLocationState()

    const projectFilter = useMemo(() => {

        const field = getValues();

        return Boolean(
            field.province_id ||
            field.district_id ||
            field.ward_id
        )

    }, [getValues('province_id'), getValues('district_id'), getValues('ward_id')])


    const queryString = useMemo(() => {
        const params = new URLSearchParams()
        const field = getValues()
        if(field.province_id){
            params.append('province_id', field.province_id.toString())
        }
        if(field.district_id){
            params.append('district_id', field.district_id.toString())
        }
        if(field.ward_id){
            params.append('ward_id', field.ward_id.toString())
        }

        return params.toString() ? `${params.toString()}` : ''


    }, [getValues('province_id'), getValues('district_id'), getValues('ward_id')])



    const { data: projects, isLoading: isProjectLoading } = useQuery([queryKey.projects, queryString], () => pagination(queryString), {
        enabled: !!showProject && projectFilter && queryString.length > 0
    })

    const projectOptions = useMemo(() => {
        if(!isProjectLoading && projects){
            return projects[queryKey.projects] ? getDropdown(projects[queryKey.projects], 'Chọn dự án') : []
        }
    }, [projects])


    // useEffect(() => {

    //     if(!isProjectLoading){
    //         console.log(projects);
            
    //     }

    // }, [isProjectLoading])
    

    const errorMessage = errors['province_id']?.message

    useEffect(() => {
        if(data){
            if(data.province_id){
                setProvinceId(data.province_id)
            }
            if(data.district_id){
                setDistrictId(data.district_id)
            }
        }


    }, [data])

   
    return (
        <Card className="rounded-[5px] mb-[20px]">
            <CardHeader className="border-b border-solid border-[#f3f3f3] p-[15px]">
                <CardTitle className="uppercase">
                    Chọn Vị trí
                </CardTitle>
            </CardHeader>
            <CardContent className="p-[10px]">

                <Controller 
                    name="province_id"
                    control={control}
                    defaultValue={0}
                    render={({ field}) => (
                        <Select  
                            options={provinces.data as Option[]} 
                            className="w-full text-[13px]"
                            placeholder="Chọn Thành Phố"
                            
                            onChange={(selected) => {
                                const selectedValue = selected?.value ?? 0
                                field.onChange(selectedValue)
                                setProvinceId(selectedValue)
                            }}
                            value={provinces.data &&  provinces.data.find((option: Option) => option.value === field.value)}
                        />
                    )}
                />
                 <div className="error-line text-right">
                    {typeof errorMessage === 'string' && (
                        <span className="text-red-500 text-xs">{errorMessage}</span>
                    )}
                </div>

                <div className="mt-[10px]">
                    <Controller 
                        name="district_id"
                        // control={control}
                        defaultValue={0}
                        render={({ field}) => (
                            <Select  
                                options={districts.data as Option[]} 
                                className="w-full text-[13px]"
                                placeholder="Chọn Quận/Huyện"
                                onChange={(selected) => {
                                    const selectedValue = selected?.value ?? 0
                                    field.onChange(selectedValue)
                                    setDistrictId(selectedValue)
                                }}
                                value={districts.data &&  districts.data.find((option: Option) => option.value === field.value)}
                            />
                        )}
                    />
                </div>

                <div className="mt-[10px]">
                    <Controller 
                        name="ward_id"
                        defaultValue={0}
                        render={({ field}) => (
                            <Select  
                                options={wards.data as Option[]} 
                                className="w-full text-[13px]"
                                placeholder="Chọn Phường/Xã"
                                onChange={(selected) => {
                                    const selectedValue = selected?.value ?? 0
                                    field.onChange(selectedValue)
                                }}
                                value={wards.data &&  wards.data.find((option: Option) => option.value === field.value)}
                            />
                        )}
                    />
                </div>

                { showProject && (
                    <div className="mt-[10px]">
                        <Controller 
                            name="project_id"
                            defaultValue={0}
                            render={({ field}) => (
                                <Select  
                                    options={projectOptions as Option[]} 
                                    className="w-full text-[13px]"
                                    placeholder="Chọn dự án"
                                    onChange={(selected) => {
                                        const selectedValue = selected?.value ?? 0
                                        field.onChange(selectedValue)
                                    }}
                                    value={projectOptions &&  projectOptions.find((option: Option) => option.value === field.value)}
                                />
                            )}
                        />
                    </div>
                )}

            </CardContent>
        </Card>
    )
}

export default memo(CustomLocation)