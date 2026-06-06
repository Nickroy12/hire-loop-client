"use client";

import { useSession } from "@/lib/auth-client";
import StatsGrid from "@/ui/StateGrid";
import React from "react";

const Page = () => {
  const { data: session, isPending } = useSession();



  return (
    <div className="w-11/12 text-center mx-auto space-y-3 ">
      <h1 className="text-5xl  font-bold">
        Welcome Back! {session?.user?.name}
      </h1>

      <p>{session?.user?.email}</p>
      <StatsGrid/>
    </div>
  );
};

export default Page;