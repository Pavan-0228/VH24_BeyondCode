import React from 'react'

export function Button({ children, className, ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}