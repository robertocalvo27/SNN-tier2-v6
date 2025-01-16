import { KPIAreaConfig } from '../types/kpi';

export const kpiAreas: KPIAreaConfig[] = [
  {
    name: 'Safety',
    metrics: [
      { id: 'casi-cerrados', name: 'Casi Casi Cerrados', target: 80, unit: '%' },
      { id: 'accidents-mtd', name: 'Accidentes y Primeros Auxilios (MTD)', target: 0, unit: 'incidents' }
    ],
    icon: 'shield-check'
  },
  {
    name: 'Quality',
    metrics: [
      { id: 'quality-ideas', name: 'Ideas de Calidad', target: 90, unit: '%' },
      { id: 'ncs', name: 'NCS', target: 0, unit: 'issues' }
    ],
    icon: 'badge-check'
  },
  {
    name: 'Delivery',
    metrics: [
      { id: 'production-vs-plan', name: 'Producción vs Plan Semanal', target: 95, unit: '%' },
      { id: 'complete-orders', name: 'Órdenes Completas', target: 98, unit: '%' }
    ],
    icon: 'truck'
  },
  {
    name: 'Production',
    metrics: [
      { id: 'yield', name: 'Yield', target: 85, unit: '%' },
      { id: 'off-standards', name: 'Tiempo Fuera de Estándar', target: 5, unit: '%' }
    ],
    icon: 'factory'
  },
  {
    name: 'Cost',
    metrics: [
      { id: 'total-absorption', name: 'Absorción Total Acumulada', target: 100, unit: '%' },
      { id: 'budget-compliance', name: 'Cumplimiento Presupuestario', target: 95, unit: '%' }
    ],
    icon: 'dollar-sign'
  }
];