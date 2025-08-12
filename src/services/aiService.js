import OpenAI from 'openai'

// Initialize OpenAI with environment variables
const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY || 'your-openai-api-key-here',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
})

export const useAIService = () => {
  const generateCaption = async (content, platform = 'twitter') => {
    try {
      const platformLimits = {
        twitter: 280,
        facebook: 2000,
        instagram: 2200,
        linkedin: 1300
      }

      const platformTips = {
        twitter: 'concise, engaging, and use relevant hashtags',
        facebook: 'conversational and encourage engagement',
        instagram: 'visual-focused with relevant hashtags',
        linkedin: 'professional and value-driven'
      }

      const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          {
            role: 'system',
            content: `You are a social media expert. Improve the given content for ${platform}. 
            Make it ${platformTips[platform]}. 
            Keep it under ${platformLimits[platform]} characters.
            Return only the improved content, no explanations.`
          },
          {
            role: 'user',
            content: content
          }
        ],
        max_tokens: 200,
        temperature: 0.7
      })

      return completion.choices[0].message.content.trim()
    } catch (error) {
      console.error('AI Service Error:', error)
      
      // Fallback improvements without AI
      const fallbackTips = {
        twitter: (text) => `${text} #SocialMedia #ContentCreator`,
        facebook: (text) => `${text}\n\nWhat do you think? Let me know in the comments! 👇`,
        instagram: (text) => `${text}\n\n#Content #Social #Creator #Inspiration`,
        linkedin: (text) => `${text}\n\nThoughts? Share your experience in the comments.`
      }
      
      return fallbackTips[platform] ? fallbackTips[platform](content) : content
    }
  }

  const suggestOptimalTime = (platform, timezone = 'UTC') => {
    // Best practice posting times by platform
    const optimalTimes = {
      twitter: { hour: 9, minute: 0 }, // 9 AM
      facebook: { hour: 13, minute: 0 }, // 1 PM
      instagram: { hour: 11, minute: 0 }, // 11 AM
      linkedin: { hour: 8, minute: 0 } // 8 AM
    }

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const optimal = optimalTimes[platform] || optimalTimes.twitter
    tomorrow.setHours(optimal.hour, optimal.minute, 0, 0)
    
    return tomorrow
  }

  return {
    generateCaption,
    suggestOptimalTime
  }
}