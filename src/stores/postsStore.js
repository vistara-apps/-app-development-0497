import { create } from 'zustand'

export const usePostsStore = create((set, get) => ({
  posts: JSON.parse(localStorage.getItem('scheduledPosts')) || [],
  
  addPost: (post) => {
    const newPost = {
      ...post,
      id: Date.now().toString(),
      status: 'scheduled',
      createdAt: new Date().toISOString()
    }
    const updatedPosts = [...get().posts, newPost]
    localStorage.setItem('scheduledPosts', JSON.stringify(updatedPosts))
    set({ posts: updatedPosts })
  },
  
  updatePost: (id, updates) => {
    const updatedPosts = get().posts.map(post => 
      post.id === id ? { ...post, ...updates } : post
    )
    localStorage.setItem('scheduledPosts', JSON.stringify(updatedPosts))
    set({ posts: updatedPosts })
  },
  
  deletePost: (id) => {
    const updatedPosts = get().posts.filter(post => post.id !== id)
    localStorage.setItem('scheduledPosts', JSON.stringify(updatedPosts))
    set({ posts: updatedPosts })
  }
}))