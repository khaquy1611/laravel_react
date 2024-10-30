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
import { breadcrumbs, Models } from '@/constants'
/* HOOKS */
import { useForm, FormProvider } from 'react-hook-form'
import useFormSubmit from '@/hooks/useFormSubmit'
import { useQuery } from 'react-query'

/* SETTINGS */
import { redirectIfSuccess } from '../settings'
import { Breadcrumb } from '@/types/Base'

import { PostCataloguePayloadInput as ObjectPayloadInput } from '@/types/PostCatalogues'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { getDropdown } from '@/helpers/myHelper'

/* SERVICE */
import { save, findById } from '@/services/RealEstateCatalogueService'
import { pagination } from '@/services/RealEstateCatalogueService'

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
  name: yup.string().required('Bạn chưa nhập vào tên loại bất động sản'),
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

const Store = () => {
  const model = Models.real_estate_catalogues
  const [album, setAlbum] = useState<string[]>([])

  const navigate = useNavigate()
  const { id } = useParams()
  const currentAction = useMemo(() => (id ? 'update' : ''), [])
  const breadcrumbData: Breadcrumb = useMemo(
    () => breadcrumbs.real_estate_catalogues.index,
    []
  )

  // const {} = useForm

  console.log(model)

  const methods = useForm<ObjectPayloadInput>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })
  const { handleSubmit, reset } = methods
  const { onSubmitHanler, loading, isSuccess } = useFormSubmit(
    save,
    { action: currentAction, id: id },
    album,
    'real_estate_catalogues'
  )

  const handleAlbum = useCallback((images: string[]) => {
    setAlbum(images)
  }, [])

  const { data: dropdown, isLoading: isDropdownLoading } = useQuery(
    [model],
    () => pagination('')
  )
  const { data: realEstate } = useQuery([model, id], () => findById(id), {
    enabled: !!id,
    onSuccess: data => {
      reset(data)
    },
  })

  const realEstates = useMemo(() => {
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
          <BackButton link="/real_estate/catalogue/index" />
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-9">
                <General />

                <Album onAlbumChange={handleAlbum} data={realEstate} />

                {/* -- SEO -- */}

                {id ? realEstate && <Seo data={realEstate} /> : <Seo />}

                <div className="mt-[20px] text-right">
                  <LoadingButton loading={loading} text="Lưu thông tin" />
                </div>
              </div>
              <div className="col-span-3">
                {dropdown && <Parent name="parent_id" options={realEstates} />}

                {id ? (
                  realEstate && <ImageIcon data={realEstate} />
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
