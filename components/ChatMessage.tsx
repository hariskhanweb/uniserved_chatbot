'use client'

interface ChatMessageProps {
  message: string
  isUser: boolean
  timestamp?: string
}

export default function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2 group`}>
      <div
        className={`max-w-[65%] sm:max-w-[70%] px-3 py-2 ${
          isUser
            ? 'bg-[#005C4B] text-white rounded-lg rounded-tr-none'
            : 'bg-[#202C33] text-white rounded-lg rounded-tl-none'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap wrap-break-word mb-0.5">{message}</p>
        {timestamp && (
          <div className="flex items-center justify-end mt-1">
            <span
              className={`text-[0.6875rem] lowercase ${
                isUser ? 'text-white/60' : 'text-white/50'
              }`}
            >
              {timestamp}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
