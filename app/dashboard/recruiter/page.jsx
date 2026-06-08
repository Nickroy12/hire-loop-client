

import { auth } from "@/lib/auth";
import { useSession } from "@/lib/auth-client";
import JobTable from "@/ui/JobTable";
import StatsGrid from "@/ui/StateGrid";
import { headers } from "next/headers";

const Page = async() => {
const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="w-10/12  mx-auto space-y-3">
      <h1 className="text-5xl text-center font-bold">
        Welcome Back! {session?.user?.name}
      </h1>

      <p>{session?.user?.email}</p>

      <StatsGrid />
      <JobTable  />
    </div>
  );
};

export default Page;