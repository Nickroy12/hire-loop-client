"use client";

import { useState } from "react";
import {
  Briefcase,
  Grid,
  Layers,
  DollarSign,
  MapPin,
  Calendar,
  ListChecks,
  Gift,
  Send,
} from "lucide-react";

/* ---------------- DEMO DATA ---------------- */

const demoCompany = {
  id: "company_9f3k2a1x",
  name: "Knowledge IT Soft",
  plan: "growth",
  jobLimit: 10,
  usedJobs: 3,
};

const demoSession = {
  user: {
    id: "user_1001",
    companyId: "company_9f3k2a1x",
  },
};

export default function CreateJobPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "",
    type: "",
    salaryMin: "",
    salaryMax: "",
    currency: "BDT",
    location: "",
    remote: false,
    deadline: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const canPostJob = demoCompany.usedJobs < demoCompany.jobLimit;

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      ...form,
      salaryMin: Number(form.salaryMin),
      salaryMax: Number(form.salaryMax),
      status: "active",
      companyId: demoSession.user.companyId,
    };

    console.log("JOB PAYLOAD →", payload);

    setTimeout(() => {
      alert("Job Published!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Briefcase className="w-6 h-6" />
        Post a Job
      </h1>

      {/* ================= JOB INFO ================= */}
      <div className="border rounded-xl p-5 space-y-4 shadow-sm">
        <h2 className="font-semibold flex items-center gap-2">
          <Grid className="w-5 h-5" />
          Job Info
        </h2>

        {/* TITLE */}
        <div className="relative">
          <Briefcase className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            className="w-full border rounded-lg pl-10 p-2 outline-none"
            placeholder="Job Title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        {/* CATEGORY + TYPE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Grid className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <select
              className="w-full bg-zinc-950 text-white border rounded-lg pl-10 p-2"
              onChange={(e) => handleChange("category", e.target.value)}
            >
              <option value="">Category</option>
              <option value="design">Design</option>
              <option value="development">Development</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>

          <div className="relative">
            <Layers className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <select
              className="w-full bg-base-100 text-white border rounded-lg pl-10 p-2"
              onChange={(e) => handleChange("type", e.target.value)}
            >
              <option value="">Job Type</option>
              <option value="fulltime">Full-time</option>
              <option value="parttime">Part-time</option>
              <option value="remote">Remote</option>
              <option value="contract">Contract</option>
            </select>
          </div>
        </div>

        {/* SALARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="number"
              className="w-full border rounded-lg pl-10 p-2"
              placeholder="Min Salary"
              value={form.salaryMin}
              onChange={(e) => handleChange("salaryMin", e.target.value)}
            />
          </div>

          <div className="relative">
            <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="number"
              className="w-full border rounded-lg pl-10 p-2"
              placeholder="Max Salary"
              value={form.salaryMax}
              onChange={(e) => handleChange("salaryMax", e.target.value)}
            />
          </div>

          <select
            className="border rounded-lg p-2"
            value={form.currency}
            onChange={(e) => handleChange("currency", e.target.value)}
          >
            <option value="BDT">BDT</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        {/* REMOTE + LOCATION */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.remote}
              onChange={(e) => handleChange("remote", e.target.checked)}
            />
            Remote Job
          </label>

          {!form.remote && (
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                className="w-full border rounded-lg pl-10 p-2"
                placeholder="Location"
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>
          )}
        </div>

        {/* DEADLINE */}
        <div className="relative">
          <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="date"
            className="w-full border rounded-lg pl-10 p-2"
            value={form.deadline}
            onChange={(e) => handleChange("deadline", e.target.value)}
          />
        </div>
      </div>

      {/* ================= DESCRIPTION ================= */}
      <div className="border rounded-xl p-5 space-y-4 shadow-sm">
        <h2 className="font-semibold flex items-center gap-2">
          <ListChecks className="w-5 h-5" />
          Job Description
        </h2>

        <textarea
          className="w-full border rounded-lg p-2"
          rows={4}
          placeholder="Responsibilities"
          value={form.responsibilities}
          onChange={(e) => handleChange("responsibilities", e.target.value)}
        />

        <textarea
          className="w-full border rounded-lg p-2"
          rows={4}
          placeholder="Requirements"
          value={form.requirements}
          onChange={(e) => handleChange("requirements", e.target.value)}
        />

        <div className="relative">
          <Gift className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <textarea
            className="w-full border rounded-lg pl-10 p-2"
            rows={3}
            placeholder="Benefits (optional)"
            value={form.benefits}
            onChange={(e) => handleChange("benefits", e.target.value)}
          />
        </div>
      </div>

      {/* ================= SUBMIT ================= */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!canPostJob || loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          {loading ? "Publishing..." : "Publish Job"}
        </button>
      </div>
    </div>
  );
}