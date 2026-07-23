import FormProfile from '@/components/forms/FormProfile'
import { redirect } from 'next/navigation'
import { getMe } from '@/lib/actions/me'

export default async function DashboardUserProfilePage() {
  // Me
  const resMe = await getMe()
  if (!resMe.success || !resMe.payload) redirect('/')
  const me = resMe.payload

  return (
    <section className="main flex flex-col">
      {/** Top */}
      <div className="main__header font-semibold py-3 px-5 border-b bg-gray-100 border-gray-100">
        Profile
      </div>

      {/** Content */}
      <div className="main__content py-3 px-5">
        <div className="container container--narrow md:my-5">
          <FormProfile m={me} className="w-full max-w-80" />
        </div>
      </div>
    </section>
  )
}
