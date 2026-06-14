'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const JobApply = ({ jobId, user }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const applicationData = {
      jobId,
      name: formData.get('name'),
      email: formData.get('email'),
      resumeText: formData.get('resumeText'), // শুধুমাত্র রেজুমি টেক্সট পাঠানো হচ্ছে
    }

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      })

      if (!res.ok) {
        throw new Error('Something went wrong. Please try again.')
      }

      setSuccess(true)
      
      setTimeout(() => {
        router.push(`/jobs/${jobId}`)
      }, 3000)

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className='min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4'>
        <div className='w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center shadow-xl space-y-4'>
          <div className='w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl'>
            ✓
          </div>
          <h2 className='text-2xl font-bold text-white'>Application Submitted!</h2>
          <p className='text-zinc-400 text-sm'>
            Your application has been sent successfully. Redirecting you back to the job details...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4 md:p-8'>
      <div className='w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-10 shadow-xl'>
        
        {/* Header */}
        <div className='mb-8'>
          <h2 className='text-2xl md:text-3xl font-bold text-white mb-2'>Submit Your Application</h2>
          <p className='text-zinc-400 text-sm'>
            Position ID: <span className='text-indigo-400 font-mono'>#{jobId}</span>. Please provide your details below.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className='mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm'>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-6'>
          
          {/* Full Name */}
          <div className='flex flex-col gap-2'>
            <label htmlFor='name' className='text-sm font-medium text-zinc-300'>Full Name</label>
            <input 
              type='text' 
              id='name'
              name='name'
              defaultValue={user?.name || ''}
              required
              placeholder='John Doe' 
              className='w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all'
            />
          </div>

          {/* Email Address */}
          <div className='flex flex-col gap-2'>
            <label htmlFor='email' className='text-sm font-medium text-zinc-300'>Email Address</label>
            <input 
              type='email' 
              id='email'
              name='email'
              defaultValue={user?.email || ''}
              required
              placeholder='john@example.com' 
              className='w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all'
            />
          </div>

          {/* Resume Text Input (ক্লিন ও মিনিমালিস্ট টেক্সট এরিয়া) */}
          <div className='flex flex-col gap-2'>
            <div className='flex justify-between items-center'>
              <label htmlFor='resumeText' className='text-sm font-medium text-zinc-300'>Resume / CV Content</label>
              <span className='text-xs text-zinc-500'>Paste your Resume Link</span>
            </div>
            <input 
              id='resumeText'
              name='resumeText'
              rows={12} // কোড বা টেক্সট যেন ক্লিয়ারলি দেখা যায় তার জন্য হাইট বাড়ানো হয়েছে
              required
              placeholder="Paste your Resume Link" 
              className='w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono text-sm leading-relaxed whitespace-pre'
            />
          </div>

          {/* Action Buttons */}
          <div className='flex items-center justify-end gap-4 pt-4 border-t border-zinc-800'>
            <button 
              type='button' 
              onClick={() => router.back()}
              disabled={loading}
              className='px-5 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all disabled:opacity-50'
            >
              Cancel
            </button>
            <button 
              type='submit' 
              disabled={loading}
              className='px-6 py-2.5 rounded-xl text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 disabled:opacity-50 flex items-center gap-2'
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default JobApply