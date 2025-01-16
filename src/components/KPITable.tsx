import React, { useState } from 'react';
import { KPIAreaConfig } from '../types/kpi';
import { CorrectiveActionModal } from './CorrectiveActionModal';

interface KPITableProps {
  config: KPIAreaConfig;
}

export const KPITable: React.FC<KPITableProps> = ({ config }) => {
  // Generar fechas de los últimos N días
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  });

  const lines = ['L06', 'L07', 'Rapid Rhino', 'ENT'];
  const shifts = ['T1', 'T2', 'T3'];

  // Estado para los valores de la tabla
  const [tableData, setTableData] = useState<{
    [key: string]: { [key: string]: string };
  }>({});

  const [showCorrectiveAction, setShowCorrectiveAction] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<{
    name: string;
    value: number;
    target: number;
  } | null>(null);
  const [selectedLine, setSelectedLine] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Función para actualizar el valor de una celda
  const handleCellChange = (
    metric: string,
    line: string,
    shift: string,
    date: string,
    value: string
  ) => {
    const numValue = Number(value);
    const metricConfig = config.metrics.find(m => m.id === 'casi-cerrados');
    
    if (metricConfig && numValue < metricConfig.target) {
      setSelectedMetric({
        name: metricConfig.name,
        value: numValue,
        target: metricConfig.target
      });
      setSelectedLine(line);
      setSelectedDate(date);
      setShowCorrectiveAction(true);
    }

    setTableData(prev => ({
      ...prev,
      [`${metric}-${line}-${shift}-${date}`]: {
        ...prev[`${metric}-${line}-${shift}-${date}`],
        value
      }
    }));
  };

  return (
    <div className="space-y-8">
      {config.metrics.map((metric) => (
        <div key={metric.id} className="overflow-x-auto">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {metric.name} - Vista Tabla
            </h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Guardar Cambios
            </button>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Variable
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Línea
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Turno
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Meta
                </th>
                {dates.map((date) => (
                  <th
                    key={date}
                    className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {new Date(date).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'short'
                    })}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lines.map((line) => (
                <React.Fragment key={`${metric.id}-${line}`}>
                  {shifts.map((shift, index) => (
                    <tr key={`${metric.id}-${line}-${shift}`}>
                      {index === 0 && (
                        <>
                          <td
                            rowSpan={4}
                            className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900"
                          >
                            {metric.name}
                          </td>
                          <td
                            rowSpan={3}
                            className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900"
                          >
                            {line}
                          </td>
                        </>
                      )}
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                        {shift}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                        {metric.target}%
                      </td>
                      {dates.map((date) => (
                        <td
                          key={`${metric.id}-${line}-${shift}-${date}`}
                          className="px-3 py-2 whitespace-nowrap text-sm text-gray-500"
                        >
                          <input
                            type="text"
                            className="w-16 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={tableData[`${metric.id}-${line}-${shift}-${date}`]?.value || ''}
                            onChange={(e) => handleCellChange(metric.id, line, shift, date, e.target.value)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td
                      colSpan={2}
                      className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      Total {line}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      {metric.target}%
                    </td>
                    {dates.map((date) => {
                      const total = shifts.reduce((acc, shift) => {
                        const value = tableData[`${metric.id}-${line}-${shift}-${date}`]?.value;
                        return acc + (Number(value) || 0);
                      }, 0);
                      return (
                        <td
                          key={`${metric.id}-${line}-total-${date}`}
                          className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900"
                        >
                          {total > 0 ? total : '-'}
                        </td>
                      );
                    })}
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {showCorrectiveAction && selectedMetric && (
        <CorrectiveActionModal
          isOpen={showCorrectiveAction}
          onClose={() => setShowCorrectiveAction(false)}
          metric={selectedMetric}
          line={selectedLine}
          date={selectedDate}
        />
      )}
    </div>
  );
};