import { getApplicationByApplicant } from '@/lib/api/applications'
import { getUserSession } from '@/lib/core/session'
import React from 'react'

const ApplicationsPage = async () => {
  const user = await getUserSession()
  const applications = await getApplicationByApplicant(user.id)
  console.log(applications, "app")

  // ডেট ফরম্যাট করার জন্য হেল্পার ফাংশন
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      // Invalid date চেক করার জন্য
      if (isNaN(date.getTime())) return 'N/A'
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    } catch (error) {
      return 'N/A'
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen text-gray-100">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Your Applications</h1>
        <p className="text-sm text-gray-400 mt-1">
          You have submitted {applications?.length || 0} {applications?.length === 1 ? 'application' : 'applications'}.
        </p>
      </div>
      
      {/* Table Container */}
      <div className="overflow-x-auto bg-gray-900 border border-gray-800 rounded-xl shadow-lg">
        <table className="w-full min-w-max table-auto text-left border-collapse">
          <thead>
            <tr className="bg-gray-800/50 border-b border-gray-800 text-xs font-semibold uppercase tracking-wider text-gray-400">
              <th className="px-6 py-4">Job Title</th>
              <th className="px-6 py-4">Applicant Name</th>
              <th className="px-6 py-4">Email Address</th>
              <th className="px-6 py-4">Applied Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-sm text-gray-300">
            {!applications || applications.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-medium">
                  No applications found.
                </td>
              </tr>
            ) : (
              applications.map((app, index) => (
                <tr 
                  key={`${app._id?.$oid || app.jobId || index}-${index}`} 
                  className="hover:bg-gray-800/40 transition-colors"
                >
                  {/* Job Title */}
                  <td className="px-6 py-4 font-semibold text-white">
                    {app.jobTitle}
                  </td>
                  {/* Applicant Name */}
                  <td className="px-6 py-4 text-gray-300">
                    {app.applicantName}
                  </td>
                  {/* Email */}
                  <td className="px-6 py-4 text-gray-400 font-mono text-xs">
                    {app.applicantEmail}
                  </td>
                  {/* Applied Date */}
                  <td className="px-6 py-4 text-gray-400">
                    {formatDate(app.createAt?.$date || app.createAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ApplicationsPage