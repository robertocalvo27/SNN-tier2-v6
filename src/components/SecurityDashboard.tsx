import React, { useState, useMemo } from 'react';
import { 
  Download, 
  FileSpreadsheet, 
  Filter, 
  Calendar,
  ChevronDown,
  ChevronUp,
  Calendar as CalendarIcon,
  Clock
} from 'lucide-react';
import { KPIAreaConfig } from '../types/kpi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SecurityDashboardProps {
  config: KPIAreaConfig;
}

type ComparisonMode = 'none' | 'previous-week' | 'previous-year';
type ViewMode = 'table' | 'chart';
type DateType = 'natural' | 'corporate';
type GroupBy = 'day' | 'week' | 'month';

// Función para obtener el número de semana corporativa
const getCorporateWeek = (date: Date): number => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  // Encontrar el primer domingo del año
  while (startOfYear.getDay() !== 0) {
    startOfYear.setDate(startOfYear.getDate() + 1);
  }
  const diff = date.getTime() - startOfYear.getTime();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  return Math.floor(diff / oneWeek) + 1;
};

// Función para generar fechas de los últimos N días
const generateDates = (days: number) => {
  const dates = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.unshift(date.toISOString().split('T')[0]);
  }
  return dates;
};

// Generar datos mock
const generateMockData = () => {
  const lines = ['L06', 'L07', 'Rapid Rhino', 'ENT'];
  const mockData: Record<string, Record<string, number>> = {};
  const dates = generateDates(365);
  
  lines.forEach(line => {
    mockData[line] = {};
    dates.forEach(date => {
      mockData[line][date] = Math.floor(Math.random() * 25) + 70;
    });
  });
  
  return mockData;
};

// Función para obtener datos comparativos
const getComparisonData = (date: string, mode: ComparisonMode): string => {
  const currentDate = new Date(date);
  if (mode === 'previous-week') {
    currentDate.setDate(currentDate.getDate() - 7);
  } else if (mode === 'previous-year') {
    currentDate.setFullYear(currentDate.getFullYear() - 1);
  }
  return currentDate.toISOString().split('T')[0];
};

export const SecurityDashboard: React.FC<SecurityDashboardProps> = ({ config }) => {
  const [selectedLine, setSelectedLine] = useState<string>('all');
  const [data] = useState(generateMockData());
  const [colorMode, setColorMode] = useState<'default' | 'colorblind'>('default');
  const [comparisonMode, setComparisonMode] = useState<ComparisonMode>('none');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [isConfigCollapsed, setIsConfigCollapsed] = useState(false);
  const [dateType, setDateType] = useState<DateType>('natural');
  const [groupBy, setGroupBy] = useState<GroupBy>('day');
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
    startWeek: getCorporateWeek(new Date(Date.now() - 9 * 24 * 60 * 60 * 1000)),
    endWeek: getCorporateWeek(new Date())
  });

  const lines = ['L06', 'L07', 'Rapid Rhino', 'ENT'];
  const filteredLines = selectedLine === 'all' ? lines : [selectedLine];

  // Generar array de fechas entre start y end
  const dates = useMemo(() => {
    const dateArray = [];
    const currentDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);
    
    while (currentDate <= endDate) {
      dateArray.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dateArray;
  }, [dateRange]);

  // Agrupar datos según el tipo seleccionado
  const groupData = (data: any[], groupBy: GroupBy) => {
    if (groupBy === 'day') return data;

    return data.reduce((acc: any[], item: any) => {
      const date = new Date(item.date);
      let key = '';
      
      if (groupBy === 'week') {
        const week = dateType === 'natural' 
          ? Math.ceil((date.getDate() + new Date(date.getFullYear(), date.getMonth(), 1).getDay()) / 7)
          : getCorporateWeek(date);
        key = `Week ${week}`;
      } else if (groupBy === 'month') {
        key = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      }

      const existingGroup = acc.find(g => g.groupKey === key);
      if (existingGroup) {
        Object.keys(item).forEach(lineKey => {
          if (lineKey !== 'date' && lineKey !== 'groupKey') {
            existingGroup[lineKey] = (existingGroup[lineKey] + item[lineKey]) / 2;
          }
        });
      } else {
        acc.push({ ...item, groupKey: key });
      }

      return acc;
    }, []);
  };

  // Preparar datos para el gráfico y tabla
  const chartData = useMemo(() => {
    const rawData = dates.map(date => {
      const dataPoint: any = { date };
      filteredLines.forEach(line => {
        dataPoint[line] = data[line][date] || 0;
        if (comparisonMode !== 'none') {
          const compDate = getComparisonData(date, comparisonMode);
          dataPoint[`${line} (Comp)`] = data[line][compDate] || 0;
        }
      });
      return dataPoint;
    });

    return groupData(rawData, groupBy);
  }, [dates, filteredLines, data, groupBy, comparisonMode]);

  const getStatusColor = (value: number) => {
    const isCompliant = value >= 80;
    if (colorMode === 'default') {
      return isCompliant ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    }
    return isCompliant ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800';
  };

  return (
    <div className="space-y-8">
      {/* Panel de Control - Configuración */}
      <div className="bg-white rounded-lg shadow-lg">
        <div 
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
          onClick={() => setIsConfigCollapsed(!isConfigCollapsed)}
        >
          <h2 className="text-2xl font-bold text-gray-900">
            Panel de Control - Configuración
          </h2>
          {isConfigCollapsed ? (
            <ChevronDown className="w-6 h-6 text-gray-500" />
          ) : (
            <ChevronUp className="w-6 h-6 text-gray-500" />
          )}
        </div>

        {!isConfigCollapsed && (
          <div className="p-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Filtro de Línea */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Línea
                </label>
                <div className="relative">
                  <select
                    value={selectedLine}
                    onChange={(e) => setSelectedLine(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">Todas las líneas</option>
                    {lines.map(line => (
                      <option key={line} value={line}>{line}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Selector de Comparación Temporal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comparar con
                </label>
                <div className="relative">
                  <select
                    value={comparisonMode}
                    onChange={(e) => setComparisonMode(e.target.value as ComparisonMode)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="none">Sin comparación</option>
                    <option value="previous-week">Semana anterior</option>
                    <option value="previous-year">Mismo período año anterior</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Tipo de Fecha */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Fecha
                </label>
                <div className="relative">
                  <select
                    value={dateType}
                    onChange={(e) => setDateType(e.target.value as DateType)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="natural">Calendario Natural</option>
                    <option value="corporate">Calendario Corporativo</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Agrupamiento */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agrupar por
                </label>
                <div className="relative">
                  <select
                    value={groupBy}
                    onChange={(e) => setGroupBy(e.target.value as GroupBy)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="day">Día</option>
                    <option value="week">Semana</option>
                    <option value="month">Mes</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Selector de Fechas */}
              {dateType === 'natural' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha Inicial
                    </label>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      max={dateRange.end}
                      className="block w-full pl-3 pr-3 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha Final
                    </label>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      min={dateRange.start}
                      max={new Date().toISOString().split('T')[0]}
                      className="block w-full pl-3 pr-3 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Semana Inicial
                    </label>
                    <div className="relative">
                      <select
                        value={dateRange.startWeek}
                        onChange={(e) => setDateRange(prev => ({ 
                          ...prev, 
                          startWeek: Number(e.target.value)
                        }))}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        {Array.from({ length: 53 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>Week {i + 1}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Semana Final
                    </label>
                    <div className="relative">
                      <select
                        value={dateRange.endWeek}
                        onChange={(e) => setDateRange(prev => ({ 
                          ...prev, 
                          endWeek: Number(e.target.value)
                        }))}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        {Array.from({ length: 53 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>Week {i + 1}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </>
              )}

              {/* Selector de Vista */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vista
                </label>
                <div className="relative">
                  <select
                    value={viewMode}
                    onChange={(e) => setViewMode(e.target.value as ViewMode)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="table">Tabla</option>
                    <option value="chart">Gráfico</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => setColorMode(prev => prev === 'default' ? 'colorblind' : 'default')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Modo {colorMode === 'default' ? 'Daltónico' : 'Normal'}
              </button>
              
              <div className="flex space-x-2">
                <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Excel
                </button>
                <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dashboard Content */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Dashboard de Seguridad - Casi Casi Cerrados
          {comparisonMode !== 'none' && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              {comparisonMode === 'previous-week' ? '(vs Semana Anterior)' : '(vs Año Anterior)'}
            </span>
          )}
        </h2>

        {viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Línea
                  </th>
                  {chartData.map((item: any) => (
                    <th
                      key={item.groupKey || item.date}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {item.groupKey || new Date(item.date).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'short'
                      })}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLines.map(line => (
                  <React.Fragment key={line}>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {line}
                      </td>
                      {chartData.map((item: any) => {
                        const value = item[line] || 0;
                        return (
                          <td
                            key={`${line}-${item.groupKey || item.date}`}
                            className={`px-6 py-4 whitespace-nowrap text-sm font-medium rounded-lg ${getStatusColor(value)}`}
                          >
                            {value}%
                          </td>
                        );
                      })}
                    </tr>
                    {comparisonMode !== 'none' && (
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                          {line} (Anterior)
                        </td>
                        {chartData.map((item: any) => {
                          const value = item[`${line} (Comp)`] || 0;
                          const currentValue = item[line] || 0;
                          const difference = currentValue - value;
                          
                          return (
                            <td
                              key={`${line}-${item.groupKey || item.date}-comp`}
                              className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                            >
                              <div className={getStatusColor(value)}>
                                {value}%
                              </div>
                              <div className={`text-xs mt-1 ${difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {difference >= 0 ? '+' : ''}{difference}%
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey={groupBy === 'day' ? 'date' : 'groupKey'}
                  tickFormatter={groupBy === 'day' ? (date) => new Date(date).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: 'short'
                  }) : undefined}
                />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  formatter={(value: number) => `${value}%`}
                  labelFormatter={groupBy === 'day' ? (date) => new Date(date).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: 'long'
                  }) : undefined}
                />
                <Legend />
                {filteredLines.map((line, index) => (
                  <React.Fragment key={line}>
                    <Line
                      type="monotone"
                      dataKey={line}
                      name={line}
                      stroke={colorMode === 'default' 
                        ? `hsl(${index * 90}, 70%, 50%)`
                        : `hsl(${index * 60 + 200}, 70%, 50%)`}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    {comparisonMode !== 'none' && (
                      <Line
                        type="monotone"
                        dataKey={`${line} (Comp)`}
                        name={`${line} (${comparisonMode === 'previous-week' ? 'Semana Anterior' : 'Año Anterior'})`}
                        stroke={colorMode === 'default' 
                          ? `hsl(${index * 90}, 70%, 50%, 0.5)`
                          : `hsl(${index * 60 + 200}, 70%, 50%, 0.5)`}
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
          <div className="flex space-x-6">
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded ${colorMode === 'default' ? 'bg-green-100' : 'bg-blue-100'} mr-2`}></div>
              <span>Meta Cumplida (≥80%)</span>
            </div>
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded ${colorMode === 'default' ? 'bg-red-100' : 'bg-orange-100'} mr-2`}></div>
              <span>Meta No Cumplida (&lt;80%)</span>
            </div>
          </div>
          <div>
            Última actualización: {new Date().toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
    </div>
  );
};