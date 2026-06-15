import { getUserSession } from '@/lib/core/session'
import { redirect } from 'next/navigation'
import React from 'react'
import JobApply from './JobApply'
import { getJobById } from '@/lib/api/job'
import { getApplicationByApplicant } from '@/lib/api/applications'
import Link from 'next/link'
import { getPlanById } from '@/lib/api/plans'

const ApplyPage = async ({ params }) => {
  const { id } = await params
  const user = await getUserSession()

  // ১. ইউজার অথেনটিকেশন চেক (সবার আগে, যাতে রিডাইরেক্ট ইনস্ট্যান্ট হয়)
  if (!user) {
    redirect(`/login?redirect=/jobs/${id}/apply`)
  }

  // ২. অননুমোদিত রোলের জন্য দ্রুত রিটার্ন (কোনো API কল করার আগেই)
  if (user.role !== "seeker") {
    return (
      <div className="w-full min-h-[80vh] flex flex-col justify-center items-center bg-zinc-950 text-white p-4">
        <div className="max-w-md w-full bg-zinc-900 border border-red-500/20 rounded-2xl p-6 text-center shadow-xl shadow-red-950/20">
          <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-zinc-100 mb-1">Access Denied</h3>
          <p className="text-sm text-zinc-400">
            Only Job Seekers can apply for this position. If you have another account, please switch profiles.
          </p>
        </div>
      </div>
    )
  }

  // ৩. Parallel API Fetching (সবগুলো কল একসাথে হবে, কোনো ওয়াটারফল ইফেক্ট থাকবে না)
  const [job, applications, plan] = await Promise.all([
    getJobById(id),
    getApplicationByApplicant(user.id),
    getPlanById(user.plan || 'seeker_free')
  ])

  // ৪. সেফটি চেক (যদি API থেকে প্ল্যান বা ডাটা না আসে)
  const maxApplicationsPerMonth = plan?.maxApplicationsPerMonth || 5; // আপনার ডিফল্ট ফ্রি লিমিট দিতে পারেন
  const planName = plan?.name || 'Free';
  const appliedCount = applications?.length || 0;

  const isLimitReached = appliedCount >= maxApplicationsPerMonth
  const progressPercentage = Math.min((appliedCount / maxApplicationsPerMonth) * 100, 100)

  // ৫. মূল অ্যাপ্লিকেশন পেজের আধুনিক UI
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
      <div className="max-w-2xl w-full space-y-6">
        
        {/* জব এবং অ্যাপ্লিকেশন লিমিট কার্ড */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 px-2.5 py-1 rounded-full">
                {planName} Plan
              </span>
              <h2 className="text-xl font-bold text-zinc-100 mt-2">Application Limit Status</h2>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-2xl font-bold text-zinc-100">{appliedCount}</span>
              <span className="text-zinc-500 font-medium"> / {maxApplicationsPerMonth} Applied</span>
            </div>
          </div>

          {/* প্রোগ্রেস বার (Progress Bar) */}
          <div className="w-full bg-zinc-800 rounded-full h-2 mb-2 overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ease-out ${isLimitReached ? 'bg-red-500' : 'bg-emerald-500'}`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <p className="text-xs text-zinc-400">
            {isLimitReached 
              ? "You have reached your free application limit. Upgrade your plan to apply for more jobs." 
              : `You can apply for ${maxApplicationsPerMonth - appliedCount} more jobs on your current plan.`
            }
          </p>
        </div>

        {/* কন্ডিশনাল রেন্ডারিং এবং লিমিট শেষ হলে নোটিফিকেশন */}
        {isLimitReached ? (
          <div className="bg-zinc-900/50 border space-y-4 border-amber-500/20 rounded-2xl p-6 text-center">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-base font-semibold text-zinc-200">Application Limit Exceeded</h4>
            <p className="text-sm text-zinc-400 mt-1 max-w-sm mx-auto">
              Please upgrade your subscription to submit your application for <strong>{job?.title || 'this job'}</strong>.
            </p>
            <div className="pt-2">
              <Link href='/pricing' className="inline-block px-5 py-2.5 bg-zinc-100 text-zinc-900 font-semibold text-sm rounded-xl hover:bg-zinc-200 transition-colors">
                Upgrade Now
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-md">
            <div className="mb-6 border-b border-zinc-800 pb-4">
              <h3 className="text-lg font-medium text-zinc-400">Applying for</h3>
              <h1 className="text-2xl font-bold text-zinc-100 mt-1">{job?.title || "Job Position"}</h1>
              <p className="text-sm text-zinc-500 mt-1">{job?.company || "Company Name"}</p>
            </div>
            
            {/* মূল ফরম কম্পোনেন্ট */}
            <JobApply jobId={id} job={job} user={user} />
          </div>
        )}

      </div>
    </div>
  )
}

export default ApplyPage