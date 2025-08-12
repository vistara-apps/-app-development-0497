import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Calendar, Home, PenTool, Settings, User, LogOut } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  if (!user) {
    return (
      <nav className="bg-surface border-b border-gray-700">
        <div className="max-w-screen-xl mx-auto px-container">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold text-accent">
              SocialSync AI
            </Link>
            <div className="flex space-x-4">
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-surface border-b border-gray-700">
      <div className="max-w-screen-xl mx-auto px-container">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="text-xl font-bold text-accent">
            SocialSync AI
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/dashboard" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                isActive('/dashboard') ? 'bg-primary text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              <Home size={20} />
              <span>Dashboard</span>
            </Link>
            
            <Link 
              to="/compose" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                isActive('/compose') ? 'bg-primary text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              <PenTool size={20} />
              <span>Compose</span>
            </Link>
            
            <Link 
              to="/calendar" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                isActive('/calendar') ? 'bg-primary text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              <Calendar size={20} />
              <span>Calendar</span>
            </Link>
            
            <Link 
              to="/settings" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                isActive('/settings') ? 'bg-primary text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              <Settings size={20} />
              <span>Settings</span>
            </Link>
            
            <div className="flex items-center space-x-2 pl-4 border-l border-gray-600">
              <div className="flex items-center space-x-2">
                <User size={20} className="text-gray-300" />
                <span className="text-sm text-gray-300">{user.email}</span>
              </div>
              <button 
                onClick={logout}
                className="text-gray-300 hover:text-white p-2 rounded-md transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}