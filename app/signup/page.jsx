"use client";

import { useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Upload } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation"; // Fixed import here

export default function SignupPage() {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const searchParams = useSearchParams();
  const router = useRouter(); // Works correctly now
  const redirectTo = searchParams.get("redirect") || "/";

  const handleChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

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

    if (!data.success) {
      throw new Error("Image upload failed");
    }

    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData(e.currentTarget);

      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const role = formData.get("role");
      const imageFile = formData.get("image");

      let imageUrl = "";

      // Ensure a file was actually selected before trying to upload
      if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadToImgBB(imageFile);
      }

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: imageUrl,
        role,
      });

      if (error) {
        alert(error.message || "Signup failed");
        return;
      }

      alert("Account created successfully!");
      
      // Redirect the user to the requested page or home
      router.push(redirectTo);
      
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-10">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-8 text-white">
        <h2 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h2>

        <p className="text-center text-white/60 mb-8">
          Join as a Job Seeker or Recruiter
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-3">
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
              className="w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-purple-500 bg-white/5 flex items-center justify-center cursor-pointer hover:border-purple-400 transition"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Upload size={24} />
              )}
            </div>

            <p className="text-sm text-white/60">
              Upload Profile Photo
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label className="block mb-2 text-sm">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                required
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/20 outline-none focus:border-purple-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm">
                Email
              </label>

              <input
                type="email"
                name="email"
                required
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/20 outline-none focus:border-purple-500"
              />
            </div>

            {/* Password */}
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm">
                Password
              </label>

              <input
                type="password"
                name="password"
                required
                placeholder="********"
                className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/20 outline-none focus:border-purple-500"
              />
            </div>

            {/* Role */}
            <div className="md:col-span-2">
              <label className="block mb-3 text-sm">
                Select Your Role
              </label>

              <div className="grid md:grid-cols-2 gap-4">
                <label className="cursor-pointer rounded-xl border border-white/20 bg-black/30 p-5 hover:border-purple-500 transition">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="role"
                      value="seeker"
                      defaultChecked
                      className="accent-purple-500"
                    />

                    <div>
                      <h4 className="font-semibold">
                        Job Seeker
                      </h4>

                      <p className="text-sm text-white/60">
                        Looking for job opportunities
                      </p>
                    </div>
                  </div>
                </label>

                <label className="cursor-pointer rounded-xl border border-white/20 bg-black/30 p-5 hover:border-blue-500 transition">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="role"
                      value="recruiter"
                      className="accent-blue-500"
                    />

                    <div>
                      <h4 className="font-semibold">
                        Recruiter
                      </h4>

                      <p className="text-sm text-white/60">
                        Hire and manage candidates
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-white/60 text-sm mt-6">
          Already have an account?{" "}
          <Link
            href={`login?redirect=${redirectTo}`}
            className="text-purple-400 hover:text-purple-300"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}