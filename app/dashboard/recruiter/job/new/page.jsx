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

import { useSession } from "@/lib/auth-client";

/* ---------------- COMPANY PLAN ---------------- */

const companyPlan = {
  id: "company_9f3k2a1x",
  name: "Knowledge IT Soft",
  jobLimit: 10,
  usedJobs: 3,
};

export default function CreateJobPage() {
  const { data: session } = useSession();

  const user = session?.user;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
    setForm((prev) => {
      const updated = { ...prev, [key]: value };

      if (key === "remote" && value === true) {
        updated.location = "";
      }

      return updated;
    });

    setErrors((prev) => ({ ...prev, [key]: false }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title) newErrors.title = true;
    if (!form.category) newErrors.category = true;
    if (!form.type) newErrors.type = true;

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const canPostJob =
    companyPlan.usedJobs < companyPlan.jobLimit;

  const handleSubmit = async () => {
    if (loading) return;

    if (!user) {
      alert("Please login first");
      return;
    }

    if (!validate()) return;

    setLoading(true);

    const payload = {
      ...form,
      location: form.remote ? null : form.location,
      salaryMin: form.salaryMin ? Number(form.salaryMin) : null,
      salaryMax: form.salaryMax ? Number(form.salaryMax) : null,
      status: "active",

      // ✅ FIX: company comes from plan, NOT user
      companyId: companyPlan.id,

      userId: user.id,
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
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Briefcase className="w-7 h-7" />
          Post a Job
        </h1>
        <p className="text-sm text-gray-500">
          Create a new job opening and start receiving applications.
        </p>
      </div>

      {/* JOB INFO */}
      <div className="border rounded-xl p-5 space-y-5 shadow-sm">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <Grid className="w-5 h-5" />
          Job Information
        </h2>

        {/* TITLE */}
        <div className="relative">
          <Briefcase className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            className={`w-full border rounded-lg pl-10 p-3 outline-none focus:ring-2 focus:ring-blue-500
              ${errors.title ? "border-red-500" : "border-gray-300"}`}
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
              value={form.category}
              className={`w-full bg-zinc-950 text-white border rounded-lg pl-10 p-3 outline-none
                ${errors.category ? "border-red-500" : "border-gray-300"}`}
              onChange={(e) =>
                handleChange("category", e.target.value)
              }
            >
              <option value="">Select Category</option>
              <option value="design">Design</option>
              <option value="development">Development</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>

          <div className="relative">
            <Layers className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <select
              value={form.type}
              className={`w-full border bg-zinc-950 text-white rounded-lg pl-10 p-3 outline-none
                ${errors.type ? "border-red-500" : "border-gray-300"}`}
              onChange={(e) =>
                handleChange("type", e.target.value)
              }
            >
              <option value="">Select Job Type</option>
              <option value="fulltime">Full-time</option>
              <option value="parttime">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>
        </div>

        {/* SALARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="number"
              className="w-full border rounded-lg pl-10 p-3 outline-none"
              placeholder="Min Salary"
              value={form.salaryMin}
              onChange={(e) =>
                handleChange("salaryMin", e.target.value)
              }
            />
          </div>

          <div className="relative">
            <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="number"
              className="w-full border rounded-lg pl-10 p-3 outline-none"
              placeholder="Max Salary"
              value={form.salaryMax}
              onChange={(e) =>
                handleChange("salaryMax", e.target.value)
              }
            />
          </div>

          <select
            className="border rounded-lg bg-zinc-950 text-white p-3 outline-none"
            value={form.currency}
            onChange={(e) =>
              handleChange("currency", e.target.value)
            }
          >
            <option value="BDT">BDT</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        {/* REMOTE */}
        <div className="border rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Remote Job</h3>
              <p className="text-sm text-gray-500">
                Enable if candidates can work remotely
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                handleChange("remote", !form.remote)
              }
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                form.remote ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                  form.remote
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* LOCATION */}
        {!form.remote && (
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              className="w-full border rounded-lg pl-10 p-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Location (City, Country)"
              value={form.location}
              onChange={(e) =>
                handleChange("location", e.target.value)
              }
            />
          </div>
        )}

        {/* DEADLINE */}
        <div className="relative">
          <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="date"
            className="w-full border rounded-lg pl-10 p-3 outline-none"
            value={form.deadline}
            onChange={(e) =>
              handleChange("deadline", e.target.value)
            }
          />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="border rounded-xl p-5 space-y-5 shadow-sm">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <ListChecks className="w-5 h-5" />
          Job Description
        </h2>

        <textarea
          className="w-full border rounded-lg p-3 outline-none"
          rows={5}
          placeholder="Responsibilities"
          value={form.responsibilities}
          onChange={(e) =>
            handleChange("responsibilities", e.target.value)
          }
        />

        <textarea
          className="w-full border rounded-lg p-3 outline-none"
          rows={5}
          placeholder="Requirements"
          value={form.requirements}
          onChange={(e) =>
            handleChange("requirements", e.target.value)
          }
        />

        <div className="relative">
          <Gift className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <textarea
            className="w-full border rounded-lg pl-10 p-3 outline-none"
            rows={4}
            placeholder="Benefits (Optional)"
            value={form.benefits}
            onChange={(e) =>
              handleChange("benefits", e.target.value)
            }
          />
        </div>
      </div>

      {/* SUBMIT */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!canPostJob || loading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          {loading ? "Publishing..." : "Publish Job"}
        </button>
      </div>
    </div>
  );
}