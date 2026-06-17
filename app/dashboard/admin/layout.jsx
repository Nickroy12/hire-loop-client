import { requireRole } from '@/lib/core/session'
import React from 'react'

const AdminHomeLayout = async({children}) => {
    await requireRole('admin')
  return children
}

export default AdminHomeLayout