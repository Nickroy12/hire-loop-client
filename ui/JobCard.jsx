'use client'
import React from 'react';
import Link from 'next/link';

const JobCard = ({ job }) => {
  // Format salary to a readable string (e.g., 12k–13k)
  const formatSalary = (min, max) => {
    const kMin = min >= 1000 ? `${min / 1000}k` : min;
    const kMax = max >= 1000 ? `${max / 1000}k` : max;
    return `${kMin}–${kMax}`;
  };

  // Capitalize or format the job type cleanly (e.g., fulltime -> Full-time)
  const formatJobType = (type) => {
    if (!type) return '';
    if (type === 'fulltime') return 'Full-time';
    if (type === 'parttime') return 'Part-time';
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  // Safely extract ID whether it's a direct string or a MongoDB $oid object
  const jobId = job._id?.$oid || job._id;

  return (
    <div className="w-full max-w-[340px] bg-[#121212] text-white p-7 rounded-[2rem] border border-neutral-800 shadow-2xl transition-all hover:border-neutral-700 flex flex-col justify-between">
      <div>
        {/* Top Section: Company Logo & Header */}
               <div>
                 {job.companyLogo && (
            <img 
              src={job.companyLogo} 
              alt="Company Logo" 
              className="w-10 h-10 rounded-xl object-contain bg-white p-1 ml-2 shrink-0"
              onError={(e) => { e.target.style.display = 'none'; }} // Hide broken images gracefully
            />
          )}
       </div>
        <div className="flex items-start justify-between mb-4">

    <h2 className="text-2xl font-bold tracking-tight text-white line-clamp-2">
            {job.title}
          </h2>
       
        </div>

        {/* Description / Requirements Preview */}
        <p className="text-[13px] text-neutral-400 leading-snug mb-6 line-clamp-2">
          {job.requirements ? `Requirements: ${job.requirements}` : `Explore opportunities in ${job.category} roles.`}
        </p>

        {/* Tags Container */}
        <div className="flex flex-wrap gap-2 mb-8">
          {/* Location Tag */}
          <div className="flex items-center gap-1.5 bg-[#1c1c1e] px-4 py-2 rounded-full text-[12px] font-medium border border-neutral-800">
            <span className="text-purple-400">📍</span> 
            {job.location || (job.remote ? "Remote Only" : "N/A")}
          </div>
          
          {/* Workplace / Job Type Tag */}
          <div className="flex items-center gap-1.5 bg-[#1c1c1e] px-4 py-2 rounded-full text-[12px] font-medium border border-neutral-800">
            <span className="text-purple-400">🏢</span> 
            {formatJobType(job.type)}
          </div>

          {/* Salary Tag */}
          <div className="flex items-center gap-1.5 bg-[#1c1c1e] px-4 py-2 rounded-full text-[12px] font-medium border border-neutral-800">
            <span className="text-purple-400">৳</span> 
            {formatSalary(job.salaryMin, job.salaryMax)} / {job.currency}
          </div>
        </div>
      </div>

      {/* Next.js Link Wrapper */}
      <Link 
        href={`/jobs/${jobId}`}
        className="group inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-purple-400 transition-colors w-fit"
      >
        Apply Now 
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </Link>
    </div>
  );
};

export default JobCard;