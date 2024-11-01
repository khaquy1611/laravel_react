/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

/* COMPONENTS */
import LoadingButton from '@/components/LoadingButton'

import Advance from '@/components/Advance'
import Album from '@/components/Album'
import General from '@/components/General'
import PageHeading from '@/components/Heading'
import ImageIcon from '@/components/ImageIcon'
import Parent from '@/components/Parent'
import Seo from '@/components/Seo'
import Tag from '@/components/Tag'
import CustomLocation from '@/components/CustomLocation'

import CustomDialog from '@/components/CustomDialog'
import CreateTag from '@/components/CreateTag'

/* HOOKS */
import useFormSubmit from '@/hooks/useFormSubmit'
import { FormProvider, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'

/* SETTINGS */
import { Breadcrumb } from '@/types/Base'
import { redirectIfSuccess } from '../settings'

import { ProjectCataloguePayloadInput } from '@/types/ProjectCatalogue'

import { getDropdown } from '@/helpers/myHelper'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { queryKey } from '@/constants/query'

/* SERVICE */
import { pagination } from '@/services/ProjectCatalogueService'
import { findById, save } from '@/services/ProjectService'

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
  name: yup.string().required('Bạn chưa nhập vào tên dự án'),
  canonical: yup.string().required('Bạn chưa nhập vào đường dẫn'),
  description: yup.string().optional().nullable(),
  content: yup.string().optional().nullable(),
  parent_id: yup.number().optional(),
  publish: yup.number().optional(),
  follow: yup.number().optional(),
  // province_id: yup.number().optional(),
  image: fileValidation(['image/jpeg', 'image/png', 'image/gif', 'image/jpg'])
    .optional()
    .nullable(),
  icon: fileValidation(['image/jpeg', 'image/png', 'image/gif', 'image/jpg'])
    .optional()
    .nullable(),
})

const Store = () => {
  const model = Models.projects
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [album, setAlbum] = useState<string[]>([])
  const [newTags, setNewTag] = useState<{ value: string; label: string }[]>([])

  const navigate = useNavigate()
  const { id } = useParams()
  const currentAction = useMemo(() => (id ? 'update' : ''), [])
  const breadcrumbData: Breadcrumb = useMemo(
    () => breadcrumbs.projects.index,
    []
  )

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
    [queryKey.projectCatalogues],
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
      return dropdown[queryKey.projectCatalogues]
        ? getDropdown(dropdown[queryKey.projectCatalogues])
        : []
    }
    return []
  }, [dropdown])

  const handleOpenDialog = useCallback(() => {
    setOpenDialog(true)
  }, [])

  const handleNewTag = useCallback((tag: { value: string; label: string }) => {
    setNewTag(prev => [...prev, tag])
  }, [])

  useEffect(() => {
    if (isSuccess) {
      navigate(redirectIfSuccess)
    }
  }, [isSuccess])

  return (
    <>
      <FormProvider {...methods}>
        <div className="page-container">
          <PageHeading breadcrumb={breadcrumbData} />
          <div className="p-[15px]">
            <form onSubmit={handleSubmit(onSubmitHanler)}>
              <BackButton link="/project/index" />
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
                    <Parent
                      name="project_catalogue_id"
                      options={projectCatalogues}
                      showMultiple={true}
                      showMultipleName="catalogues"
                    />
                  )}

                  <CustomLocation data={projectCatalogue} />

                  {id ? (
                    projectCatalogue && <ImageIcon data={projectCatalogue} />
                  ) : (
                    <ImageIcon />
                  )}
                  <Tag
                    onOpenDialog={handleOpenDialog}
                    newTags={newTags}
                    setNewTags={setNewTag}
                  />

                  <Advance />
                </div>
              </div>
            </form>
          </div>
        </div>
      </FormProvider>

      {openDialog && (
        <CustomDialog
          heading="Thêm mới Tag"
          description="Nhập đầy đủ thông tin dưới đây, Các mục có dáu (*) là bắt buộc"
          buttonLoading={false}
          open={openDialog}
          close={() => setOpenDialog(false)}
        >
          <CreateTag
            close={() => setOpenDialog(false)}
            onNewTag={handleNewTag}
          />
        </CustomDialog>
      )}
    </>
  )
}

export default memo(Store)
