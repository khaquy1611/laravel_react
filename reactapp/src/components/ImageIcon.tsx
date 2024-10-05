/* eslint-disable react-refresh/only-export-components */
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import CustomUploadBox from "./CustomUploadBox"
import { PostCatalogue } from "@/types/PostCatalogues"
import { useRef, useEffect, memo } from "react"

interface IImageIcon {
    data?: PostCatalogue
}

const ImageIcon = ({
    data
}: IImageIcon) => {


    const imageIconCount = useRef(1)

    useEffect(() => {
        imageIconCount.current += 1;
    })

    return (
        <Card className="rounded-[5px] mb-[20px]">
            <CardHeader className="border-b border-solid border-[#f3f3f3] p-[15px]">
                <CardTitle className="uppercase">
                    Ảnh & Icon render: {imageIconCount.current}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-[10px]">
                <div className="grid grid-cols-2 gap-4">
                     <CustomUploadBox
                        name="image"
                        label="Ảnh đại diện"
                        data={data?.image}
                    />
                    <CustomUploadBox
                        name="icon"
                        label="Icon"
                        data={data?.icon}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default memo(ImageIcon)