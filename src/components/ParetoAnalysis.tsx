import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Line, ComposedChart, ResponsiveContainer } from 'recharts';
import { Plus, Save } from 'lucide-react';

interface Cause {
  id: string;
  description: string;
  units: number;
  comments?: string;
}

interface ParetoAnalysisProps {
  onComplete: (causes: Cause[]) => void;
  initialCauses?: Cause[];
  readOnly?: boolean;
}

export const ParetoAnalysis: React.FC<ParetoAnalysisProps> = ({ 
  onComplete,
  initialCauses = [],
  readOnly = false
}) => {
  const [causes, setCauses] = useState<Cause[]>(initialCauses);
  const [newCause, setNewCause] = useState<Cause>({
    id: '',
    description: '',
    units: 0,
    comments: ''
  });

  const handleAddCause = () => {
    if (!newCause.description || newCause.units <= 0) return;
    
    setCauses([...causes, { ...newCause, id: Date.now().toString() }]);
    setNewCause({
      id: '',
      description: '',
      units: 0,
      comments: ''
    });
  };

  const paretoData = causes
    .sort((a, b) => b.units - a.units)
    .map((cause, index, array) => {
      const totalUnits = array.reduce((sum, c) => sum + c.units, 0);
      const accumulatedUnits = array
        .slice(0, index + 1)
        .reduce((sum, c) => sum + c.units, 0);
      
      return {
        name: cause.description,
        units: cause.units,
        accumulated: (accumulatedUnits / totalUnits) * 100
      };
    });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Análisis de Pareto - Registro de Causas
        </h3>
        
        {!readOnly && (
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Causa
                </label>
                <input
                  type="text"
                  value={newCause.description}
                  onChange={(e) => setNewCause({ ...newCause, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Descripción de la causa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unidades
                </label>
                <input
                  type="number"
                  value={newCause.units || ''}
                  onChange={(e) => setNewCause({ ...newCause, units: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comentarios
                </label>
                <input
                  type="text"
                  value={newCause.comments}
                  onChange={(e) => setNewCause({ ...newCause, comments: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Opcional"
                />
              </div>
            </div>
            <button
              onClick={handleAddCause}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar Causa
            </button>
          </div>
        )}

        {causes.length > 0 && (
          <>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Causa
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unidades
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Comentarios
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {causes.map((cause) => (
                    <tr key={cause.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {cause.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {cause.units}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cause.comments}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="h-80 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={paretoData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="units" fill="#3B82F6" />
                  <Line yAxisId="right" dataKey="accumulated" stroke="#EF4444" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {!readOnly && (
              <button
                onClick={() => onComplete(causes)}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Siguiente: Crear Plan de Acción
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};