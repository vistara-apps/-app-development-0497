import React from 'react'
import { Link } from 'react-router-dom'
import { Plus, Calendar, BarChart3, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { usePostsStore } from '../stores/postsStore'
import { useAuthStore } from '../stores/authStore'
import { format } from 'date-fns'

export default function Dashboard() {
  const { posts } = usePostsStore()
  const { user } = useAuthStore()
  
  const scheduledPosts = posts.filter(post => post.status === 'scheduled')
  const publishedPosts = posts.filter(post => post.status === 'published')
  const recentPosts = posts.slice(-5).reverse()

  const stats = [
    {
      title: "Scheduled Posts",
      value: scheduledPosts.length,
      icon: <Clock className="w-6 h-6" />,
      color: "text-blue-400"
    },
    {
      title: "Published Today",
      value: publishedPosts.filter(post => 
        format(new Date(post.scheduledTime), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
      ).length,
      icon: <CheckCircle className="w-6 h-6" />,
      color: "text-green-400"
    },
    {
      title: "Total Posts",
      value: posts.length,
      icon: <BarChart3 className="w-6 h-6" />,
      color: "text-purple-400"
    },
    {
      title: "Connected Accounts",
      value: user.connectedAccounts.length,
      icon: <AlertCircle className="w-6 h-6" />,
      color: "text-orange-400"
    }
  ]

  return (
    <div className="max-w-screen-xl mx-auto px-container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-300">Welcome back! Here's your social media overview.</p>
        </div>
        <Link to="/compose" className="btn-accent flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Create Post
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={stat.color}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="card">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link to="/compose" className="flex items-center p-3 bg-surface/50 rounded-md hover:bg-surface transition-colors">
              <Plus className="w-5 h-5 text-accent mr-3" />
              <span className="text-white">Create New Post</span>
            </Link>
            <Link to="/calendar" className="flex items-center p-3 bg-surface/50 rounded-md hover:bg-surface transition-colors">
              <Calendar className="w-5 h-5 text-blue-400 mr-3" />
              <span className="text-white">View Calendar</span>
            </Link>
            <Link to="/settings" className="flex items-center p-3 bg-surface/50 rounded-md hover:bg-surface transition-colors">
              <AlertCircle className="w-5 h-5 text-orange-400 mr-3" />
              <span className="text-white">Connect Social Accounts</span>
            </Link>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Posts</h3>
          {recentPosts.length > 0 ? (
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <div key={post.id} className="p-3 bg-surface/50 rounded-md">
                  <p className="text-white text-sm mb-2 line-clamp-2">
                    {post.content.substring(0, 100)}...
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>
                      {format(new Date(post.scheduledTime), 'MMM dd, HH:mm')}
                    </span>
                    <span className={`px-2 py-1 rounded-full ${
                      post.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' :
                      post.status === 'published' ? 'bg-green-500/20 text-green-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No posts yet. Create your first post!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}