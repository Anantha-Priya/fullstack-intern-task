import { useState } from 'react'

export default function PasswordInput({ wrapperClassName = '', ...props }) {
  const [show, setShow] = useState(false)

  return (
    <div className={`relative ${wrapperClassName}`}>
      <input
        {...props}
        type={show ? 'text' : 'password'}
        className="w-full rounded border p-2 pr-10"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        aria-label={show ? 'Hide password' : 'Show password'}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
      >
        {show ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.1A9.8 9.8 0 0112 4.5c4.6 0 8.6 3 10 7.2a1 1 0 010 .6 10.5 10.5 0 01-4.1 5.2M6.6 6.6A10.5 10.5 0 002 11.7a1 1 0 000 .6c1.4 4.2 5.4 7.2 10 7.2 1.8 0 3.4-.4 4.9-1.2" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 12.3a1 1 0 010-.6C3.4 7.5 7.4 4.5 12 4.5s8.6 3 10 7.2a1 1 0 010 .6c-1.4 4.2-5.4 7.2-10 7.2s-8.6-3-10-7.2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  )
}