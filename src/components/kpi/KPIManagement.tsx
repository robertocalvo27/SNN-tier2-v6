import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Plus,
  Edit2, 
  Trash2, 
  LayoutGrid, 
  List, 
  FileText,
  Factory,
  Target,
  BarChart2,
  Clock,
  Calendar,
  Database,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { CategoryForm } from './CategoryForm';
import { ValueStreamForm } from './ValueStreamForm';
import { KPIForm } from './KPIForm';
import { TierForm } from './TierForm';

// Mock data
const mockCategories = [
  {
    id: '1',
    name: 'Productividad',
    description: 'Métricas relacionadas con la eficiencia productiva'
  },
  {
    id: '2',
    name: 'Calidad',
    description: 'Indicadores de calidad del producto'
  }
];

const mockValueStreams = [
  {
    id: '1',
    name: 'Línea Principal',
    description: 'Línea principal de producción',
    areas: ['Safety', 'Quality']
  },
  {
    id: '2',
    name: 'Línea Secundaria',
    description: 'Línea secundaria de producción',
    areas: ['Production', 'Delivery']
  }
];

const mockKPIs = [
  {
    id: '1',
    name: 'OEE',
    description: 'Overall Equipment Effectiveness',
    categoryId: '1',
    valueType: 'percentage',
    frequency: 'daily'
  },
  {
    id: '2',
    name: 'Defectos',
    description: 'Tasa de defectos por millón',
    categoryId: '2',
    valueType: 'ratio',
    frequency: 'daily'
  }
];

const mockTiers = [
  {
    id: '1',
    level: 1,
    name: 'Tier 1 - Operativo',
    frequency: 'daily',
    kpiIds: ['1', '2']
  },
  {
    id: '2',
    level: 2,
    name: 'Tier 2 - Táctico',
    frequency: 'weekly',
    kpiIds: ['1']
  }
];

export const KPIManagement: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'valueStreams');
  const [categories] = useState(mockCategories);
  const [valueStreams] = useState(mockValueStreams);
  const [kpis] = useState(mockKPIs);
  const [tiers] = useState(mockTiers);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    // Implementar lógica de eliminación
    setSuccessMessage('Elemento eliminado correctamente');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSave = (data: any) => {
    // Implementar lógica de guardado
    setShowForm(false);
    setSuccessMessage('Cambios guardados correctamente');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'valueStreams':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valueStreams.map((vs) => (
              <div key={vs.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <Factory className="w-6 h-6 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">{vs.name}</h3>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(vs)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(vs.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">{vs.description}</p>
                <div className="flex flex-wrap gap-2">
                  {vs.areas.map((area) => (
                    <span
                      key={area}
                      className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'kpis':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-6">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">Todas las categorías</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'cards'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-400 hover:text-gray-500'
                  }`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'table'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-400 hover:text-gray-500'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {viewMode === 'cards' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kpis
                  .filter((kpi) => selectedCategory === 'all' || kpi.categoryId === selectedCategory)
                  .map((kpi) => (
                    <div key={kpi.id} className="bg-white rounded-lg shadow-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <Target className="w-6 h-6 text-blue-600 mr-2" />
                          <h3 className="text-lg font-semibold text-gray-900">{kpi.name}</h3>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(kpi)}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(kpi.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">{kpi.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Database className="w-4 h-4 mr-1" />
                          {kpi.valueType}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {kpi.frequency}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Descripción
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Frecuencia
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {kpis
                      .filter((kpi) => selectedCategory === 'all' || kpi.categoryId === selectedCategory)
                      .map((kpi) => (
                        <tr key={kpi.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {kpi.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {kpi.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {kpi.valueType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {kpi.frequency}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(kpi)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Edit2 className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDelete(kpi.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );

      case 'tiers':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div key={tier.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <BarChart2 className="w-6 h-6 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(tier)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(tier.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {tier.frequency}
                  </span>
                  <span>
                    {tier.kpiIds.length} KPIs
                  </span>
                </div>
                <div className="space-y-2">
                  {tier.kpiIds.map((kpiId) => {
                    const kpi = kpis.find((k) => k.id === kpiId);
                    return kpi && (
                      <div
                        key={kpiId}
                        className="flex items-center p-2 bg-gray-50 rounded-lg text-sm"
                      >
                        <Target className="w-4 h-4 text-gray-400 mr-2" />
                        {kpi.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestión de KPIs</h1>
            <p className="text-gray-500">Administra los KPIs, value streams y tiers del sistema</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nuevo {activeTab === 'valueStreams' ? 'Value Stream' : 
                   activeTab === 'kpis' ? 'KPI' : 'Tier'}
          </button>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
          <div className="flex items-center">
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
            <p className="text-green-700">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => handleTabChange('valueStreams')}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                activeTab === 'valueStreams'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Factory className="w-5 h-5 mr-2" />
              Value Streams
            </button>
            <button
              onClick={() => handleTabChange('kpis')}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                activeTab === 'kpis'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Target className="w-5 h-5 mr-2" />
              KPIs
            </button>
            <button
              onClick={() => handleTabChange('tiers')}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                activeTab === 'tiers'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart2 className="w-5 h-5 mr-2" />
              Tiers
            </button>
          </nav>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>

      {/* Forms */}
      {showForm && (
        <>
          {activeTab === 'valueStreams' && (
            <ValueStreamForm
              onClose={() => setShowForm(false)}
              onSave={handleSave}
              initialData={editingItem}
            />
          )}
          {activeTab === 'kpis' && (
            <KPIForm
              onClose={() => setShowForm(false)}
              onSave={handleSave}
              initialData={editingItem}
              categories={categories}
              valueStreams={valueStreams}
            />
          )}
          {activeTab === 'tiers' && (
            <TierForm
              onClose={() => setShowForm(false)}
              onSave={handleSave}
              initialData={editingItem}
              kpis={kpis}
            />
          )}
        </>
      )}
    </div>
  );
};