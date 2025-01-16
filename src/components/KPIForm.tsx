import React, { useState } from 'react';
import { KPIAreaConfig, KPIData } from '../types/kpi';
import { useKPIStore } from '../store/kpiStore';

interface KPIFormProps {
  config: KPIAreaConfig;
}

export const KPIForm: React.FC<KPIFormProps> = ({ config }) => {
  const addKPIData = useKPIStore((state) => state.addKPIData);
  const [formData, setFormData] = useState({
    line: '',
    shift: '',
    date: new Date().toISOString().split('T')[0],
    metrics: config.metrics.map(m => ({ ...m, current: 0 }))
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const kpiData: KPIData = {
      id: Date.now().toString(),
      area: config.name,
      ...formData
    };
    addKPIData(kpiData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Línea</label>
          <input
            type="text"
            value={formData.line}
            onChange={(e) => setFormData({ ...formData, line: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Turno</label>
          <select
            value={formData.shift}
            onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Seleccionar turno</option>
            <option value="morning">Mañana</option>
            <option value="afternoon">Tarde</option>
            <option value="night">Noche</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        {formData.metrics.map((metric, index) => (
          <div key={metric.id}>
            <label className="block text-sm font-medium text-gray-700">
              {metric.name} (Meta: {metric.target}{metric.unit})
            </label>
            <input
              type="number"
              value={metric.current}
              onChange={(e) => {
                const newMetrics = [...formData.metrics];
                newMetrics[index] = { ...metric, current: Number(e.target.value) };
                setFormData({ ...formData, metrics: newMetrics });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Guardar Datos
      </button>
    </form>
  );
};