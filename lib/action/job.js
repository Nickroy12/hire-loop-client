"use server"
const baseUrl = process.env.NEXT_BASE_URL
export const getJobData = async(newJob) =>{
 const res = await fetch(`${baseUrl}/api/jobs`,{
    method: 'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:  JSON.stringify(newJob)
 })
 return res.json()
}