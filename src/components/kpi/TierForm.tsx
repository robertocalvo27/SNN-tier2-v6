import React, { useState } from 'react';
import { Save, X, Plus, Trash2 } from 'lucide-react';

interface TierFormProps {
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
  kpis: any[];
}

export const TierForm: React.FC<TierFormProps> = ({
  onClose,
  onSave,
  initialData,
  kpis
}) => {
  const [formData, setFormData] = useState(initialData || {
    level: '',
    name: '',
    frequency: 'daily',
    responsibleIds: [],
    kpiIds: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleKPIChange = (kpiId: string) => {
    const newKpiIds = formData.kpiIds.includes(kpiId)
      ? formData.kpiIds.filter((id: string) => id !== kpiId)
      : [...formData.kpiIds, kpiId];
    setFormData({ ...formData, kpiIds: newKpiIds });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {initialData ? 'Editar' : 'Nuevo'} Tier
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nivel
              </label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar Nivel</option>
                {[1, 2, 3, 4, 5, 6].map((level) => (
                  <option key={level} value={level}>Tier {level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ej: Tier 1 - Operativo"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Frecuencia de Revisión
              </label>
              <select
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="daily">Diaria</option>
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensual</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              KPIs Asociados
            </label>
            <div className="space-y-2 max-h-60 overflow-y-auto p-4 border border-gray-200 rounded-md">
              {kpis.map((kpi) => (
                <label key={kpi.id} className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                  <input
                    type="checkbox"
                    checked={formData.kpiIds.includes(kpi.id)}
                    onChange={() => handleKPIChange(kpi.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="ml-3">
                    <span className="text-sm font-medium text-gray-900">{kpi.name}</span>
                    <p className="text-sm text-gray-500">{kpi.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};