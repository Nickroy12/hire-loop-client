import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const  PLAN_PRICE_ID = {
    seeker_pro:"price_1TiTDnGVnabdpjxR3GtyGmgB",
    seeker_premium : "price_1TiUAgGVnabdpjxR6NAsYXmZ",
    recruiter_growth:"price_1TiUCmGVnabdpjxRespw0HEy",
    recruiter_enterprise:"price_1TiUEBGVnabdpjxRptNzcTU4"
}