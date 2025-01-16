import React, { useState } from 'react';
import { 
  Save, 
  X, 
  HelpCircle, 
  Database, 
  FileSpreadsheet, 
  Webhook, 
  AlertTriangle,
  Plus,
  Target,
  Calendar,
  Clock
} from 'lucide-react';

interface KPIFormProps {
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
  categories: any[];
  valueStreams: any[];
}

export const KPIForm: React.FC<KPIFormProps> = ({
  onClose,
  onSave,
  initialData,
  categories,
  valueStreams
}) => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState(initialData || {
    name: '',
    description: '',
    valueStreamId: '',
    categoryId: '',
    policies: '',
    valueType: 'nominal',
    unit: '',
    frequency: 'daily',
    responsibleId: '',
    tiers: [],
    formula: '',
    dataSource: {
      type: 'manual',
      config: {}
    },
    validations: [],
    alerts: []
  });

  const [showFormulaHelp, setShowFormulaHelp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const getTabClassName = (tabName: string) => {
    return `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
      activeTab === tabName 
        ? 'bg-blue-50 text-blue-700' 
        : 'text-gray-600 hover:bg-gray-100'
    }`;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Value Stream
                </label>
                <select
                  value={formData.valueStreamId}
                  onChange={(e) => setFormData({ ...formData, valueStreamId: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Seleccionar Value Stream</option>
                  {valueStreams.map((vs) => (
                    <option key={vs.id} value={vs.id}>{vs.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Categoría
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Seleccionar Categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tipo de Valor
                </label>
                <select
                  value={formData.valueType}
                  onChange={(e) => setFormData({ ...formData, valueType: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="nominal">Nominal</option>
                  <option value="incremental">Incremental</option>
                  <option value="percentage">Porcentaje</option>
                  <option value="ratio">Ratio</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Políticas
              </label>
              <textarea
                value={formData.policies}
                onChange={(e) => setFormData({ ...formData, policies: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Reglas o valores aceptables para este KPI"
              />
            </div>
          </div>
        );

      // ... (resto de los casos del switch)
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 p-6 border-r border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {initialData ? 'Editar' : 'Nuevo'} KPI
            </h2>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('general')}
                className={getTabClassName('general')}
              >
                <Database className="w-5 h-5 mr-3" />
                Información General
              </button>
              <button
                onClick={() => setActiveTab('formula')}
                className={getTabClassName('formula')}
              >
                <FileSpreadsheet className="w-5 h-5 mr-3" />
                Fórmula
              </button>
              <button
                onClick={() => setActiveTab('source')}
                className={getTabClassName('source')}
              >
                <Webhook className="w-5 h-5 mr-3" />
                Origen del Valor
              </button>
              <button
                onClick={() => setActiveTab('alerts')}
                className={getTabClassName('alerts')}
              >
                <AlertTriangle className="w-5 h-5 mr-3" />
                Alertas
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-6 overflow-y-auto">
              <form onSubmit={handleSubmit}>
                {renderTabContent()}
              </form>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};