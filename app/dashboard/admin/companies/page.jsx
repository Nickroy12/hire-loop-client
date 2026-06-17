import { getCompanies } from '@/lib/api/companies'
import React from 'react'
import CompaniesTable from './ComapnaiesTable'


const CompaniesPage = async() => {
   const companies = await  getCompanies()
  return (
    <div className='p-5 overflow-x-hidden'>
        <CompaniesTable initialCompanies={companies}/>
    </div>
  )
}

export default CompaniesPage