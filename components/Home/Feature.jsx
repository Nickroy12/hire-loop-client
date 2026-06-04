import React from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { GrSearchAdvanced } from "react-icons/gr";
import { LuUserSearch } from "react-icons/lu";

const Feature = () => {
  return (
    <div className="w-10/12 mx-auto py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 -mt-12 md:relative bottom-22">

        {/* Card 1 */}
        <div className="w-full rounded-3xl bg-gradient-to-t from-black to-gray-500 border border-violet-500 shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:scale-105 transition-all duration-300 p-6 space-y-12">
          <GrSearchAdvanced className="text-white text-2xl" />
      <div>
            <h1 className="text-6xl font-bold text-gray-300">10k +</h1>
            <h2 className="">Active User</h2>
      </div>
        </div>

        {/* Card 2 */}
        <div className="w-full rounded-3xl bg-gradient-to-t from-black to-gray-500 border border-violet-500 shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:scale-105 transition-all duration-300 p-6 space-y-12">
          <BsGraphUpArrow className="text-white text-2xl" />
      <div>
            <h1 className="text-6xl font-bold text-gray-300">760 +</h1>
            <h2 className="">Companies</h2>
      </div>
        </div>

        {/* Card 3 */}
        <div className="w-full rounded-3xl bg-gradient-to-t from-black to-gray-500 border border-violet-500 shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:scale-105 transition-all duration-300 p-6 space-y-12">
          <LuUserSearch className="text-white text-2xl" />
      <div>
            <h1 className="text-6xl font-bold text-gray-300">50k +</h1>
            <h2 className="">Job Seeker</h2>
      </div>
        </div>

      </div>
    </div>
  );
};

export default Feature;