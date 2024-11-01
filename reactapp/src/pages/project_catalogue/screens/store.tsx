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
import { redirectIfSuccess } from '../settings'
import { Breadcrumb } from '@/types/Base'

import { ProjectCataloguePayloadInput } from '@/types/ProjectCatalogue'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { getDropdown } from '@/helpers/myHelper'

/* SERVICE */
import { save, findById } from '@/services/ProjectCatalogueService'
import { pagination } from '@/services/ProjectCatalogueService'

/* SCSS */
import '@/assets/scss/Editor.scss'
import { breadcrumbs, Models } from '@/constants'
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
  const currentAction = useMemo(() => (id ? 'update' : ''), [])
  const model = Models.project_catalogues
  const breadcrumbData: Breadcrumb = useMemo(
    () => breadcrumbs.project_catalogues.index,
    []
  )

  // const {} = useForm

  const methods = useForm<ProjectCataloguePayloadInput>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })
  const { handleSubmit, reset } = methods
  const { onSubmitHanler, loading, isSuccess } = useFormSubmit(
    save,
    { action: currentAction, id: id },
    album
  )

  const handleAlbum = useCallback((images: string[]) => {
    setAlbum(images)
  }, [])

  const { data: dropdown, isLoading: isDropdownLoading } = useQuery(
    [model],
    () => pagination('')
  )
  const { data: projectCatalogue } = useQuery([model, id], () => findById(id), {
    enabled: !!id,
    onSuccess: data => {
      reset(data)
    },
  })

  const projectCatalogues = useMemo(() => {
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

  return (
    <FormProvider {...methods}>
      <div className="page-container">
        <PageHeading breadcrumb={breadcrumbData} />
        <div className="p-[15px]">
          <form onSubmit={handleSubmit(onSubmitHanler)}>
            <BackButton link="/project/catalogue/index" />
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-9">
                <General />

                <Album onAlbumChange={handleAlbum} data={projectCatalogue} />

                {/* -- SEO -- */}

                {id ? (
                  projectCatalogue && <Seo data={projectCatalogue} />
                ) : (
                  <Seo />
                )}

                <div className="mt-[20px] text-right">
                  <LoadingButton loading={loading} text="Lưu thông tin" />
                </div>
              </div>
              <div className="col-span-3">
                {dropdown && (
                  <Parent name="parent_id" options={projectCatalogues} />
                )}

                {id ? (
                  projectCatalogue && <ImageIcon data={projectCatalogue} />
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
