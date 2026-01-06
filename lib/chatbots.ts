export interface ChatbotConfig {
  id: string
  name: string
  uuid?: string
  endpoint: string
  description?: string
}

export const CHATBOTS: ChatbotConfig[] = [
  { 
    id: '1', 
    name: 'Uniserved Investor Chatbot', 
    endpoint: 'https://investor.uniserved.com/api/ask/',
    description: 'Get instant answers about Uniserved investments, financial reports, and investor relations.'
  },
  { 
    id: '2', 
    name: 'Uniserved Support Chatbot', 
    uuid: 'b2c3d4e5-f6a7-4890-b123-456789abcdef', 
    endpoint: 'https://investor.uniserved.com/api/ask/support/',
    description: 'Get help and support for your Uniserved account, services, and technical issues.'
  },
  { 
    id: '3', 
    name: 'Uniserved Sales Chatbot', 
    uuid: 'c3d4e5f6-a7b8-4901-c234-56789abcdef0', 
    endpoint: 'https://investor.uniserved.com/api/ask/sales/',
    description: 'Learn about Uniserved products, pricing, and how to get started with our services.'
  },
  { 
    id: '4', 
    name: 'Uniserved Help Chatbot', 
    uuid: 'd4e5f6a7-b8c9-4012-d345-6789abcdef01', 
    endpoint: 'https://investor.uniserved.com/api/ask/help/',
    description: 'Find answers to common questions and get assistance with Uniserved services.'
  },
  { 
    id: '5', 
    name: 'Uniserved General Chatbot', 
    uuid: 'e5f6a7b8-c9d0-4123-e456-789abcdef012', 
    endpoint: 'https://investor.uniserved.com/api/ask/general/',
    description: 'Ask general questions about Uniserved, our services, and how we can help you.'
  },
  { 
    id: '6', 
    name: 'Uniserved Customer Chatbot', 
    uuid: 'f6a7b8c9-d0e1-4234-f567-89abcdef0123', 
    endpoint: 'https://investor.uniserved.com/api/ask/customer/',
    description: 'Customer support and assistance for all your Uniserved needs.'
  },
]


