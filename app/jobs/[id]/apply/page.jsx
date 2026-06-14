import { getUserSession } from '@/lib/core/session'
import { redirect } from 'next/navigation'
import React from 'react'
import JobApply from './JobApply'

const ApplyPage = async ({ params }) => {
  const { id } = await params
  const user = await getUserSession()

  if (!user) {
    redirect(`/login?redirect=/jobs/${id}/apply`)
  }

  if (user.role !== "seeker") {
    return (
      <div className='w-full h-screen flex flex-col justify-center items-center bg-zinc-950 text-white p-6'>
        <p className="text-xl font-semibold bg-red-500/10 border border-red-500/20 px-6 py-3 rounded-xl text-red-400">
          Only Job Seekers can apply for this position.
        </p>
      </div>
    )
  }

  return (
   <JobApply jobId={id} user={user}/>
  )
}

export default ApplyPage