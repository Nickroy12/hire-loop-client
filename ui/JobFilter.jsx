"use client";

import { useMemo, useState } from "react";
import JobCard from "@/ui/JobCard";

const JobFilter = ({ jobs }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title?.toLowerCase().includes(search.toLowerCase()) ||
        job.requirements?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = category
        ? job.category === category
        : true;

      const matchesType = jobType
        ? job.type === jobType
        : true;

      const matchesRemote = remoteOnly
        ? job.remote === true
        : true;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesType &&
        matchesRemote
      );
    });
  }, [jobs, search, category, jobType, remoteOnly]);

  return (
    <>
      {/* Filters */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Search */}
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 bg-neutral-800 text-white rounded-lg outline-none border border-neutral-700"
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 bg-neutral-800 text-white rounded-lg border border-neutral-700"
          >
            <option value="">All Categories</option>
            <option value="design">Design</option>
            <option value="development">Development</option>
            <option value="marketing">Marketing</option>
          </select>

          {/* Job Type */}
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="px-4 py-2 bg-neutral-800 text-white rounded-lg border border-neutral-700"
          >
            <option value="">All Types</option>
            <option value="fulltime">Full Time</option>
            <option value="parttime">Part Time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
          </select>

          {/* Remote */}
          <label className="flex items-center gap-3 text-white">
            <input
              type="checkbox"
              checked={remoteOnly}
              onChange={(e) => setRemoteOnly(e.target.checked)}
              className="h-5 w-5"
            />
            Remote Only
          </label>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-5 text-neutral-400">
        {filteredJobs.length} Jobs Found
      </div>

      {/* Job Cards */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-10 text-center">
          <h3 className="text-xl font-semibold text-white">
            No Jobs Found
          </h3>
          <p className="text-neutral-500 mt-2">
            Try changing your filters.
          </p>
        </div>
      )}
    </>
  );
};

export default JobFilter;