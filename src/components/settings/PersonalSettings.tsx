import React, { useState } from 'react';
import { 
  Bell, 
  Mail, 
  Monitor, 
  Moon, 
  Sun, 
  Palette,
  Shield,
  BadgeCheck,
  Truck,
  Factory,
  DollarSign,
  CheckCircle2
} from 'lucide-react';

export const PersonalSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: {
      actionPlans: true,
      dashboardChanges: false,
      notificationMethod: 'both'
    },
    theme: {
      mode: 'light',
      color: 'blue'
    },
    areas: ['Safety', 'Quality'],
    integrations: {
      api: true,
      excel: false
    }
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('¡Configuración personal actualizada correctamente!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const availableAreas = [
    { id: 'safety', name: 'Safety', icon: Shield },
    { id: 'quality', name: 'Quality', icon: BadgeCheck },
    { id: 'delivery', name: 'Delivery', icon: Truck },
    { id: 'production', name: 'Production', icon: Factory },
    { id: 'cost', name: 'Cost', icon: DollarSign }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
          <div className="flex items-center">
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
            <p className="text-green-700">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Notifications */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Preferencias de Notificaciones
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications.actionPlans}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    actionPlans: e.target.checked
                  }
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                Planes de acción pendientes o con fechas próximas
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications.dashboardChanges}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    dashboardChanges: e.target.checked
                  }
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                Cambios en los dashboards asignados
              </span>
            </label>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Método de Notificación
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="email"
                  checked={settings.notifications.notificationMethod === 'email'}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      notificationMethod: e.target.value
                    }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <Mail className="w-4 h-4 text-gray-400 ml-2" />
                <span className="ml-2 text-sm text-gray-700">
                  Correo electrónico
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  value="app"
                  checked={settings.notifications.notificationMethod === 'app'}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      notificationMethod: e.target.value
                    }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <Bell className="w-4 h-4 text-gray-400 ml-2" />
                <span className="ml-2 text-sm text-gray-700">
                  Notificaciones en la app
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  value="both"
                  checked={settings.notifications.notificationMethod === 'both'}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      notificationMethod: e.target.value
                    }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Ambos</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Preferences */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Personalización Visual
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tema
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSettings({
                  ...settings,
                  theme: { ...settings.theme, mode: 'light' }
                })}
                className={`flex items-center justify-center p-4 border rounded-lg ${
                  settings.theme.mode === 'light'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Sun className="w-5 h-5 mr-2 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">
                  Modo Claro
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSettings({
                  ...settings,
                  theme: { ...settings.theme, mode: 'dark' }
                })}
                className={`flex items-center justify-center p-4 border rounded-lg ${
                  settings.theme.mode === 'dark'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Moon className="w-5 h-5 mr-2 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">
                  Modo Oscuro
                </span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color Principal
            </label>
            <div className="grid grid-cols-6 gap-2">
              {['blue', 'green', 'purple', 'red', 'orange', 'pink'].map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSettings({
                    ...settings,
                    theme: { ...settings.theme, color }
                  })}
                  className={`w-8 h-8 rounded-full ${
                    settings.theme.color === color
                      ? 'ring-2 ring-offset-2 ring-blue-500'
                      : ''
                  } bg-${color}-500`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Areas */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Áreas de Trabajo
        </h2>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Áreas asignadas actualmente:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableAreas.map((area) => {
              const isAssigned = settings.areas.includes(area.name);
              return (
                <div
                  key={area.id}
                  className={`flex items-center p-4 border rounded-lg ${
                    isAssigned
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  <area.icon className={`w-5 h-5 ${
                    isAssigned ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    {area.name}
                  </span>
                  {!isAssigned && (
                    <button
                      type="button"
                      className="ml-auto text-sm text-blue-600 hover:text-blue-500"
                    >
                      Solicitar Acceso
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Guardar Configuración Personal
        </button>
      </div>
    </form>
  );
};