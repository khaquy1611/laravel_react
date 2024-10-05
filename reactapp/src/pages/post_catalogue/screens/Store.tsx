/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useState, memo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

/* COMPONENTS */
import LoadingButton from '@/components/LoadingButton'

import PageHeading from '@/components/Heading'
import General from '@/components/General'
import Album from '@/components/Album'
import Seo from '@/components/Seo'
import ImageIcon from '@/components/ImageIcon'
import Advance from '@/components/Advance'
import Parent from '@/components/Parent'

/* HOOKS */
import { useForm, FormProvider } from 'react-hook-form'
import useFormSubmit from '@/hooks/useFormSubmit'
import { useQuery } from 'react-query'

/* SETTINGS */
import {
  breadcrumb,
  redirectIfSuccess,
} from '../settings/PostCatalogueSettings'
import { Breadcrumb } from '@/types/Base'
import { model } from '../settings/PostCatalogueSettings'

import { PostCataloguePayloadInput } from '@/types/PostCatalogues'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { getDropdown } from '@/helpers/myHelper'

/* SERVICE */
import { save, getPostCatalogueById } from '@/services/PostCatalogueService'
import { pagination } from '@/services/PostCatalogueService'

/* SCSS */
import '@/assets/scss/Editor.scss'
import BackButton from '@/components/BackButton'

/* IMAGE */

/* OPTIMIZE */
const fileValidation = (fileTypes: string[]) => {
  return yup.mixed().test('fileType', 'Loại tệp không hợp lệ', (value: any) => {
    const file = value && value[0]

    if (!file || !(file instanceof File)) {
      return true
    }
    if (!fileTypes.includes(file.type)) {
      return false
    }
    return true
  })
}

const schema = yup.object().shape({
  name: yup.string().required('Bạn chưa nhập vào tên nhóm bài viết'),
  canonical: yup.string().required('Bạn chưa nhập vào đường dẫn'),
  description: yup.string().optional().nullable(),
  content: yup.string().optional().nullable(),
  parent_id: yup.number().optional(),
  publish: yup.number().optional(),
  follow: yup.number().optional(),
  image: fileValidation(['image/jpeg', 'image/png', 'image/gif', 'image/jpg'])
    .optional()
    .nullable(),
  icon: fileValidation(['image/jpeg', 'image/png', 'image/gif', 'image/jpg'])
    .optional()
    .nullable(),
})

/*
    memo: Tôi ưu số lần re render ko cần thiết của component CON khi prop của component con này thay đổi.
    useCallback: Tối ưu số lần re render ko cần thiết của component CON khi mà component con gọi vào 1 hàm của component cha.


    useMemo: Dùng để lưu, ghi nhớ lại 1 phép tính (kết quả) 

*/

const Store = () => {
  const [album, setAlbum] = useState<string[]>([])

  const navigate = useNavigate()
  const { id } = useParams()
  const currentAction = useMemo(() => (id ? 'update' : ''), [id])
  const breadcrumbData: Breadcrumb = useMemo(() => breadcrumb.index, [])

  // const {} = useForm

  const methods = useForm<PostCataloguePayloadInput>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods
  const { onSubmitHanler, loading, isSuccess } = useFormSubmit(
    save,
    { action: currentAction, id: id },
    album
  )

  const handleAlbum = useCallback((images: string[]) => {
    setAlbum(images)
  }, [])

  const {
    data: dropdown,
    isLoading: isDropdownLoading,
  } = useQuery([model], () => pagination(''))
  const {
    data: postCatalogue,
  } = useQuery([model, id], () => getPostCatalogueById(id), {
    enabled: !!id,
    onSuccess: data => {
      reset(data)
    },
  })

  const postCatalogues = useMemo(() => {
    if (!isDropdownLoading && dropdown) {
      return dropdown[model] ? getDropdown(dropdown[model]) : []
    }
    return []
  }, [dropdown])

  useEffect(() => {
    if (isSuccess) {
      navigate(redirectIfSuccess)
    }
  }, [isSuccess])

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <FormProvider {...methods}>
      <div className="page-container">
       
        <PageHeading breadcrumb={breadcrumbData} />
        <div className="p-[15px]">
          <form onSubmit={handleSubmit(onSubmitHanler)}>
          <BackButton link="/post/catalogue/index" />
            <div className="grid grid-cols-12 gap-4">
           
              <div className="col-span-9">
                <General />

                <Album onAlbumChange={handleAlbum} data={postCatalogue} />

                {/* -- SEO -- */}

                {id ? postCatalogue && <Seo data={postCatalogue} /> : <Seo />}

                <div className="mt-[20px] text-right">
                  <LoadingButton loading={loading} text="Lưu thông tin" />
                </div>
              </div>
              <div className="col-span-3">
                {dropdown && (
                  <Parent name="parent_id" options={postCatalogues} />
                )}

                {id ? (
                  postCatalogue && <ImageIcon data={postCatalogue} />
                ) : (
                  <ImageIcon />
                )}

                <Advance />
              </div>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  )
}

export default memo(Store)
