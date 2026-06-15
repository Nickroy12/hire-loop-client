"use client"
import Link from 'next/link';
import React, { useState } from 'react';

export default function PricingComponentDark() {
  const [activeTab, setActiveTab] = useState('seekers');

  const seekerPlans = [
    {
      name: 'Free',
      id: "seeker_free",
      price: '$0',
      period: '/forever',
      features: [
        'Browse & save up to 10 jobs',
        'Apply to up to 3 jobs per month',
        'Basic profile',
        'Email alerts'
      ],
      buttonText: 'Get Started',
      isPopular: false
    },
    {
      name: 'Pro',
       id: "seeker_pro",
      price: '$19',
      period: '/month',
      features: [
        'Apply to up to 30 jobs per month',
        'Unlimited saved jobs',
        'Application tracking',
        'Salary insights'
      ],
      buttonText: 'Upgrade to Pro',
      isPopular: true
    },
    {
      name: 'Premium',
       id: "seeker_premium",
      price: '$39',
      period: '/month',
      subText: 'Everything in Pro, plus:',
      features: [
        'Unlimited applications',
        'Profile boost to recruiters',
        'Early access to new jobs',
        'Priority support'
      ],
      buttonText: 'Go Premium',
      isPopular: false
    }
  ];

  const recruiterPlans = [
    {
      name: 'Free',
       id: "recruiter_free",
      price: '$0',
      period: '/forever',
      subText: "Great for a company's first year of hiring",
      features: [
        'Up to 3 active job posts',
        'Basic applicant management',
        'Standard listing visibility'
      ],
      buttonText: 'Start Free',
      isPopular: false
    },
    {
      name: 'Growth',
      id: "recruiter_growth",
      price: '$49',
      period: '/month',
      features: [
        'Up to 10 active job posts',
        'Applicant tracking',
        'Basic analytics',
        'Email support'
      ],
      buttonText: 'Choose Growth',
      isPopular: true
    },
    {
      name: 'Enterprise',
      id: "recruiter_enterprise",
      price: '$149',
      period: '/month',
      features: [
        'Up to 50 active job posts',
        'Advanced analytics dashboard',
        'Featured job listings',
        'Team collaboration & Custom branding',
        'Priority support'
      ],
      buttonText: 'Contact Sales',
      isPopular: false
    }
  ];

  const currentPlans = activeTab === 'seekers' ? seekerPlans : recruiterPlans;
  const isBlue = activeTab === 'seekers';

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
            Fair, transparent pricing
          </h2>
          <p className="mt-4 text-xl text-slate-400">
            Choose the plan that fits your goals, whether you're looking for your next role or your next hire.
          </p>

          {/* Dark Mode Toggle Tabs */}
          <div className="mt-8 inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('seekers')}
              className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none ${
                isBlue
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              For Job Seekers
            </button>
            <button
              onClick={() => setActiveTab('recruiters')}
              className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none ${
                !isBlue
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              For Recruiters
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 sm:max-w-md lg:max-w-none mx-auto">
          {currentPlans.map((plan, index) => {
            return (
              <div
                key={index}
                className={`bg-slate-900 border rounded-2xl p-8 flex flex-col justify-between relative shadow-xl transition-all duration-300 ${
                  plan.isPopular
                    ? isBlue 
                      ? 'border-2 border-blue-500 shadow-blue-950/50' 
                      : 'border-2 border-indigo-500 shadow-indigo-950/50'
                    : 'border-slate-800'
                }`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <span className={`absolute top-0 right-6 transform -translate-y-1/2 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                    isBlue ? 'bg-blue-500' : 'bg-indigo-500'
                  }`}>
                    {isBlue ? 'Most Popular' : 'Scale Up'}
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide">{plan.name}</h3>
                  <p className="mt-4 flex items-baseline text-white">
                    <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                    <span className="ml-1 text-xl font-medium text-slate-400">{plan.period}</span>
                  </p>
                  
                  {plan.subText && (
                    <p className={`text-xs mt-3 ${
                      plan.name === 'Free' 
                        ? 'italic text-slate-400' 
                        : isBlue ? 'font-semibold uppercase text-blue-400' : 'font-semibold uppercase text-indigo-400'
                    }`}>
                      {plan.subText}
                    </p>
                  )}

                  <ul className="mt-6 space-y-4 text-sm text-slate-300">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <span className={`mr-2 font-bold ${
                          plan.isPopular 
                            ? isBlue ? 'text-blue-400' : 'text-indigo-400' 
                            : 'text-emerald-400'
                        }`}>
                          ✓
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
    <form action="/api/checkout_sessions" method="POST">
    <input type="hidden" name='plan_id' value={plan.id} />
      <section>
        <button      className={`mt-8 w-full font-semibold py-3 px-4 text-center rounded-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                    plan.isPopular
                      ? isBlue
                        ? 'bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-500 shadow-lg shadow-blue-600/20'
                        : 'bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-500 shadow-lg shadow-indigo-600/20'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700 focus:ring-slate-600'
                  }`} type="submit" role="link">
          {plan.buttonText}
        </button>
      </section>
    </form>
                {/* <Link href={'/signup'}
                  className={`mt-8 w-full font-semibold py-3 px-4 text-center rounded-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                    plan.isPopular
                      ? isBlue
                        ? 'bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-500 shadow-lg shadow-blue-600/20'
                        : 'bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-500 shadow-lg shadow-indigo-600/20'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700 focus:ring-slate-600'
                  }`}
                >
                  {plan.buttonText}
                </Link> */}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}