import { serverFetch } from "../core/server"

const baseUrl = process.env.NEXT_BASE_URL

export const getRecruiterCompany = async(recruiterId)=>{
  return serverFetch(`/api/company?recruiterId=${recruiterId}`)
}