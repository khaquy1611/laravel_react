/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { useEffect,  memo, useMemo, useCallback } from "react"
import { useState } from "react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import CustomInput from "./CustomInput"
import CustomTextarea from "./CustomTextarea"
import Canonical from "./Canonical"

import { FieldValues} from "react-hook-form"
import { PostCatalogue } from "@/types/PostCatalogues"

/* HELPER */
import { slug, removeHtmlTags } from "@/helpers/myHelper"



interface SeoProps <T extends FieldValues> {
    data?: PostCatalogue,
    isLoading?: boolean
}

const Seo = <T extends FieldValues> ({
    data,
}: SeoProps<T>) => {


    const initialSeo = useMemo(() => ({
        canonical: 'http://nhap-vao-duong-dan-cua-ban.html',
        metaTitle: 'Bạn chưa nhập vào tiêu đề SEO',
        metaDescription: 'Bạn chưa nhập vào tiêu đề SEO'
    }), [])

    const [seo, setSeo] = useState<{canonical: string, metaTitle: string, metaDescription: string}>(initialSeo)
 
    const handleSeoChange = useCallback((e:any , field: string) => {
        setSeo(prevState => ({
            ...prevState,
            [field]: field === 'canonical' ? `${import.meta.env.VITE_BASE_URL}/${slug(e.target.value)}${import.meta.env.VITE_SUFFIX}`  : e.target.value
        }))
    }, [])


    useEffect(() => {
        if(data){
            setSeo({
                canonical: `${import.meta.env.VITE_BASE_URL}/${slug(data.canonical)}${import.meta.env.VITE_SUFFIX}`,
                metaTitle: removeHtmlTags(data.meta_title),
                metaDescription: removeHtmlTags(data.meta_description),
            })
        }
    }, [data])


    return (
        <Card className="rounded-[5px] mt-[15px]">
            <CardHeader className="border-b border-solid border-[#f3f3f3] p-[15px]">
                <CardTitle className="uppercase">Cấu Hình SEO </CardTitle>
            </CardHeader>
            <CardContent className="pt-[15px]">
                <div className="seo-preview mb-[40px]">
                    <div className="text-[20px] text-[#1a0dab] mb-[5px]">{ seo.metaTitle.length ? seo.metaTitle : 'Nhập vào tiêu đề SEO của bạn' }</div>
                    <div className="text-[14px] text-[green] mb-[5px]">{ seo.canonical.length ? seo.canonical : 'Nhập vào đường dẫn của bạn' }</div>
                    <div className="text-[14px] text-[#33]">{seo.metaDescription.length ? seo.metaDescription : 'Nhập vào tiêu đề SEO của bạn'}</div>   
                </div>

                <CustomInput 
                    label="Tiêu đề SEO"
                    name="meta_title"
                    type="text"
                    defaultValue=""
                    className="gap-4 mb-[20px]"
                    labelClassName="mb-[10px] block"
                    inputClassName="border-[#ccced1]"
                    onChange={(e: any) => handleSeoChange(e, 'metaTitle')}
                />

                <CustomInput 
                    label="Từ khóa SEO"
                    name="meta_keyword"
                    type="text"
                    defaultValue=""
                    className="gap-4 mb-[20px]"
                    labelClassName="mb-[10px] block"
                    inputClassName="border-[#ccced1]"
                    
                />

                <CustomTextarea 
                    label="Mô tả SEO"
                    name="meta_description"
                    type="text"
                    defaultValue=""
                    className="gap-4 mb-[20px]"
                    labelClassName="mb-[10px] block"
                    onChange={(e: any) => handleSeoChange(e, 'metaDescription')}
                    inputClassName="min-h-[100px] border-[#ccced1]"
                />

                <Canonical 
                    onSeoChange={handleSeoChange}
                />
                
            </CardContent>
        </Card>
    )
}

export default memo(Seo)