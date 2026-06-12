'use server'

import { serverMutation } from "../core/server"

export const createCompany = async(newCompany) =>{
    
    return await serverMutation('/api/company', newCompany)
}

// const baseUrl = process.env.NEXT_BASE_URL;

// export const createCompany = async (newCompany) => {

//     const res = await fetch(`${baseUrl}/api/company`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(newCompany)
//     });



//     return res.json();

// }