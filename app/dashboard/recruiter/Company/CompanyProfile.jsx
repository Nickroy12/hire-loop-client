'use client'
import { createCompany } from '@/lib/action/company';
import React, { useState, useRef, useEffect } from 'react';

export default function CompanyProfile({recruiter , recruiterCompany}) {
  const [company, setCompany] = useState(recruiterCompany); 
  const [isLoading, setIsLoading] = useState(true); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const fileInputRef = useRef(null);

  // ইনপুট ফিল্ডের ইনিশিয়াল স্টেট
  const initialFormState = {
    name: '',
    industry: 'Technology',
    websiteUrl: '',
    location: '',
    employeeCount: '1-10 employees',
    logo: '',
    description: '',
    status: 'Pending',
    recruiterId: recruiter.id

  };

  const [formFields, setFormFields] = useState(initialFormState);

  // ✨ ১. পেজ লোড হওয়ার সময় ডাটা নিয়ে আসার লজিক
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch('/api/company'); 
        const result = await response.json();
        
        console.log("API Response Data:", result); // ডিবাগিং এর জন্য

        if (result) {
          // কন্ডিশন ১: রেসপন্স যদি সরাসরি একটি অ্যারে হয় [ {} ]
          if (Array.isArray(result) && result.length > 0) {
            setCompany(result[0]);
          } 
          // কন্ডিশন ২: রেসপন্সের ভেতরে যদি ডাটা অ্যারে আকারে থাকে { data: [ {} ] }
          else if (result.data && Array.isArray(result.data) && result.data.length > 0) {
            setCompany(result.data[0]);
          } 
          // কন্ডিশন ৩: রেসপন্স যদি সরাসরি অবজেক্ট হয় { name: '...', ... }
          else if (result.name || (result.data && !Array.isArray(result.data))) {
            setCompany(result.data || result);
          }
        }
      } catch (error) {
        console.error("Error fetching initial company data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  // মডাল ওপেন থাকা অবস্থায় ESC চাপলে মডাল ক্লোজ করার ট্রিক
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    if (isModalOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setFormFields((prev) => ({ ...prev, logo: result.data.url }));
      } else {
        alert('Image upload failed. Please verify your imgbb API Key.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Network error occurred during logo upload.');
    } finally {
      setIsUploading(false);
    }
  };

  // 🔥 ফিক্সড সাবমিট হ্যান্ডলার
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let cleanUrl = formFields.websiteUrl.trim();
    cleanUrl = cleanUrl.replace(/^(https?:\/\/)?(www\.)?/, ''); 

    const finalPayload = {
      ...formFields,
      websiteUrl: cleanUrl 
    };

    try {
      const result = await createCompany(finalPayload);
      console.log("Server Action Raw Result:", result); // ডিবাগিং লগ

      if (result) {
        // সার্ভার রেসপন্সের বিভিন্ন স্ট্রাকচার হ্যান্ডেল করা (result.data অথবা result নিজেই)
        const savedData = result.data || result.company || result;

        if (Array.isArray(savedData) && savedData.length > 0) {
          setCompany(savedData[0]);
        } else if (savedData && (savedData._id || savedData.id || savedData.name)) {
          setCompany(savedData);
        } else {
          // ফলব্যাক: সার্ভার যদি শুধু { success: true } পাঠায়, তবে আমাদের পাঠানো পে-লোডটিই স্টেটে সেট হবে
          setCompany(finalPayload);
        }

        setIsModalOpen(false);
        setIsEditing(false);
      } else {
        // যদি রেসপন্স একদম ফাঁকা আসে, তাও যেন স্টেট নাল না হয়, তাই লোকাল ডাটা সেট করা
        setCompany(finalPayload);
        setIsModalOpen(false);
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("An unexpected error occurred. Setting local state as fallback.");
      // ক্রাশ এড়াতে লোকাল ডাটা সেট করে দেওয়া হলো
      setCompany(finalPayload);
      setIsModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openRegisterModal = () => {
    setFormFields(initialFormState);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditMode = () => {
    if (!company) return;
    setFormFields({
      name: company.name || '',
      industry: company.industry || 'Technology',
      websiteUrl: company.websiteUrl || '',
      location: company.location || '',
      employeeCount: company.employeeCount || '1-10 employees',
      logo: company.logo || '',
      description: company.description || '',
      status: company.status || 'Pending'
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  console.log("Current Company State:", company);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-950/50 text-green-400 border-green-800/60';
      case 'Rejected': return 'bg-red-900/50 text-red-400 border-red-800/60';
      default: return 'bg-amber-950/50 text-amber-400 border-amber-800/60';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#09090b] text-zinc-400">
        <div className="animate-pulse text-sm">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-start justify-start font-sans bg-[#09090b] w-full">
      
      {/* STATE 1: কোনো কোম্পানি যখন রেজিস্টার করা নেই */}
      {!company?.name && (
        <div className="w-full max-w-5xl my-4 p-8 bg-zinc-900 border border-zinc-800 rounded-xl shadow-sm text-center mx-auto sm:mx-0">
          <div className="w-16 h-16 bg-blue-950/50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-900/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">No Company Registered</h2>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto text-sm">
            You haven't set up a company profile yet. Register your business to showcase details and track approval status.
          </p>
          <button
            onClick={openRegisterModal}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition shadow-sm"
          >
            Register Company
          </button>
        </div>
      )}

      {/* STATE 2: কোম্পানি কার্ড ভিউ */}
      {company?.name && (
        <div className="w-full max-w-2xl my-4 space-y-6 mx-auto sm:mx-0">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <h2 className="text-lg font-bold text-white">Company Profile</h2>
          </div>

          <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900 shadow-sm flex flex-col space-y-4 hover:border-zinc-700 transition">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4 overflow-hidden">
                {company.logo ? (
                  <img 
                    src={company.logo} 
                    alt="Company Logo" 
                    className="w-12 h-12 rounded-xl object-cover bg-zinc-950 border border-zinc-800 p-0.5 shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 bg-zinc-800 text-zinc-300 font-bold rounded-xl flex items-center justify-center text-lg shrink-0">
                    {company.name ? company.name.charAt(0).toUpperCase() : 'C'}
                  </div>
                )}
                <div className="overflow-hidden">
                  <h4 className="text-base font-bold text-white truncate">
                    {company.name || "Unnamed Company"}
                  </h4>
                  {company.websiteUrl && (
                    <a 
                      href={`https://${company.websiteUrl}`}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs text-blue-400 hover:underline inline-flex items-center mt-0.5 truncate max-w-[180px]"
                    >
                      {company.websiteUrl}
                      <svg className="w-2.5 h-2.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
              <span className={`px-2.5 py-0.5 text-[10px] font-semibold rounded-full border shrink-0 ${getStatusBadgeColor(company.status || 'Pending')}`}>
                {company.status || 'Pending'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-zinc-950 p-3 rounded-lg border border-zinc-800/60 text-center sm:text-left">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500">Industry</span>
                <span className="text-xs text-zinc-300 truncate block mt-0.5">
                  {company.industry || '—'}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500">Location</span>
                <span className="text-xs text-zinc-300 truncate block mt-0.5">
                  {company.location || '—'}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500">Size</span>
                <span className="text-xs text-zinc-300 truncate block mt-0.5">
                  {company.employeeCount ? company.employeeCount.split(' ')[0] : '—'}
                </span>
              </div>
            </div>

            <div className="flex-1">
              <p className="text-xs text-zinc-400 line-clamp-4 leading-relaxed whitespace-pre-line">
                {company.description || 'No description provided.'}
              </p>
            </div>

            <div className="pt-2 border-t border-zinc-800/60 flex justify-end">
              <button
                onClick={openEditMode}
                className="inline-flex items-center px-3 py-1.5 border border-zinc-700 shadow-sm text-xs font-medium rounded-lg text-zinc-300 bg-zinc-800 hover:bg-zinc-700 transition"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL COMPONENT --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-[520px] bg-[#121214] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden text-zinc-200">
            <div className="p-5 border-b border-zinc-800/60 flex items-start justify-between bg-[#161619]">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {isEditing ? `Update ${formFields.name || 'Company'} Details` : 'Register New Company'}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">Enter your business details to start parsing listings.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-5 space-y-4 bg-[#121214]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Company Name</label>
                  <input type="text" name="name" required placeholder="e.g. Acme Corp" value={formFields.name} onChange={handleInputChange} className="w-full bg-[#1a1a1e] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-700 transition" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Industry / Category</label>
                  <select name="industry" value={formFields.industry} onChange={handleInputChange} className="w-full bg-[#1a1a1e] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-700 transition cursor-pointer">
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="E-commerce">E-commerce</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Website URL</label>
                <div className="flex rounded-lg overflow-hidden border border-zinc-800 focus-within:border-zinc-700 transition">
                  <span className="bg-[#242429] text-zinc-400 px-3 py-2 text-xs flex items-center border-r border-zinc-800 select-none">https://</span>
                  <input type="text" name="websiteUrl" placeholder="example.com" value={formFields.websiteUrl} onChange={handleInputChange} className="w-full bg-[#1a1a1e] px-3 py-2 text-sm text-white focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Location</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <input type="text" name="location" placeholder="City, Country" value={formFields.location} onChange={handleInputChange} className="w-full bg-[#1a1a1e] border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-700 transition" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Employee Count</label>
                  <select name="employeeCount" value={formFields.employeeCount} onChange={handleInputChange} className="w-full bg-[#1a1a1e] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-700 transition cursor-pointer">
                    <option value="1-10 employees">1-10 employees</option>
                    <option value="11-50 employees">11-50 employees</option>
                    <option value="51-200 employees">51-200 employees</option>
                    <option value="201-500 employees">201-500 employees</option>
                    <option value="500+ employees">500+ employees</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Company Logo</label>
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" />
                  <div onClick={() => !isUploading && fileInputRef.current.click()} className="flex items-center space-x-3 bg-[#1a1a1e] border border-zinc-800 hover:border-zinc-700 rounded-lg p-2 cursor-pointer transition select-none">
                    <div className="w-9 h-9 bg-[#242429] text-zinc-300 rounded-md flex items-center justify-center border border-zinc-800 shrink-0">
                      {isUploading ? (
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : formFields.logo ? (
                        <img src={formFields.logo} alt="Thumb" className="w-full h-full object-cover rounded-md" />
                      ) : (
                        <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                      )}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-medium text-zinc-200">{formFields.logo ? 'Change Image' : 'Upload Image'}</p>
                      <p className="text-[10px] text-zinc-500">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Brief Description</label>
                <textarea name="description" rows="3" value={formFields.description} onChange={handleInputChange} placeholder="Tell us about your company's mission and values..." className="w-full bg-[#1a1a1e] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-700 transition resize-none"></textarea>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-zinc-800/60 bg-[#121214]">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition">Cancel</button>
                <button type="submit" disabled={isUploading || isSubmitting} className={`px-5 py-2 text-sm font-semibold rounded-lg bg-white text-black hover:bg-zinc-200 transition ${(isUploading || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Register Company'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}