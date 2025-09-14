import { create } from 'zustand'
import { supabase } from '../config/supabase'

export const useStore = create((set, get) => ({
  // State
  lists: [],
  currentList: null,
  suggestions: [],
  isLoading: false,
  error: null,

  // Actions
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  // Fetch user's shopping lists
  fetchLists: async (userId) => {
    set({ isLoading: true })
    try {
      const { data, error } = await supabase
        .from('shopping_lists')
        .select('*')
        .or(`owner_id.eq.${userId},shared_with.cs.{${userId}}`)
        .order('updated_at', { ascending: false })

      if (error) throw error
      set({ lists: data || [], isLoading: false })
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  },

  // Create new shopping list
  createList: async (name, userId) => {
    set({ isLoading: true })
    try {
      const { data, error } = await supabase
        .from('shopping_lists')
        .insert([{ name, owner_id: userId, items: [] }])
        .select()
        .single()

      if (error) throw error
      set((state) => ({ lists: [data, ...state.lists], isLoading: false }))
      return data
    } catch (error) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  },

  // Update list items
  updateListItems: async (listId, items) => {
    set({ isLoading: true })
    try {
      const { error } = await supabase
        .from('shopping_lists')
        .update({ items, updated_at: new Date().toISOString() })
        .eq('id', listId)

      if (error) throw error
      
      // Update local state
      set((state) => ({
        lists: state.lists.map(list =>
          list.id === listId ? { ...list, items, updated_at: new Date().toISOString() } : list
        ),
        currentList: state.currentList?.id === listId 
          ? { ...state.currentList, items, updated_at: new Date().toISOString() }
          : state.currentList,
        isLoading: false
      }))
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  },

  // Share list with other users
  shareList: async (listId, email) => {
    set({ isLoading: true })
    try {
      // Get user ID from email
      const { data: userData } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single()

      if (!userData) throw new Error('Utilisateur non trouvé')

      // Update shared_with array
      const { data: listData } = await supabase
        .from('shopping_lists')
        .select('shared_with')
        .eq('id', listId)
        .single()

      const updatedSharedWith = [...(listData.shared_with || []), userData.id]

      const { error } = await supabase
        .from('shopping_lists')
        .update({ shared_with: updatedSharedWith })
        .eq('id', listId)

      if (error) throw error
      set({ isLoading: false })
      return true
    } catch (error) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  }
}))
