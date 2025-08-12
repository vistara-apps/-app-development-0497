import React, { useState } from 'react'
import { Link2, Twitter, Facebook, Instagram, Linkedin, Plus, CheckCircle, AlertCircle } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'

export default function Settings() {
  const { user, updateUser } = useAuthStore()
  const [activeTab, setActiveTab] = useState('accounts')

  const socialPlatforms = [
    {
      id: 'twitter',
      name: 'Twitter',
      icon: <Twitter className="w-6 h-6" />,
      color: 'text-blue-400',
      description: 'Connect your Twitter account to schedule tweets'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <Facebook className="w-6 h-6" />,
      color: 'text-blue-600',
      description: 'Connect your Facebook page to schedule posts'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <Instagram className="w-6 h-6" />,
      color: 'text-pink-500',
      description: 'Connect your Instagram account to schedule posts'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <Linkedin className="w-6 h-6" />,
      color: 'text-blue-700',
      description: 'Connect your LinkedIn profile to schedule posts'
    }
  ]

  const handleConnectAccount = (platformId) => {
    // Mock connection - in real app, implement OAuth flow
    const updatedAccounts = [...user.connectedAccounts, {
      id: Date.now().toString(),
      platform: platformId,
      username: `user_${platformId}`,
      connectedAt: new Date().toISOString()
    }]
    
    updateUser({
      ...user,
      connectedAccounts: updatedAccounts
    })
    
    toast.success(`${platformId} account connected successfully!`)
  }

  const handleDisconnectAccount = (accountId) => {
    const updatedAccounts = user.connectedAccounts.filter(acc => acc.id !== accountId)
    updateUser({
      ...user,
      connectedAccounts: updatedAccounts
    })
    toast.success('Account disconnected successfully!')
  }

  const isConnected = (platformId) => {
    return user.connectedAccounts.some(acc => acc.platform === platformId)
  }

  const tabs = [
    { id: 'accounts', label: 'Social Accounts' },
    { id: 'subscription', label: 'Subscription' },
    { id: 'profile', label: 'Profile' }
  ]

  return (
    <div className="max-w-4xl mx-auto px-container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-300">Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-surface rounded-lg p-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === tab.id 
                ? 'bg-primary text-white' 
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Social Accounts Tab */}
      {activeTab === 'accounts' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Link2 className="w-6 h-6 mr-2" />
              Connected Accounts
            </h3>
            <p className="text-gray-300 mb-6">
              Connect your social media accounts to start scheduling posts
            </p>

            <div className="space-y-4">
              {socialPlatforms.map(platform => {
                const connected = isConnected(platform.id)
                const account = user.connectedAccounts.find(acc => acc.platform === platform.id)

                return (
                  <div
                    key={platform.id}
                    className="flex items-center justify-between p-4 bg-surface/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={platform.color}>
                        {platform.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{platform.name}</h4>
                        <p className="text-sm text-gray-400">{platform.description}</p>
                        {connected && account && (
                          <p className="text-sm text-green-400 mt-1">
                            Connected as @{account.username}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {connected ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <button
                            onClick={() => handleDisconnectAccount(account.id)}
                            className="btn-secondary text-sm"
                          >
                            Disconnect
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleConnectAccount(platform.id)}
                          className="btn-primary flex items-center"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Connect
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Subscription Tab */}
      {activeTab === 'subscription' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-semibold text-white mb-4">Current Plan</h3>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-lg font-medium text-white capitalize">
                  {user.subscriptionTier} Plan
                </p>
                <p className="text-gray-300">
                  {user.subscriptionTier === 'free' ? 'Limited features' : 'All features included'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">
                  {user.subscriptionTier === 'free' ? '$0' : 
                   user.subscriptionTier === 'pro' ? '$29' : '$79'}
                </p>
                <p className="text-sm text-gray-400">per month</p>
              </div>
            </div>

            {user.subscriptionTier === 'free' && (
              <div className="bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Upgrade to Pro</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Get access to AI caption assistant, more social accounts, and priority support
                </p>
                <button className="btn-accent">
                  Upgrade Now
                </button>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-700">
              <h4 className="text-white font-medium mb-3">Usage This Month</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Posts scheduled</span>
                  <span className="text-white">
                    5 / {user.subscriptionTier === 'free' ? '10' : 
                         user.subscriptionTier === 'pro' ? '100' : '∞'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Connected accounts</span>
                  <span className="text-white">
                    {user.connectedAccounts.length} / {
                      user.subscriptionTier === 'free' ? '1' : 
                      user.subscriptionTier === 'pro' ? '5' : '15'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-semibold text-white mb-4">Profile Information</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="input w-full opacity-60"
                />
                <p className="text-sm text-gray-400 mt-1">
                  Email cannot be changed at this time
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Account ID
                </label>
                <input
                  type="text"
                  value={user.id}
                  disabled
                  className="input w-full opacity-60"
                />
              </div>

              <div className="pt-4">
                <button type="button" className="btn-secondary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <div className="card border-red-500/20">
            <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center">
              <AlertCircle className="w-6 h-6 mr-2" />
              Danger Zone
            </h3>
            <p className="text-gray-300 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  )
}