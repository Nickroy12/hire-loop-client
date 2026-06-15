import { serverMutation } from "../core/server"

export const applicantSub = async(applicantData) =>{
    return serverMutation('/api/applications' , applicantData)
}