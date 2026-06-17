import React from 'react';
import Link from 'next/link';

const Unauthorized = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md text-center bg-gray-900 p-8 rounded-xl shadow-2xl shadow-gray-950/50 border border-gray-800">
        {/* Warning Icon - Shield with Exclamation */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-950/50 mb-6 border border-red-800">
          <svg className="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
          </svg>
        </div>

        {/* Content */}
        <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          403 - Forbidden Access
        </h1>
        <p className="mt-4 text-base text-gray-400">
          Oops! You don't have permission to access this restricted area. Make sure your account has the required access levels or contact support.
        </p>

        {/* Action Link */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex w-full justify-center rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-900/30 hover:bg-red-500 text-center transition-all duration-200 active:scale-[0.98]"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;