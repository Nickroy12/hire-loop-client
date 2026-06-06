"use client";

import {
  Briefcase,
  Users,
  Zap,
  CheckCircle,
} from "lucide-react";

const iconMap = {
  Briefcase,
  Users,
  Zap,
  CheckCircle,
};

// ✅ Data inside component (no external file needed)
const statsData = [
  {
    id: 1,
    title: "Total Job Posts",
    value: 48,
    icon: "Briefcase",
  },
  {
    id: 2,
    title: "Total Applicants",
    value: 1284,
    icon: "Users",
  },
  {
    id: 3,
    title: "Active Jobs",
    value: 18,
    icon: "Zap",
  },
  {
    id: 4,
    title: "Jobs Closed",
    value: 32,
    icon: "CheckCircle",
  },
];

export default function StatsGrid() {
  return (
    <div className=" w-10/12 mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((item) => {
        const Icon = iconMap[item.icon];

        return (
          <div
            key={item.id}
            className="rounded-xl border border-gray-800 bg-[#0f0f0f] p-5 shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{item.title}</p>
                <h2 className="text-2xl font-bold text-white mt-1">
                  {item.value}
                </h2>
              </div>

              <div className="p-3 rounded-lg bg-gray-900">
                <Icon className="text-white w-5 h-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}