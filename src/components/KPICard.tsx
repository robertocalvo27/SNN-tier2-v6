import React from 'react';
import { ShieldCheck, BadgeCheck, Truck, Factory, DollarSign } from 'lucide-react';
import { KPIAreaConfig } from '../types/kpi';

interface KPICardProps {
  config: KPIAreaConfig;
  onClick: () => void;
  isSelected: boolean;
}

const iconMap = {
  'shield-check': ShieldCheck,
  'badge-check': BadgeCheck,
  'truck': Truck,
  'factory': Factory,
  'dollar-sign': DollarSign
};

export const KPICard: React.FC<KPICardProps> = ({ config, onClick, isSelected }) => {
  const Icon = iconMap[config.icon as keyof typeof iconMap];

  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-lg shadow-md cursor-pointer transition-all
        ${isSelected 
          ? 'bg-blue-600 text-white transform scale-105' 
          : 'bg-white hover:bg-blue-50'
        }`}
    >
      <div className="flex items-center space-x-4">
        {Icon && <Icon className="w-8 h-8" />}
        <div>
          <h3 className="text-lg font-semibold">{config.name}</h3>
          <p className="text-sm opacity-75">
            {config.metrics.length} métricas
          </p>
        </div>
      </div>
    </div>
  );
};