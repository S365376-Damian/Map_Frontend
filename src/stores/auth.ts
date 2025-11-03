import { create } from 'zustand'

export type User = {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
  disabilityType?: string
  phone?: string
}

type AuthState = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  setLoading: (loading: boolean) => void
  setAuth: (payload: { user: User; token: string }) => void
  clearAuth: () => void
  updateLocalUser: (data: Partial<User>) => void
}

export const useAuthStore = create<AuthState>((set, get) => {
  let parsedUser: User | null = null
  const savedUser = localStorage.getItem('user')
  const savedToken = localStorage.getItem('token')

  if (savedUser) {
    try {
      parsedUser = JSON.parse(savedUser)
    } catch {
      console.warn('Invalid user JSON, clearing localStorage.user')
      localStorage.removeItem('user')
    }
  }

  return {
    user: parsedUser,
    token: savedToken,
    isAuthenticated: !!savedToken,
    isLoading: false,

    setLoading: (isLoading) => set({ isLoading }),
    setAuth: ({ user, token }) => {
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      set({ user, token, isAuthenticated: true })
    },
    clearAuth: () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      set({ user: null, token: null, isAuthenticated: false })
    },
    updateLocalUser: (data) => {
      const current = get().user
      if (!current) return
      const updated = { ...current, ...data }
      localStorage.setItem('user', JSON.stringify(updated))
      set({ user: updated })
    },
  }
})




