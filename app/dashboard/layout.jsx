import DashboardSidebar from '@/ui/DashboardSidebar'
import React from 'react'

const layout = ({children}) => {
  return (
    <div className='  flex'>
        <DashboardSidebar/>
       {children}
    </div>
  )
}

export default layout