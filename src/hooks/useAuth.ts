import { useCallback } from 'react'
import { useAuthStore, type User } from '../stores/auth'
import { authApi, type LoginPayload, type RegisterPayload } from '../api/auth'

export const useAuth = () => {
  const { user, token, isAuthenticated, isLoading, setLoading, setAuth, clearAuth, updateLocalUser } = useAuthStore()
  const login = useCallback(async (payload: LoginPayload) => {
    try {
      setLoading(true)
      const { token, user } = await authApi.login(payload)
      setAuth({ token, user })
      return { success: true }
    } catch (e: any) {
      return { success: false, error: e?.message || 'Login failed' }
    } finally {
      setLoading(false)
    }
  }, [setLoading, setAuth])

  const register = useCallback(async (payload: RegisterPayload) => {
    try {
      setLoading(true)
      const { token, user } = await authApi.register(payload)
      setAuth({ token, user })
      return { success: true }
    } catch (e: any) {
      return { success: false, error: e?.message || 'Registration failed' }
    } finally {
      setLoading(false)
    }
  }, [setLoading, setAuth])

  const logout = useCallback(() => {
    clearAuth()
  }, [clearAuth])

  const updateProfile = useCallback(async (data: Partial<User>) => {
    try {
      setLoading(true)
      if (!token) throw new Error('Not authenticated')
      const updated = await authApi.updateProfile(token, data)
      updateLocalUser(updated)
      return { success: true }
    } catch (e: any) {
      return { success: false, error: e?.message || 'Update failed' }
    } finally {
      setLoading(false)
    }
  }, [token, setLoading, updateLocalUser])

  return { user, token, isAuthenticated, isLoading, login, register, logout, updateProfile }
}


