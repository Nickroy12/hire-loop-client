import React from 'react'
import CreateJobPage from './CreateJobPage'
import { getLoggedRecruiterCompany } from '@/lib/api/companies'

const page = async() => {
    const company = await getLoggedRecruiterCompany() 
  return (
   <CreateJobPage company={company}/>
  )
}

export default page