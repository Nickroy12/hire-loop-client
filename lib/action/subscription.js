import { serverMutation } from "../core/server"

export const setSubscription = async(subData) =>{
    return serverMutation('/api/subscriptions' , subData)
}