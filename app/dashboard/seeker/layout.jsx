import { requireRole } from '@/lib/core/session'
import React from 'react'

const seekerLayout = async({children}) => {
   await  requireRole('seeker')
   return children
}

export default  seekerLayout