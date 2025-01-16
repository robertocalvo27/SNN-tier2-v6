import React, { useState } from 'react';
import { 
  Save,
  Upload,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Lock,
  Database,
  CheckCircle2,
  Link,
  Webhook,
  FileSpreadsheet,
  Settings,
  Server,
  Network,
  Camera
} from 'lucide-react';

export const CompanySettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [successMessage, setSuccessMessage] = useState('');
  const [companyData, setCompanyData] = useState({
    name: 'Mi Empresa',
    legalName: 'Mi Empresa S.A.',
    taxId: '12345678901',
    email: 'contacto@miempresa.com',
    phone: '+1234567890',
    address: 'Calle Principal 123',
    city: 'Ciudad',
    country: 'País',
    logo: null as File | null,
    favicon: null as File | null,
    colors: {
      primary: '#3B82F6',
      secondary: '#10B981'
    },
    welcomeMessage: '¡Bienvenido al sistema de gestión de KPIs!',
    backupFrequency: 'daily',
    securitySettings: {
      twoFactor: true,
      passwordPolicy: true,
      locationAlerts: true
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('¡Configuración empresarial actualizada correctamente!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleFileChange = (field: 'logo' | 'favicon') => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCompanyData({ ...companyData, [field]: e.target.files[0] });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre de la Empresa
                </label>
                <input
                  type="text"
                  value={companyData.name}
                  onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Razón Social
                </label>
                <input
                  type="text"
                  value={companyData.legalName}
                  onChange={(e) => setCompanyData({ ...companyData, legalName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  RUC
                </label>
                <input
                  type="text"
                  value={companyData.taxId}
                  onChange={(e) => setCompanyData({ ...companyData, taxId: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={companyData.email}
                  onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={companyData.phone}
                  onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dirección
                </label>
                <input
                  type="text"
                  value={companyData.address}
                  onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ciudad
                </label>
                <input
                  type="text"
                  value={companyData.city}
                  onChange={(e) => setCompanyData({ ...companyData, city: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  País
                </label>
                <input
                  type="text"
                  value={companyData.country}
                  onChange={(e) => setCompanyData({ ...companyData, country: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );

      case 'branding':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logotipo
              </label>
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 border-2 border-gray-300 border-dashed rounded-lg flex items-center justify-center">
                  {companyData.logo ? (
                    <img
                      src={URL.createObjectURL(companyData.logo)}
                      alt="Logo preview"
                      className="w-20 h-20 object-contain"
                    />
                  ) : (
                    <Upload className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    id="logo"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange('logo')}
                  />
                  <label
                    htmlFor="logo"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Subir Logotipo
                  </label>
                  <p className="mt-1 text-sm text-gray-500">
                    PNG o JPG. Máximo 1MB
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Favicon
              </label>
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 border-2 border-gray-300 border-dashed rounded-lg flex items-center justify-center">
                  {companyData.favicon ? (
                    <img
                      src={URL.createObjectURL(companyData.favicon)}
                      alt="Favicon preview"
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <Upload className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    id="favicon"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange('favicon')}
                  />
                  <label
                    htmlFor="favicon"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Subir Favicon
                  </label>
                  <p className="mt-1 text-sm text-gray-500">
                    PNG o ICO. 16x16px
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Colores de Marca
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Color Primario
                  </label>
                  <input
                    type="color"
                    value={companyData.colors.primary}
                    onChange={(e) => setCompanyData({
                      ...companyData,
                      colors: { ...companyData.colors, primary: e.target.value }
                    })}
                    className="h-10 w-full rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Color Secundario
                  </label>
                  <input
                    type="color"
                    value={companyData.colors.secondary}
                    onChange={(e) => setCompanyData({
                      ...companyData,
                      colors: { ...companyData.colors, secondary: e.target.value }
                    })}
                    className="h-10 w-full rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mensaje de Bienvenida
              </label>
              <textarea
                value={companyData.welcomeMessage}
                onChange={(e) => setCompanyData({ ...companyData, welcomeMessage: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Mensaje que se mostrará en los dashboards"
              />
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Configuración de Seguridad
              </h3>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={companyData.securitySettings.twoFactor}
                    onChange={(e) => setCompanyData({
                      ...companyData,
                      securitySettings: {
                        ...companyData.securitySettings,
                        twoFactor: e.target.checked
                      }
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Autenticación de dos factores (2FA)
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={companyData.securitySettings.passwordPolicy}
                    onChange={(e) => setCompanyData({
                      ...companyData,
                      securitySettings: {
                        ...companyData.securitySettings,
                        passwordPolicy: e.target.checked
                      }
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Política de contraseñas seguras
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={companyData.securitySettings.locationAlerts}
                    onChange={(e) => setCompanyData({
                      ...companyData,
                      securitySettings: {
                        ...companyData.securitySettings,
                        locationAlerts: e.target.checked
                      }
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Alertas de inicio de sesión desde ubicaciones no reconocidas
                  </span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Respaldos
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frecuencia de Respaldos
                </label>
                <select
                  value={companyData.backupFrequency}
                  onChange={(e) => setCompanyData({ ...companyData, backupFrequency: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="daily">Diario</option>
                  <option value="weekly">Semanal</option>
                  <option value="monthly">Mensual</option>
                </select>
              </div>
              <button
                type="button"
                className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Database className="w-4 h-4 mr-2" />
                Realizar Respaldo Manual
              </button>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Integraciones
            </h2>

            {/* ERP Integration */}
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Server className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">ERP</h3>
                    <p className="text-sm text-gray-500">Integración con sistema ERP empresarial</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Configurar
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Estado</h4>
                    <p className="text-sm text-gray-500">No conectado</p>
                  </div>
                  <div className="h-2.5 w-2.5 rounded-full bg-gray-400"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">Última sincronización</h4>
                    <p className="text-sm text-gray-500">N/A</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">Registros sincronizados</h4>
                    <p className="text-sm text-gray-500">0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Excel Integration */}
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <FileSpreadsheet className="w-8 h-8 text-green-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Excel</h3>
                    <p className="text-sm text-gray-500">Importación/Exportación de datos</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Importar
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Exportar
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">Plantillas disponibles</h4>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-center text-sm text-gray-600">
                      <FileSpreadsheet className="w-4 h-4 mr-2" />
                      Plantilla de KPIs
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FileSpreadsheet className="w-4 h-4 mr-2" />
                      Plantilla de Planes de Acción
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'advanced':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Integraciones Avanzadas
            </h2>

            {/* API Configuration */}
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Webhook className="w-8 h-8 text-purple-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">API REST</h3>
                    <p className="text-sm text-gray-500">Configuración de API para integraciones personalizadas</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Generar Token
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">Endpoints disponibles</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <code className="bg-gray-100 px-2 py-1 rounded">/api/v1/kpis</code>
                      <span className="text-green-600">GET, POST</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <code className="bg-gray-100 px-2 py-1 rounded">/api/v1/actions</code>
                      <span className="text-green-600">GET, POST, PUT</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Integrations */}
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Network className="w-8 h-8 text-indigo-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Integraciones Personalizadas</h3>
                    <p className="text-sm text-gray-500">Configuración de webhooks y eventos</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Añadir Webhook
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">Webhooks configurados</h4>
                  <p className="text-sm text-gray-500 mt-1">No hay webhooks configurados</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">Eventos disponibles</h4>
                  <ul className="mt-2 space-y-2">
                    <li className="text-sm text-gray-600">• Actualización de KPIs</li>
                    <li className="text-sm text-gray-600">• Creación de planes de acción</li>
                    <li className="text-sm text-gray-600">• Cambios en configuración</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Configuración Empresarial</h1>
        <p className="text-gray-500">Gestiona la información y configuración de tu empresa</p>
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

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-lg">
        <nav className="flex space-x-4 p-4 border-b">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'info'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Building2 className="w-4 h-4 inline-block mr-2" />
            Información Básica
          </button>
          <button
            onClick={() => setActiveTab('branding')}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'branding'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Globe className="w-4 h-4 inline-block mr-2" />
            Personalización
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'security'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Lock className="w-4 h-4 inline-block mr-2" />
            Seguridad y Respaldos
          </button>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'integrations'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Link className="w-4 h-4 inline-block mr-2" />
            Integraciones
          </button>
          <button
            onClick={() => setActiveTab('advanced')}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'advanced'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Settings className="w-4 h-4 inline-block mr-2" />
            Integraciones Avanzadas
          </button>
        </nav>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {renderContent()}
          </form>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Save className="w-4 h-4 mr-2" />
          Guardar Configuración
        </button>
      </div>
    </div>
  );
};