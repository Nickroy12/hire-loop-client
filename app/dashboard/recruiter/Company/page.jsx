import React from 'react'
import CompanyProfile from './CompanyProfile'
import { getUserSession } from '@/lib/core/session'

const CompanyPage = async () => {
  const user = await getUserSession()
  console.log(user , "User in company page");
  return (
    
        <CompanyProfile recruiter={user} />
    
  )
}

export default CompanyPage