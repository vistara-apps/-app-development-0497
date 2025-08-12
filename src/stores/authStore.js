import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  isLoading: false,
  
  login: async (email, password) => {
    set({ isLoading: true })
    try {
      // Mock authentication - in real app, use Supabase
      const mockUser = {
        id: '1',
        email,
        subscriptionTier: 'free',
        connectedAccounts: []
      }
      localStorage.setItem('user', JSON.stringify(mockUser))
      set({ user: mockUser, isLoading: false })
      return { success: true }
    } catch (error) {
      set({ isLoading: false })
      return { success: false, error: error.message }
    }
  },
  
  register: async (email, password) => {
    set({ isLoading: true })
    try {
      // Mock registration - in real app, use Supabase
      const mockUser = {
        id: '1',
        email,
        subscriptionTier: 'free',
        connectedAccounts: []
      }
      localStorage.setItem('user', JSON.stringify(mockUser))
      set({ user: mockUser, isLoading: false })
      return { success: true }
    } catch (error) {
      set({ isLoading: false })
      return { success: false, error: error.message }
    }
  },
  
  logout: () => {
    localStorage.removeItem('user')
    set({ user: null })
  },
  
  updateUser: (userData) => {
    const updatedUser = { ...userData }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    set({ user: updatedUser })
  }
}))