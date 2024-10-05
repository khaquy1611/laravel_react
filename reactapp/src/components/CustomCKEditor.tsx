/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CKEditor } from '@ckeditor/ckeditor5-react'
// import ClassicEditor from '@jaroya/ckeditor5-build-full'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import { Label } from '@/components/ui/label'
import axios from 'axios'

import { Controller, FieldValues, useFormContext } from 'react-hook-form'
import { useRef, useState, memo, useCallback } from 'react'

interface CustomCKEditorProps<T extends FieldValues> {
  label: string
  name: string
  className?: string
}

class CustomUploadPlugin {
  constructor(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any
    ) => {
      return new MyUploadAdapter(loader)
    }
  }
}

class MyUploadAdapter {
  private loader: any

  constructor(loader: any) {
    this.loader = loader
  }

  upload() {
    return new Promise((resolve, reject) => {
      this.loader.file.then((file: File) => {
        const formData = new FormData()
        formData.append('image', file)
        axios
          .post('/auth/upload/ckeditor', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(res => {
            resolve({
              default: res.data.url,
            })
          })
          .catch(err => {
            reject(err)
          })
      })
    })
  }
}

const CustomCKEditor = <T extends FieldValues>({
  label,
  name,
  className,
}: CustomCKEditorProps<T>) => {
  const {
    formState: { errors },
    control,
  } = useFormContext()
  const errorMessage = errors[name]?.message
  const editorRef = useRef<any>(null)

  const [previousImage, setPreviousImage] = useState<string[]>([])

  const handleEditorReady = useCallback((editor: any) => {
    editorRef.current = editor
    editor.model.document.on('change:data', () => {
      const data = editor.getData()

      const currentImages = Array.from(
        editor.model.document.getRoot().getChildren()
      )
        .filter((item: any) => item.name === 'imageBlock')
        .map((item: any) => item.getAttribute('src'))

      setPreviousImage(prev => {
        const removeImages = prev.filter(src => !currentImages.includes(src))
        removeImages.forEach(src => deleteImageFromCkeditor(src))

        return currentImages
      })
    })
  }, [])

  const deleteImageFromCkeditor = (src: string) => {
    axios
      .post('/auth/delete/ckeditor', { url: src })
      .then(() => console.log('Ảnh đã được xóa'))
      .catch(err => console.error('Xóa ảnh bị lỗi', err))
  }

  return (
    <div className={`gap-4 ${className ?? null}`}>
      <Label className="mb-[10px] block">{label}</Label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <CKEditor
            editor={ClassicEditor as any}
            data={field.value ?? ''}
            config={{
              extraPlugins: [CustomUploadPlugin],
            }}
            onReady={editor => handleEditorReady(editor)}
            onChange={(event, editor) => {
              const data = editor.getData()
              field.onChange(data)
            }}
          />
        )}
      />
      <div className="error-line text-right">
        {typeof errorMessage === 'string' && (
          <span className="text-red-500 text-xs">{errorMessage}</span>
        )}
      </div>
    </div>
  )
}

export default memo(CustomCKEditor)
