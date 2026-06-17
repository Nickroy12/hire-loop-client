import { serverFetch } from "../core/server"

export const getPlanById = async(planId)=>{
    console.log(planId , "Pk");
    return serverFetch(`/api/plans?plan_id=${planId}`)
}