import React, { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth } from 'date-fns'
import { ChevronLeft, ChevronRight, Clock, Edit, Trash2 } from 'lucide-react'
import { usePostsStore } from '../stores/postsStore'
import toast from 'react-hot-toast'

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const { posts, deletePost } = usePostsStore()

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getPostsForDate = (date) => {
    return posts.filter(post => 
      isSameDay(new Date(post.scheduledTime), date)
    )
  }

  const selectedDatePosts = getPostsForDate(selectedDate)

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(postId)
      toast.success('Post deleted successfully')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500'
      case 'published': return 'bg-green-500'
      case 'failed': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="max-w-screen-xl mx-auto px-container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Content Calendar</h1>
        <p className="text-gray-300">View and manage your scheduled posts</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <div className="card">
            {/* Calendar Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={previousMonth}
                  className="p-2 text-gray-400 hover:text-white rounded-md hover:bg-surface transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 text-gray-400 hover:text-white rounded-md hover:bg-surface transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Day Labels */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-3 text-center text-sm font-medium text-gray-400">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map(day => {
                const dayPosts = getPostsForDate(day)
                const isSelected = isSameDay(day, selectedDate)
                const isCurrentMonth = isSameMonth(day, currentDate)

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    className={`p-3 min-h-20 text-left border border-gray-700 rounded-md transition-colors ${
                      isSelected ? 'bg-primary border-primary' :
                      !isCurrentMonth ? 'text-gray-600 bg-gray-800/50' :
                      'hover:bg-surface'
                    }`}
                  >
                    <div className={`text-sm font-medium ${
                      isSelected ? 'text-white' :
                      !isCurrentMonth ? 'text-gray-600' :
                      'text-gray-300'
                    }`}>
                      {format(day, 'd')}
                    </div>
                    {dayPosts.length > 0 && (
                      <div className="mt-1 space-y-1">
                        {dayPosts.slice(0, 2).map(post => (
                          <div
                            key={post.id}
                            className={`w-full h-1 rounded-full ${getStatusColor(post.status)}`}
                          />
                        ))}
                        {dayPosts.length > 2 && (
                          <div className="text-xs text-gray-400">
                            +{dayPosts.length - 2} more
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Posts for Selected Date */}
        <div className="lg:col-span-1">
          <div className="card sticky top-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              {format(selectedDate, 'MMMM d, yyyy')}
            </h3>

            {selectedDatePosts.length > 0 ? (
              <div className="space-y-4">
                {selectedDatePosts.map(post => (
                  <div key={post.id} className="p-4 bg-surface/50 rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">
                          {format(new Date(post.scheduledTime), 'HH:mm')}
                        </span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        post.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' :
                        post.status === 'published' ? 'bg-green-500/20 text-green-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {post.status}
                      </span>
                    </div>
                    
                    <p className="text-white text-sm mb-3 line-clamp-3">
                      {post.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        {post.platforms.map(platform => (
                          <span
                            key={platform}
                            className="px-2 py-1 bg-surface rounded text-xs text-gray-300 capitalize"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeletePost(post.id)}
                          className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No posts scheduled for this date</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}