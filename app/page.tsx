import { Suspense } from 'react'
import type { Metadata } from 'next'
import ChatInterface from '@/components/ChatInterface'

// Static metadata for static export
// Dynamic metadata based on UUID is handled client-side in ChatInterface
export const metadata: Metadata = {
  title: 'Uniserved Chatbot | Uniserved',
  description: 'Chat with Uniserved chatbots to get instant answers and support.',
  openGraph: {
    title: 'Uniserved Chatbot | Uniserved',
    description: 'Chat with Uniserved chatbots to get instant answers and support.',
    url: 'https://investor.uniserved.com',
    siteName: 'Uniserved',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uniserved Chatbot | Uniserved',
    description: 'Chat with Uniserved chatbots to get instant answers and support.',
  },
  alternates: {
    canonical: 'https://investor.uniserved.com',
  },
}

export default function Home() {
  return (
    <main className="h-screen">
      <Suspense fallback={
        <div className="h-screen flex items-center justify-center bg-[#0B141A]">
          <div className="text-white">Loading...</div>
        </div>
      }>
        <ChatInterface />
      </Suspense>
    </main>
  )
}
