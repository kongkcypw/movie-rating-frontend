import React from 'react'

const LoadingAnimation: React.FC = ({}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500">
        </div>
    </div>
  )
}

export default LoadingAnimation