'use client'

import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface AttemptsModalProps {
  attempts: number;
  onClose: () => void;
}

export default function AttemptsModal({ attempts, onClose }: AttemptsModalProps) {
  const router = useRouter()

  const maxAttempts = 3
  const remainingAttempts = maxAttempts - attempts

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  const handleOk = () => {
    onClose();
    router.push('/login');
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      {/* Full screen background overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      
      <div className="relative z-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
          {remainingAttempts > 0 ? 'Free Attempts Remaining' : 'No Attempts Left'}
        </h2>
        {remainingAttempts > 0 ? (
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You have {remainingAttempts} out of 3 free attempts left.
          </p>
        ) : (
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You have used all your free attempts. Please log in to continue using the app.
          </p>
        )}
        <div className="flex justify-center space-x-4">
          {remainingAttempts > 0 ? (
            <Button onClick={onClose}>Ok</Button>
          ) : (
            <Button onClick={handleOk}>Login / Sign up</Button>
          )}
        </div>
      </div>
    </div>
  )
}
