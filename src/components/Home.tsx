import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  AlertTriangle, 
  Upload, 
  Target, 
  TrendingUp,
  CheckCircle2,
  Calendar,
  BarChart,
  Shield,
  BadgeCheck,
  Truck,
  Factory,
  DollarSign,
  Plus,
  ChevronRight
} from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  // Mock data for quick stats
  const quickStats = [
    {
      title: "Acciones por Vencer",
      value: "8",
      trend: "+2",
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    },
    {
      title: "Métricas Fuera de Meta",
      value: "3",
      trend: "-1",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      title: "Datos Pendientes",
      value: "12",
      trend: "+5",
      icon: Upload,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Planes en Progreso",
      value: "15",
      trend: "+3",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-100"
    }
  ];

  // Mock data for KPI performance
  const kpiPerformance = [
    { area: "Safety", progress: 92, icon: Shield },
    { area: "Quality", progress: 87, icon: BadgeCheck },
    { area: "Delivery", progress: 95, icon: Truck },
    { area: "Production", progress: 78, icon: Factory },
    { area: "Cost", progress: 89, icon: DollarSign }
  ];

  // Mock data for recent actions
  const recentActions = [
    {
      id: 1,
      title: "Actualizar procedimientos de seguridad",
      area: "Safety",
      dueDate: "2024-02-15",
      status: "in-progress",
      progress: 75
    },
    {
      id: 2,
      title: "Implementar control de calidad en L07",
      area: "Quality",
      dueDate: "2024-02-18",
      status: "pending",
      progress: 30
    },
    {
      id: 3,
      title: "Optimizar tiempos de entrega",
      area: "Delivery",
      dueDate: "2024-02-20",
      status: "completed",
      progress: 100
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              ¡Buen día, Usuario!
            </h1>
            <p className="text-gray-500">
              Aquí está el resumen de tu sistema KPI
            </p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => navigate('/input')}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ingresar Datos
            </button>
            <button 
              onClick={() => navigate('/actions/new')}
              className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              <Target className="w-4 h-4 mr-2" />
              Nuevo Plan
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <div className="flex items-center">
                  <h3 className="text-xl font-bold text-gray-900">{stat.value}</h3>
                  <span className={`ml-2 text-sm ${
                    stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* KPI Performance and Recent Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KPI Performance */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Desempeño por Área
            </h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Ver Detalles
            </button>
          </div>
          <div className="space-y-4">
            {kpiPerformance.map((kpi, index) => (
              <div key={index} className="flex items-center">
                <div className="w-8">
                  <kpi.icon className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1 ml-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {kpi.area}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {kpi.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        kpi.progress >= 90 ? 'bg-green-600' :
                        kpi.progress >= 80 ? 'bg-blue-600' :
                        'bg-amber-600'
                      }`}
                      style={{ width: `${kpi.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Acciones Recientes
            </h2>
            <button 
              onClick={() => navigate('/actions')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Ver Todos
            </button>
          </div>
          <div className="space-y-4">
            {recentActions.map((action) => (
              <div
                key={action.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/actions/${action.id}`)}
              >
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    {action.title}
                  </h3>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500">
                      {action.area}
                    </span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-xs text-gray-500">
                      Vence: {new Date(action.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          action.status === 'completed' ? 'bg-green-600' :
                          action.status === 'in-progress' ? 'bg-blue-600' :
                          'bg-amber-600'
                        }`}
                        style={{ width: `${action.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 ml-4" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Data Entry */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Ingreso de Datos
            </h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Registra los datos de la semana actual para todas las áreas
          </p>
          <button
            onClick={() => navigate('/input')}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Upload className="w-4 h-4 mr-2" />
            Ingresar Datos
          </button>
        </div>

        {/* Reports */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Reportes
            </h2>
            <BarChart className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Visualiza los reportes y análisis de tendencias
          </p>
          <button
            onClick={() => navigate('/reports')}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Ver Reportes
          </button>
        </div>

        {/* Action Plans */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Planes de Acción
            </h2>
            <Target className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Gestiona y da seguimiento a los planes de acción
          </p>
          <button
            onClick={() => navigate('/actions')}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Ver Planes
          </button>
        </div>
      </div>
    </div>
  );
};