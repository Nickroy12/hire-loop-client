"use client";

import { useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Upload } from "lucide-react";

export default function SignupPage() {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  // preview
  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  // upload to imgbb
  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    if (!data.success) throw new Error("Upload failed");

    return data.data.url;
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const imageFile = formData.get("image");

    let imageUrl = "";

    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadToImgBB(imageFile);
    }

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: imageUrl,
      callbackURL: "/",
    });

    if (error) {
      alert(error.message || "Signup failed");
      return;
    }

    alert("Signup successful!");
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      
      {/* Card */}
      <div className="w-full max-w-2xl p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white">

        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Avatar */}
            <div className="md:col-span-2 flex flex-col items-center gap-3">

              <input
                ref={inputRef}
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />

              <div
                onClick={() => inputRef.current?.click()}
                className="w-16 h-16 rounded-full border border-dashed border-purple-400 bg-white/10 flex items-center justify-center cursor-pointer overflow-hidden"
              >
                {preview ? (
                  <img
                    src={preview}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Upload size={18} />
                )}
              </div>

              <span className="text-xs text-white/60">
                Upload profile image
              </span>
            </div>

            {/* Name */}
            <div>
              <label className="text-sm mb-2 block">Name</label>
              <input
                name="name"
                type="text"
                required
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm mb-2 block">Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="email@example.com"
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Password */}
            <div className="md:col-span-2">
              <label className="text-sm mb-2 block">Password</label>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-white/60 mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-400">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}