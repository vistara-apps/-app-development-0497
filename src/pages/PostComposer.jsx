import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, Sparkles, Send, Image } from 'lucide-react'
import { usePostsStore } from '../stores/postsStore'
import { useAIService } from '../services/aiService'
import DatePicker from 'react-datepicker'
import toast from 'react-hot-toast'
import "react-datepicker/dist/react-datepicker.css"

export default function PostComposer() {
  const [content, setContent] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState(['twitter'])
  const [scheduledTime, setScheduledTime] = useState(new Date())
  const [isGenerating, setIsGenerating] = useState(false)
  const { addPost } = usePostsStore()
  const { generateCaption } = useAIService()
  const navigate = useNavigate()

  const platforms = [
    { id: 'twitter', name: 'Twitter', color: 'bg-blue-500', limit: 280 },
    { id: 'facebook', name: 'Facebook', color: 'bg-blue-600', limit: 2000 },
    { id: 'instagram', name: 'Instagram', color: 'bg-pink-500', limit: 2200 },
    { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-700', limit: 1300 }
  ]

  const handlePlatformToggle = (platformId) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    )
  }

  const handleAIAssist = async () => {
    if (!content.trim()) {
      toast.error('Please enter some content first')
      return
    }

    setIsGenerating(true)
    try {
      const improvedContent = await generateCaption(content, selectedPlatforms[0])
      setContent(improvedContent)
      toast.success('AI improved your caption!')
    } catch (error) {
      toast.error('AI assistance failed. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const getOptimalTime = () => {
    const now = new Date()
    // Suggest posting at 10 AM tomorrow for better engagement
    const optimal = new Date(now)
    optimal.setDate(optimal.getDate() + 1)
    optimal.setHours(10, 0, 0, 0)
    setScheduledTime(optimal)
    toast.success('Optimal time suggested based on best practices!')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!content.trim()) {
      toast.error('Please enter post content')
      return
    }
    
    if (selectedPlatforms.length === 0) {
      toast.error('Please select at least one platform')
      return
    }

    const post = {
      content: content.trim(),
      platforms: selectedPlatforms,
      scheduledTime: scheduledTime.toISOString(),
      mediaUrls: []
    }

    addPost(post)
    toast.success('Post scheduled successfully!')
    navigate('/calendar')
  }

  const getCharacterLimit = () => {
    if (selectedPlatforms.length === 0) return null
    const limits = selectedPlatforms.map(id => 
      platforms.find(p => p.id === id)?.limit || 280
    )
    return Math.min(...limits)
  }

  const characterLimit = getCharacterLimit()
  const isOverLimit = characterLimit && content.length > characterLimit

  return (
    <div className="max-w-4xl mx-auto px-container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create Post</h1>
        <p className="text-gray-300">Compose and schedule your social media content</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Content Input */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <label className="text-lg font-semibold text-white">Post Content</label>
            <button
              type="button"
              onClick={handleAIAssist}
              disabled={isGenerating || !content.trim()}
              className="btn-accent flex items-center text-sm"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isGenerating ? 'Generating...' : 'AI Assist'}
            </button>
          </div>
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind? Share your thoughts..."
            className={`textarea w-full min-h-32 ${isOverLimit ? 'border-red-500' : ''}`}
          />
          
          {characterLimit && (
            <div className="flex justify-between items-center mt-2 text-sm">
              <span className={`${isOverLimit ? 'text-red-400' : 'text-gray-400'}`}>
                {content.length}/{characterLimit} characters
              </span>
              {isOverLimit && (
                <span className="text-red-400">Content exceeds platform limits</span>
              )}
            </div>
          )}
        </div>

        {/* Platform Selection */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Select Platforms</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {platforms.map(platform => (
              <button
                key={platform.id}
                type="button"
                onClick={() => handlePlatformToggle(platform.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedPlatforms.includes(platform.id)
                    ? `${platform.color} border-white text-white`
                    : 'border-gray-600 text-gray-300 hover:border-gray-500'
                }`}
              >
                <div className="text-center">
                  <div className="font-semibold">{platform.name}</div>
                  <div className="text-xs mt-1 opacity-80">
                    {platform.limit} chars max
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Scheduling */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Schedule</h3>
            <button
              type="button"
              onClick={getOptimalTime}
              className="btn-secondary flex items-center text-sm"
            >
              <Clock className="w-4 h-4 mr-2" />
              Suggest Optimal Time
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <Calendar className="w-5 h-5 text-gray-400" />
            <DatePicker
              selected={scheduledTime}
              onChange={(date) => setScheduledTime(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              minDate={new Date()}
              className="input flex-1"
              placeholderText="Select date and time"
            />
          </div>
        </div>

        {/* Media Upload (Placeholder) */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Media</h3>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
            <Image className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-400 mb-2">Media upload coming soon</p>
            <p className="text-sm text-gray-500">
              Support for images and videos will be added in future updates
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isOverLimit || !content.trim() || selectedPlatforms.length === 0}
            className="btn-accent flex items-center"
          >
            <Send className="w-4 h-4 mr-2" />
            Schedule Post
          </button>
        </div>
      </form>
    </div>
  )
}