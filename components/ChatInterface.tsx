'use client'

import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import ChatMessage from './ChatMessage'
import { CHATBOTS } from '@/lib/chatbots'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: string
}

export default function ChatInterface() {
  const searchParams = useSearchParams()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  
  // Get UUID from URL parameter and find matching chatbot
  const uuidFromUrl = searchParams.get('uuid')
  const selectedChatbot = uuidFromUrl 
    ? CHATBOTS.find(chatbot => chatbot.uuid === uuidFromUrl) || CHATBOTS[0]
    : CHATBOTS[0]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const getCurrentTime = () => {
    const timeString = new Date().toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    })
    // Convert to lowercase am/pm format
    return timeString.toLowerCase()
  }

  // Initialize welcome message only on client to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true)
    // Clear messages when chatbot changes (UUID in URL changes)
    setMessages([])
    // Show welcome message after 2 seconds
    const timer = setTimeout(() => {
      setMessages([
        {
          id: '1',
          text: 'Hello! How can I help you today?',
          isUser: false,
          timestamp: getCurrentTime(),
        },
      ])
    }, 2000)

    return () => clearTimeout(timer)
  }, [uuidFromUrl])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: getCurrentTime(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch(selectedChatbot.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: input }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Server error:', response.status, errorText)
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.answer,
        isUser: false,
        timestamp: getCurrentTime(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: getCurrentTime(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#0B141A]">
      {/* Header */}
      <div className="bg-[#202C33] text-white px-4 py-3 shadow-lg border-b border-[#2A3942]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
            <Image
              src="/logo-icon.png"
              alt="Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-medium truncate">{selectedChatbot.name}</h1>
            <p className="text-xs text-[#8696A0]">Online</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div 
        className="flex-1 overflow-y-auto px-4 py-6 bg-[#0B141A] relative"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23111B21' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {isMounted && messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-[#202C33] rounded-lg rounded-tl-none px-4 py-2.5 shadow-lg max-w-[70%]">
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 bg-[#8696A0] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-[#8696A0] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-[#8696A0] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-[#202C33] px-4 py-3 border-t border-[#2A3942]">
        <div className="flex items-start space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message"
              className="w-full resize-none bg-[#2A3942] text-white placeholder-[#8696A0] rounded-lg px-4 py-2.5 pr-12 focus:outline-none focus:ring-1 focus:ring-[#00A884] max-h-32 min-h-11 text-sm"
              rows={1}
              disabled={isLoading}
            />
          </div>
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="bg-[#00A884] text-white rounded-full p-3 hover:bg-[#06CF9C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 shadow-lg"
              aria-label="Send message"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
        </div>
      </div>
    </div>
  )
}
