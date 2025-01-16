export type KPIArea = 'Safety' | 'Quality' | 'Delivery' | 'Production' | 'Cost';

export interface KPIMetric {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
}

export interface KPIData {
  id: string;
  area: KPIArea;
  metrics: KPIMetric[];
  date: string;
  line: string;
  shift: string;
}

export interface KPIAreaConfig {
  name: KPIArea;
  metrics: {
    id: string;
    name: string;
    target: number;
    unit: string;
  }[];
  icon: string;
}