/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

interface UseSetFormValueProps<T>{
    isLoading: boolean,
    data: T | null,
    action: string,
    setValue: any
}

const useSetFormValue = <T, U>({
    isLoading,
    data,
    action,
    setValue
}: UseSetFormValueProps<T>) => {

    useEffect(() => {
        if(!isLoading && data && action === 'update'){
            Object.keys(data).forEach((key) => {
                const value = data[key as keyof T]
                if(typeof value === 'string' || value === undefined){
                    setValue(key as keyof U, value )
                }else{
                    setValue(key as keyof U, String(value))
                }
            })
        }
    }, [data])


}
export default useSetFormValue