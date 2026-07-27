'use client'

import { useEffect, useState, useActionState, useRef } from 'react'
import Image from 'next/image'
import { updateMe } from '@/lib/actions/me'
import { useSession } from 'next-auth/react'
import { UserRoundPen } from 'lucide-react'
import { Trash } from 'lucide-react'
import { deleteMedia, uploadMedia } from '@/lib/actions/media'
import { useUnsavedChanges } from '@/store/useUnsavedChanges'

export default function FormProfile({
  m,
  className,
}: {
  m: User
  className?: string
}) {
  const { data: session, update } = useSession()

  const formRef = useRef<HTMLFormElement>(null)

  const [pending, setPending] = useState(false)
  const [me, setMe] = useState<User>(m)
  const [state, handleSubmit, isPending] = useActionState(updateMe, {
    success: false,
    message: null,
    errors: null,
  })

  const { setDirty } = useUnsavedChanges()

  useEffect(() => {
    setMe(m)
  }, [m])

  useEffect(() => {
    if (state.success) {
      setMe(state.payload)
      setDirty(false)
      sessionUpdate(state.payload)
    } else {
      setPending(false)
    }
  }, [state])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (useUnsavedChanges.getState().isDirty) {
        e.preventDefault()
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  async function sessionUpdate(updatedUser: User) {
    const newUser = {
      ...session?.user,
      ...updatedUser,
    }

    console.log('Updating session with new user data:', newUser)
    await update(newUser)
  }

  function getFormData() {
    return new FormData(formRef.current!)
  }

  async function handleUploadProfilePhoto(imageFile: File) {
    setPending(true)

    try {
      const upload = await uploadMedia(imageFile)

      if (upload?.success) {
        setMe((prev: User) => ({
          ...prev,
          image: upload.payload.url,
        }))

        const fd = getFormData()
        fd.set('image', upload.payload.url)

        const action = await updateMe(
          { payload: null, message: null, success: false },
          fd
        )
        if (action.success) {
          sessionUpdate(action.payload)
          setDirty(false)
        }
      }
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPending(false)
    }
  }

  async function handleDeleteProfilePhoto() {
    setPending(true)

    try {
      const fd = getFormData()
      fd.set('image', me.image || '')
      fd.set('removeProfile', 'true')

      const deleted = await deleteMedia(null, fd)

      if (deleted.success) {
        fd.delete('removeProfile')
        fd.set('image', '')
        const updated = await updateMe(
          { payload: null, message: null, success: false },
          fd
        )
        setMe((prev: User) => ({
          ...prev,
          image: null,
        }))
        if (updated.success) {
          sessionUpdate(updated.payload)
          setDirty(false)
        }
      }
    } catch (error) {
      console.error('error: ', error)
    } finally {
      setPending(false)
    }
  }

  function trackDirty() {
    setDirty(true)
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className={`bg-background p-5 md:p-10 mx-auto flex justify-center ${className}`}
      noValidate
      data-loading={pending || isPending}
      onChange={trackDirty}
    >
      <div className="flex flex-col gap-5">
        <div className="p-4 relative flex justify-center text-center">
          <div className=" w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex justify-center items-center mx-auto">
            <label
              data-loading={pending}
              htmlFor="profile-image-input"
              className="cursor-pointer h-full flex items-center w-full justify-center"
            >
              {me?.image ? (
                <div className="relative group h-full w-full">
                  <Image
                    src={me.image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    width={200}
                    height={200}
                  />
                  <div className="bg-black/30 z-20 overlay absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity">
                    <button
                      type="button"
                      onClick={handleDeleteProfilePhoto}
                      className="button button--circle"
                    >
                      <Trash />
                    </button>
                  </div>
                </div>
              ) : (
                <UserRoundPen size={24} className="text-gray-900" />
              )}
            </label>
            <input
              id="profile-image-input"
              type="file"
              accept=".jpg, .jpeg, .png"
              className="hidden"
              name="_image"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onloadend = () => {
                    setMe((prev: User) => ({
                      ...prev,
                      image: reader.result as string,
                    }))
                  }
                  reader.readAsDataURL(file)
                  handleUploadProfilePhoto(file)
                }
              }}
              disabled={isPending}
            />
          </div>
        </div>

        <div className="profile-information-container mb-10 w-full flex flex-col gap-y-4">
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <div className="flex relative">
              <input
                type="text"
                name="name"
                defaultValue={me?.name}
                className={`!w-full ${state.errors?.name ? 'has-errors' : ''}`}
                disabled={isPending}
              />
            </div>
            {state.errors?.name && (
              <div className="error">{state.errors.name}</div>
            )}
          </div>
          <div className="form-control">
            <label htmlFor="email">Email Address</label>
            <input
              name="email"
              type="email"
              defaultValue={me?.email}
              className={`!w-full ${state.errors?.email ? 'has-errors' : ''}`}
            />
          </div>
          {state?.message && (
            <div
              className={`alert ${
                state.success ? 'alert--success' : 'alert--danger'
              }`}
            >
              {state.message}
            </div>
          )}
          <button
            className={`button button--accent flex justify-center my-3 ${
              isPending ? 'cursor-wait opacity-50' : 'cursor-pointer'
            }`}
            disabled={isPending}
          >
            {isPending ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </form>
  )
}
