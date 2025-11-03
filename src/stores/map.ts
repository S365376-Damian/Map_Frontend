import { create } from 'zustand'

export type Report = {
  id: number
  name: string
  description: string
  type: 'stairs' | 'damaged_path' | 'missing_traffic_light' | 'obstacle' | 'no_ramp' | 'other'
  severity: 'low' | 'medium' | 'high'
  latitude: number
  longitude: number
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  images?: string[]
}

type MapState = {
  center: [number, number]
  zoom: number
  setCenter: (c: [number, number]) => void
}

export const useMapStore = create<MapState>((set) => ({
  center: [-12.4634, 130.8456],
  zoom: 13,
  setCenter: (center) => set({ center })
}))



