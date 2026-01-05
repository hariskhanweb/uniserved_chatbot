import { Suspense } from 'react'
import type { Metadata } from 'next'
import ChatInterface from '@/components/ChatInterface'
import { CHATBOTS } from '@/lib/chatbots'

interface PageProps {
  searchParams: Promise<{ uuid?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  const uuid = params?.uuid
  const chatbot = uuid 
    ? CHATBOTS.find(c => c.uuid === uuid) || CHATBOTS[0]
    : CHATBOTS[0]

  const title = `${chatbot.name} | Uniserved`
  const description = chatbot.description || `Chat with ${chatbot.name} to get instant answers and support.`
  const url = uuid 
    ? `https://investor.uniserved.com/?uuid=${uuid}`
    : 'https://investor.uniserved.com'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Uniserved',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  }
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
