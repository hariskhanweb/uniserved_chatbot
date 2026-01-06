'use client'

import { useState } from 'react'

interface AccessCodeModalProps {
  isOpen: boolean
  onVerify: (phone: string, accessCode: string) => boolean
  onClose?: () => void
}

export default function AccessCodeModal({ isOpen, onVerify }: AccessCodeModalProps) {
  const [phone, setPhone] = useState('')
  const [accessCode, setAccessCode] = useState('')
  const [error, setError] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!phone.trim()) {
      setError('Please enter your phone number')
      return
    }

    if (!accessCode.trim()) {
      setError('Please enter your access code')
      return
    }

    setIsVerifying(true)
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      const isValid = onVerify(phone.trim(), accessCode.trim())
      setIsVerifying(false)
      
      if (!isValid) {
        setError('Invalid phone number or access code. Please try again.')
        setAccessCode('')
      }
    }, 500)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '') // Only allow digits
    if (value.length <= 15) {
      setPhone(value)
      setError('')
    }
  }

  const handleAccessCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessCode(e.target.value)
    setError('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
      <div className="bg-[#202C33] rounded-lg shadow-2xl w-full max-w-md mx-4 p-6 border border-[#2A3942]">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">Access Required</h2>
        </div>

        <p className="text-[#8696A0] text-sm mb-6">
          Please enter your phone number and access code to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Enter your phone number"
              className="w-full bg-[#2A3942] text-white placeholder-[#8696A0] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00A884] transition-all"
              disabled={isVerifying}
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="accessCode" className="block text-sm font-medium text-white mb-2">
              Access Code
            </label>
            <input
              id="accessCode"
              type="text"
              value={accessCode}
              onChange={handleAccessCodeChange}
              placeholder="Enter your access code"
              className="w-full bg-[#2A3942] text-white placeholder-[#8696A0] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00A884] transition-all"
              disabled={isVerifying}
            />
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-700/50 rounded-lg px-4 py-3 text-red-200 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isVerifying || !phone.trim() || !accessCode.trim()}
            className="w-full bg-[#00A884] text-white rounded-lg px-4 py-3 font-medium hover:bg-[#06CF9C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            {isVerifying ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Verifying...</span>
              </>
            ) : (
              <span>Verify & Continue</span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

