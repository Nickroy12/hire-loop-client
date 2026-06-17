"use server"

import { serverFetch } from "../core/server"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getJob = async()=>{
    return serverFetch('/api/jobs')
}
export const getJobById = async(jobId)=>{
    console.log(jobId , "JOB");
    return serverFetch(`/api/jobs/${jobId}`)
}
export const  getCompanyJob = async(companyId , status = "active")=>{
 const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`)
 return res.json()
}