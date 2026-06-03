import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-12 mt-20">
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & Description */}
        <div>
          <h1 className="text-white text-2xl font-bold">
            hire<span className="text-blue-500">loop</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed">
            The AI-driven platform that helps people find perfect jobs and build career growth with ease.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-5">
            <a className="p-2 bg-gray-900 rounded-full hover:bg-blue-600 transition">
              <FaFacebookF />
            </a>
            <a className="p-2 bg-gray-900 rounded-full hover:bg-pink-600 transition">
              <FaInstagram />
            </a>
            <a className="p-2 bg-gray-900 rounded-full hover:bg-blue-500 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-white font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Job Search</li>
            <li className="hover:text-white cursor-pointer">AI Resume</li>
            <li className="hover:text-white cursor-pointer">Companies</li>
            <li className="hover:text-white cursor-pointer">Salary Guide</li>
          </ul>
        </div>

        {/* Navigators */}
        <div>
          <h3 className="text-white font-semibold mb-4">Navigators</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Browse Jobs</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
            <li className="hover:text-white cursor-pointer">About</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Blog</li>
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">
        © {new Date().getFullYear()} Hireloop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;