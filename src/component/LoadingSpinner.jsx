import React from 'react'

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-black"></div>
      </div>
    </div>
  )
}

export default LoadingSpinner