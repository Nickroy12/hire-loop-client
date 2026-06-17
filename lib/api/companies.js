import { serverFetch } from "../core/server"
import { getUserSession } from "../core/session"

export const getCompanies = async()=>{
  return serverFetch('/api/companies')
}

export const getRecruiterCompany = async(recruiterId)=>{
  return await serverFetch(`/api/company?recruiterId=${recruiterId}`)
}
export const getLoggedRecruiterCompany = async()=>{
   const user = await getUserSession()

   return getRecruiterCompany(user?.id)
}