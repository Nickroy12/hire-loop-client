import { getJob } from "@/lib/api/job";
import JobFilter from "@/ui/JobFilter";


const JobPage = async () => {
  const jobs = await getJob();

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            Available Positions
          </h1>
          <p className="text-neutral-500">
            Explore the latest opportunities in Dhaka
          </p>
        </header>

        <JobFilter jobs={jobs} />
      </div>
    </div>
  );
};

export default JobPage;