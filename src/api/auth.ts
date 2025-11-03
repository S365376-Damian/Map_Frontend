import { toast } from 'react-toastify'
import type { User } from '../stores/auth'

const BASE_URL = import.meta.env.VITE_API_URL

export type LoginPayload = { email: string; password: string }
export type RegisterPayload = { name: string; email: string; password: string; phone?: string }

export const authApi = {
  async login(payload: LoginPayload): Promise<{ token: string; user: User }> {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const result = await res.json().catch(() => null)

    if (!res.ok) {
      const message = result?.message || `Login failed (${res.status})`
      toast.error(message)
      throw new Error(message)
    }

    const token = result.data.access
    const user: User = {
      id: result.data.user.id,
      email: result.data.user.email,
      name: result.data.user.full_name,
      role: result.data.user.role,
    }

    // ✅ Lưu token & user vào localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    toast.success('Login successful 🎉')
    return { token, user }
  },

  async register(payload: RegisterPayload): Promise<{ token: string; user: User }> {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const result = await res.json().catch(() => null)

    if (!res.ok) {
      toast.error(result?.message || `Registration failed (${res.status})`)
      throw new Error(result?.message || 'Registration failed')
    }

    const token = result.data.access
    const user: User = {
      id: result.data.user.id,
      email: result.data.user.email,
      name: result.data.user.full_name,
      role: result.data.user.role,
    }

    // ✅ Lưu token & user vào localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    toast.success('Registration successful 🎉')
    return { token, user }
  },

  async profile(token: string): Promise<User> {
    const res = await fetch(`${BASE_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) throw new Error('Failed to load profile')
    return res.json()
  },

  async updateProfile(token: string, data: Partial<User>): Promise<User> {
    const res = await fetch(`${BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to update profile')
    return res.json()
  },
}
