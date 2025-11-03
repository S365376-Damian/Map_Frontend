import { create } from 'zustand'
import type { Report } from './map'
import { toast } from 'react-toastify'

const BASE_URL = import.meta.env.VITE_API_URL

type ReportsState = {
  reports: Report[]
  pendingReports: Report[]
  approveReports: Report[]
  loading: boolean
  error: string | null

  // Actions
  fetchReports: () => Promise<void>
  fetchReportByIds: (user_id: string) => Promise<void>
  fetchPendingReports: () => Promise<void>
  fetchApproveReports: () => Promise<void>
  addReport: (r: Omit<Report, 'id' | 'status' | 'createdAt'>) => Promise<void>
  approve: (id: number) => Promise<void>
  reject: (id: number) => Promise<void>
}

export const useReportsStore = create<ReportsState>((set, get) => ({
  reports: [],
  pendingReports: [],
  approveReports: [],
  loading: false,
  error: null,

  fetchReports: async () => {
    set({ loading: true, error: null })
    try {
      const res = await fetch(`${BASE_URL}/reports/`)
      if (!res.ok) throw new Error(`Failed to fetch reports (${res.status})`)
      const data = await res.json()
      set({ reports: data || [], loading: false })
    } catch (err: any) {
      set({ error: err.message, loading: false })
    }
  },

  fetchReportByIds: async (userId: string) => {
    set({ loading: true, error: null })
    try {
      const res = await fetch(`${BASE_URL}/reports/?user_id=${userId}`)
      if (!res.ok) throw new Error(`Failed to fetch reports (${res.status})`)
      const data = await res.json()
      set({ reports: data || [], loading: false })
    } catch (err: any) {
      set({ error: err.message, loading: false })
    }
  },

  fetchPendingReports: async () => {
    set({ loading: true, error: null })
    try {
      const res = await fetch(`${BASE_URL}/reports/pending/`)
      if (!res.ok) throw new Error(`Failed to fetch pending reports (${res.status})`)
      const data = await res.json()
      set({ pendingReports: data || [], loading: false })
    } catch (err: any) {
      set({ error: err.message, loading: false })
    }
  },

  fetchApproveReports: async () => {
    set({ loading: true, error: null })
    try {
      const res = await fetch(`${BASE_URL}/reports/approve/`)
      if (!res.ok) throw new Error(`Failed to fetch approve reports (${res.status})`)
      const data = await res.json()
      set({ approveReports: data || [], loading: false })
    } catch (err: any) {
      set({ error: err.message, loading: false })
    }
  },

  addReport: async (report) => {
    try {
      const res = await fetch(`${BASE_URL}/reports/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report),
      })
      if (!res.ok) throw new Error(`Failed to add report (${res.status})`)
      const data = await res.json()
      set({ reports: [...get().reports, data] })
      toast.success("Add report success")
    } catch (err: any) {
      set({ error: err.message })
    }
  },

  approve: async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/reports/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved' }),
      });

      if (!res.ok) throw new Error(`Failed to approve report (${res.status})`);

      const updated = await res.json();
      const approved = get().pendingReports.find(r => r.id === id);
      toast.success("Approve report success")
      if (approved) {
        set({
          pendingReports: get().pendingReports.filter(r => r.id !== id),
          reports: [...get().reports, { ...approved, ...updated }],
        });
      }
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  reject: async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/reports/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'rejected' }),
      });

      if (!res.ok) throw new Error(`Failed to reject report (${res.status})`);
      toast.success("Reject report success")
      set({
        pendingReports: get().pendingReports.filter(r => r.id !== id),
      });
    } catch (err: any) {
      set({ error: err.message });
    }
  },
}))
