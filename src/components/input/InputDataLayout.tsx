import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { KPITable } from '../KPITable';
import { KPIForm } from '../KPIForm';
import { Database, FileSpreadsheet, Webhook, ArrowUpDown } from 'lucide-react';
import { kpiAreas } from '../../config/kpiConfig';

type InputMethod = 'table' | 'manual' | 'excel' | 'api';

export const InputDataLayout = () => {
  const { area } = useParams();
  const [inputMethod, setInputMethod] = useState<InputMethod>('table');
  
  // Si no hay área seleccionada, mostrar el selector de áreas
  if (!area) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Selecciona un Área para Ingresar Datos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kpiAreas.map((areaConfig) => (
              <Link
                key={areaConfig.name}
                to={`/input/${areaConfig.name.toLowerCase()}`}
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-lg">{areaConfig.name[0]}</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{areaConfig.name}</h3>
                  <p className="text-sm text-gray-500">{areaConfig.metrics.length} métricas</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const areaConfig = kpiAreas.find(
    a => a.name.toLowerCase() === area.toLowerCase()
  );

  if (!areaConfig) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Área no encontrada</h2>
          <p className="text-gray-500 mb-4">El área especificada no existe en el sistema.</p>
          <Link
            to="/input"
            className="text-blue-600 hover:text-blue-700"
          >
            Volver al selector de áreas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {areaConfig.name} - Registro de Datos
          </h2>
          <Link
            to="/input"
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Cambiar área
          </Link>
        </div>

        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setInputMethod('table')}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              inputMethod === 'table'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ArrowUpDown className="w-5 h-5 mr-2" />
            Vista Tabla
          </button>
          <button
            onClick={() => setInputMethod('manual')}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              inputMethod === 'manual'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Database className="w-5 h-5 mr-2" />
            Manual
          </button>
          <button
            onClick={() => setInputMethod('excel')}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              inputMethod === 'excel'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <FileSpreadsheet className="w-5 h-5 mr-2" />
            Importar Excel
          </button>
          <button
            onClick={() => setInputMethod('api')}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              inputMethod === 'api'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Webhook className="w-5 h-5 mr-2" />
            API
          </button>
        </div>

        {inputMethod === 'table' && (
          <KPITable config={areaConfig} />
        )}

        {inputMethod === 'manual' && (
          <KPIForm config={areaConfig} />
        )}

        {inputMethod === 'excel' && (
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <FileSpreadsheet className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Importar datos desde Excel - {areaConfig.name}
            </h3>
            <p className="text-gray-500 mb-4">
              Arrastra y suelta tu archivo Excel aquí o haz clic para seleccionarlo
            </p>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              id="excel-upload"
            />
            <label
              htmlFor="excel-upload"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            >
              Seleccionar Archivo
            </label>
          </div>
        )}

        {inputMethod === 'api' && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Configuración de API - {areaConfig.name}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL del Endpoint
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://api.ejemplo.com/datos"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Token de Autenticación
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Bearer token"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Intervalo de Sincronización
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                  <option value="5">Cada 5 minutos</option>
                  <option value="15">Cada 15 minutos</option>
                  <option value="30">Cada 30 minutos</option>
                  <option value="60">Cada hora</option>
                </select>
              </div>
              <button className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Guardar Configuración
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};