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
  Send,
} from "lucide-react";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { getJobData } from "@/lib/action/job";

export default function CreateJobPage({company}) {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Updated state based on your image reference
  // const [mockCompany] = useState({
  //   name: "Knowledge IT Soft (Auto-filled)",
  //   id: "company_9f3k2a1x",
  //   isApproved: true,
  // });

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
      const updated = {
        ...prev,
        [key]: value,
      };

      if (key === "remote" && value) {
        updated.location = "";
      }

      return updated;
    });

    setErrors((prev) => ({
      ...prev,
      [key]: false,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = true;
    if (!form.category) newErrors.category = true;
    if (!form.type) newErrors.type = true;

    if (!form.remote && !form.location.trim()) {
      newErrors.location = true;
    }

    if (!form.deadline) newErrors.deadline = true;
    if (!form.responsibilities.trim()) newErrors.responsibilities = true;
    if (!form.requirements.trim()) newErrors.requirements = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check using the boolean field from your image structure
  // const canPostJob = mockCompany.isApproved;

  const resetForm = () => {
    setForm({
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
  };

  const handleSubmit = async () => {
    if (loading) return;

    if (!user) {
      alert("Please login first");
      return;
    }

    // if (!canPostJob) {
    //   alert("Your company is not approved to post jobs.");
    //   return;
    // }

    if (!validate()) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: form.title,
        category: form.category,
        type: form.type,
        salaryMin: form.salaryMin ? Number(form.salaryMin) : null,
        salaryMax: form.salaryMax ? Number(form.salaryMax) : null,
        currency: form.currency,
        location: form.remote ? null : form.location,
        remote: form.remote,
        deadline: form.deadline,
        responsibilities: form.responsibilities,
        requirements: form.requirements,
        benefits: form.benefits,
        status: "active",
        companyId: company._id,
        companyLogo: company.logo,
        userId: user.id,
        createdAt: new Date(),
      };

      const res = await getJobData(payload);
      console.log(res);

      if (res?.insertedId || res?.acknowledged) {
        alert("Job Posted Successfully");
        resetForm();
        router.push("/dashboard/recruiter");
      } else {
        alert("Failed to create job");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Briefcase className="w-7 h-7" />
          Post a Job
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Create a new job opening for <span className="font-semibold">{company.name}</span>.
        </p>
      </div>

      {/* Job Info */}
      <div className="border rounded-xl p-5 shadow-sm space-y-5">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <Grid className="w-5 h-5" />
          Job Information
        </h2>

        {/* Job Title */}
        <div className="relative">
          <Briefcase className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Job Title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={`w-full border rounded-lg pl-10 p-3 outline-none bg-white text-black ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>

        {/* Category & Type */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Grid className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <select
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className={`w-full bg-zinc-900 text-white border rounded-lg pl-10 p-3 outline-none ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Category</option>
              <option value="design">Design</option>
              <option value="development">Development</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>

          <div className="relative">
            <Layers className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <select
              value={form.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className={`w-full bg-zinc-900 text-white border rounded-lg pl-10 p-3 outline-none ${
                errors.type ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Job Type</option>
              <option value="fulltime">Full Time</option>
              <option value="parttime">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>
        </div>

        {/* Salary */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <DollarSign className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="number"
              placeholder="Min Salary"
              value={form.salaryMin}
              onChange={(e) => handleChange("salaryMin", e.target.value)}
              className="w-full border rounded-lg pl-10 p-3 outline-none"
            />
          </div>

          <div className="relative">
            <DollarSign className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="number"
              placeholder="Max Salary"
              value={form.salaryMax}
              onChange={(e) => handleChange("salaryMax", e.target.value)}
              className="w-full border rounded-lg pl-10 p-3 outline-none"
            />
          </div>

          <select
            value={form.currency}
            onChange={(e) => handleChange("currency", e.target.value)}
            className="border rounded-lg bg-zinc-900 text-white p-3 outline-none"
          >
            <option value="BDT">BDT</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        {/* Remote Toggle */}
        <div className="border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Remote Job</h3>
              <p className="text-sm text-gray-500">
                Allow candidates to work remotely
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleChange("remote", !form.remote)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                form.remote ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                  form.remote ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {!form.remote && (
          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Location"
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className={`w-full border rounded-lg pl-10 p-3 outline-none ${
                errors.location ? "border-red-500" : ""
              }`}
            />
          </div>
        )}

        {/* Deadline */}
        <div className="relative">
          <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          <input
            type="date"
            value={form.deadline}
            onChange={(e) => handleChange("deadline", e.target.value)}
            className={`w-full border rounded-lg pl-10 p-3 outline-none ${
              errors.deadline ? "border-red-500" : ""
            }`}
          />
        </div>
      </div>

      {/* Job Description */}
      <div className="border rounded-xl p-5 shadow-sm space-y-5">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <ListChecks className="w-5 h-5" />
          Job Description
        </h2>

        <textarea
          rows={5}
          placeholder="Responsibilities"
          value={form.responsibilities}
          onChange={(e) => handleChange("responsibilities", e.target.value)}
          className={`w-full border rounded-lg p-3 outline-none ${
            errors.responsibilities ? "border-red-500" : ""
          }`}
        />

        <textarea
          rows={5}
          placeholder="Requirements"
          value={form.requirements}
          onChange={(e) => handleChange("requirements", e.target.value)}
          className={`w-full border rounded-lg p-3 outline-none ${
            errors.requirements ? "border-red-500" : ""
          }`}
        />

        <textarea
          rows={4}
          placeholder="Benefits"
          value={form.benefits}
          onChange={(e) => handleChange("benefits", e.target.value)}
          className="w-full border rounded-lg p-3 outline-none"
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          {loading ? "Publishing..." : "Publish Job"}
        </button>
      </div>
    </div>
  );
}