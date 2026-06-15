import { stripe } from '@/lib/stipe'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail },
    matadata
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <section className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 antialiased transition-colors duration-200">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/40 p-8 text-center border border-slate-100 dark:border-slate-800">
          
          {/* Success Icon Badge */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 mb-6">
            <svg 
              className="h-8 w-8 text-emerald-600 dark:text-emerald-400 animate-bounce" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            Thank you for your purchase!
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Your payment was processed successfully.
          </p>

          <hr className="border-slate-100 dark:border-slate-800 my-6" />

          {/* Information Block */}
          <div className="text-slate-600 dark:text-slate-300 space-y-4 text-sm text-left bg-slate-50 dark:bg-slate-950 p-4 rounded-xl mb-6 border border-transparent dark:border-slate-800/50">
            <p>
              A confirmation email has been sent to:{' '}
              <span className="font-semibold text-slate-800 dark:text-slate-100 break-all">{customerEmail}</span>
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Having trouble? Contact us at{' '}
              <a href="mailto:orders@example.com" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                orders@example.com
              </a>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link 
              href="/"
              className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium py-3 px-4 rounded-xl transition duration-200 shadow-md shadow-indigo-100 dark:shadow-none"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    )
  }
}