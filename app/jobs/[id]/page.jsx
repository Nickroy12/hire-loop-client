import { getJobById } from '@/lib/api/job'
import Link from 'next/link'
import React from 'react'

const page = async ({ params }) => {
  const { id } = await params
  const job = await getJobById(id)

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-950 text-zinc-400">
        <p className="text-lg">Job not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-indigo-500 selection:text-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-10 border-b border-zinc-800 pb-8">
          {job.companyLogo && (
            <div className="w-16 h-16 rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 flex items-center justify-center shadow-inner">
              <img 
                src={job.companyLogo} 
                alt="Company Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-400">
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium capitalize">
                {job.category}
              </span>
              <span>•</span>
              <span className="capitalize">{job.type}</span>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Left Side: Job Details */}
          <div className="md:col-span-2 space-y-8">
            <section className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6 backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-3 text-zinc-200 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-indigo-500 rounded-full"></span>
                Responsibilities
              </h2>
              <p className="text-zinc-400 leading-relaxed whitespace-pre-line">{job.responsibilities}</p>
            </section>

            <section className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6 backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-3 text-zinc-200 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-indigo-500 rounded-full"></span>
                Requirements
              </h2>
              <p className="text-zinc-400 leading-relaxed whitespace-pre-line">{job.requirements}</p>
            </section>

            <section className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6 backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-3 text-zinc-200 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-indigo-500 rounded-full"></span>
                Benefits & Perks
              </h2>
              <p className="text-zinc-400 leading-relaxed whitespace-pre-line">{job.benefits}</p>
            </section>
          </div>

          {/* Right Side: Action Sticky Card */}
          <div className="md:col-span-1 md:sticky md:top-8">
            <div className="border border-zinc-800 bg-zinc-900/80 rounded-2xl p-6 shadow-xl shadow-black/40 backdrop-blur-md">
              <h3 className="text-base font-bold mb-5 text-white tracking-wide uppercase text-zinc-400 text-xs">
                Job Overview
              </h3>
              
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                  <span className="text-zinc-400">Salary Range</span>
                  <span className="font-semibold text-zinc-200">
                    {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()} {job.currency}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                  <span className="text-zinc-400">Location</span>
                  <span className="font-semibold text-zinc-200">
                    {job.remote ? '🏡 Remote' : job.location || 'On-site'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-zinc-400">Application Deadline</span>
                  <span className="font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md text-xs border border-amber-500/20">
                    {new Date(job.deadline).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {/* Next.js Apply Link Button */}
              <Link 
                href={`/jobs/${id}/apply`}
                className="block w-full text-center bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 text-sm tracking-wide"
              >
                Apply for this job
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default page