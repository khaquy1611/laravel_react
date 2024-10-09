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

import CustomDialog from '@/components/CustomDialog'
import CreateTag from '@/components/CreateTag'

/* HOOKS */
import useFormSubmit from '@/hooks/useFormSubmit'
import { FormProvider, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'

/* SETTINGS */
import { Breadcrumb } from '@/types/Base'
import { redirectIfSuccess } from '../settings'
import { breadcrumbs, Models } from '@/constants/index'
import { PostCataloguePayloadInput } from '@/types/PostCatalogues'

import { getDropdown } from '@/helpers/myHelper'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { queryKey } from '@/constants/query'

/* SERVICE */
import { pagination } from '@/services/PostCatalogueService'
import { findById, save } from '@/services/PostService'

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

const Store = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [album, setAlbum] = useState<string[]>([])
  const [newTags, setNewTag] = useState<{ value: string; label: string }[]>([])

  const navigate = useNavigate()
  const { id } = useParams()
  const model = Models.posts
  const currentAction = useMemo(() => (id ? 'update' : ''), [])
  const breadcrumbData: Breadcrumb = useMemo(() => breadcrumbs.posts.index, [])

  const methods = useForm<PostCataloguePayloadInput>({
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
    [queryKey.postCatalogues],
    () => pagination('')
  )
  const { data: postCatalogue } = useQuery([model, id], () => findById(id), {
    enabled: !!id,
    onSuccess: data => {
      reset(data)
    },
  })

  const postCatalogues = useMemo(() => {
    if (!isDropdownLoading && dropdown) {
      return dropdown['post_catalogues']
        ? getDropdown(dropdown['post_catalogues'])
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
              <BackButton link="/post/index" />
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
                    <Parent
                      name="post_catalogue_id"
                      options={postCatalogues}
                      showMultiple={true}
                      showMultipleName="catalogues"
                    />
                  )}

                  {id ? (
                    postCatalogue && <ImageIcon data={postCatalogue} />
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
