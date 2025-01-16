import { create } from 'zustand';
import { KPIData, KPIArea } from '../types/kpi';

interface KPIStore {
  kpiData: KPIData[];
  selectedArea: KPIArea | null;
  isAuthenticated: boolean;
  setSelectedArea: (area: KPIArea | null) => void;
  addKPIData: (data: KPIData) => void;
  login: () => void;
  logout: () => void;
}

export const useKPIStore = create<KPIStore>((set) => ({
  kpiData: [],
  selectedArea: null,
  isAuthenticated: false,
  setSelectedArea: (area) => set({ selectedArea: area }),
  addKPIData: (data) => set((state) => ({ 
    kpiData: [...state.kpiData, data] 
  })),
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
}));