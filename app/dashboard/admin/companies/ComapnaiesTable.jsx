"use client"

import { updateCompany } from '@/lib/action/company'
import React from 'react'

const CompaniesTable = ({ initialCompanies }) => {

  // Helper function to get initials for the circular avatar
  const getInitials = (name) => {
    if (!name) return ''
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleApprove = async (id) => {
    const result = await updateCompany(id, { status: "Approve" })
    console.log(`Approved ID: ${id}`, result)
  }

  const handleReject = async (id) => {
    const result = await updateCompany(id, { status: "Reject" })
    console.log(`Rejected ID: ${id}`, result)
  }

  // Dynamic badge color handling based on backend status
  const getStatusStyles = (status) => {
    switch (status) {
      case 'Approve':
      case 'Approved':
        return { text: 'text-emerald-500', dot: 'bg-emerald-500' }
      case 'Reject':
      case 'Rejected':
        return { text: 'text-rose-500', dot: 'bg-rose-500' }
      default:
        return { text: 'text-amber-500', dot: 'bg-amber-500' }
    }
  }

  return (
    <div className="w-full overflow-x-auto bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] shadow-xl">
      <table className="w-full min-w-[900px] text-left border-collapse table-auto">
        {/* Table Header */}
        <thead>
          <tr className="border-b border-[#2a2a2a] text-[#888888] text-xs font-semibold tracking-wider uppercase bg-[#141414]">
            <th className="py-4 px-6">Company Name</th>
            <th className="py-4 px-6">Recruiter Email</th>
            <th className="py-4 px-6">Industry</th>
            <th className="py-4 px-6">Status</th>
            <th className="py-4 px-6">Data Submitted</th>
            <th className="py-4 px-6 text-right">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-[#2a2a2a] text-sm">
          {initialCompanies?.map((company) => {
            const companyId = company._id?.$oid || company._id
            const statusStyle = getStatusStyles(company.status)
            const isApproved = company.status === 'Approve' || company.status === 'Approved'
            const isRejected = company.status === 'Reject' || company.status === 'Rejected'

            return (
              <tr key={companyId} className="hover:bg-[#222222] transition-colors duration-150">
                {/* Company Name & Avatar */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center text-xs font-semibold text-white tracking-wider border border-[#3a3a3a] shrink-0">
                      {getInitials(company.name)}
                    </div>
                    <span className="font-medium text-white truncate max-w-[200px]">
                      {company.name}
                    </span>
                  </div>
                </td>

                {/* Recruiter Email */}
                <td className="py-4 px-6 text-[#aaaaaa] font-mono text-xs">
                  {company.recruiterEmail || `info@${company.websiteUrl || 'domain.com'}`}
                </td>

                {/* Industry */}
                <td className="py-4 px-6 text-[#888888]">
                  {company.industry || 'N/A'}
                </td>

                {/* Status Badge */}
                <td className="py-4 px-6">
                  <div className={`flex items-center gap-2 font-medium ${statusStyle.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                    {company.status || 'Pending'}
                  </div>
                </td>

                {/* Date Submitted */}
                <td className="py-4 px-6 text-[#888888]">
                  {company.dateSubmitted || "Oct 12, 2023"}
                </td>

                {/* Action Buttons */}
                <td className="py-4 px-6 text-right">
                  <div className="inline-flex gap-2">
                    {!isRejected ? (
                      <>
                        {isApproved ? (
                          <>
                            {/* Approved বাটন (Disabled) */}
                            <button 
                              disabled
                              className="px-3 py-1.5 text-xs font-medium rounded bg-emerald-600 text-white border border-emerald-700 cursor-not-allowed"
                            >
                              Approved
                            </button>
                            {/* Approved হলেও পরবর্তীতে Reject করার সুযোগ থাকছে */}
                            <button 
                              onClick={() => handleReject(companyId)} 
                              className="px-3 py-1.5 text-xs font-medium rounded bg-[#3a1616] text-rose-400 hover:bg-[#521f1f] border border-[#5d2323] transition-colors"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <>
                            {/* Pending অবস্থায় দুটি বাটনই স্বাভাবিক থাকবে */}
                            <button 
                              onClick={() => handleApprove(companyId)} 
                              className="px-3 py-1.5 text-xs font-medium rounded bg-[#163a24] text-emerald-400 hover:bg-[#1f5233] border border-[#235d3a] transition-colors"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => handleReject(companyId)} 
                              className="px-3 py-1.5 text-xs font-medium rounded bg-[#3a1616] text-rose-400 hover:bg-[#521f1f] border border-[#5d2323] transition-colors"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      /* কোম্পানি Reject বা Rejected হয়ে গেলে কোনো বাটনই থাকবে না */
                      null
                    )}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default CompaniesTable