import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileBarChart,
  Target,
  Settings,
  Shield,
  BadgeCheck,
  Truck,
  Factory,
  DollarSign,
  ChevronDown,
  Upload,
  Home,
  User,
  HelpCircle,
  Book,
  Sun,
  Moon,
  LogOut,
  Users,
  UserCog,
  ClipboardList,
  History,
  BarChart2,
  Building2
} from 'lucide-react';
import { useKPIStore } from '../../store/kpiStore';

interface SidebarProps {
  isCollapsed: boolean;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  title: string;
  path: string;
  isActive: boolean;
  hasSubItems?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  subItems?: Array<{
    title: string;
    path: string;
    icon: React.ElementType;
  }>;
  isCollapsed?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  title,
  path,
  isActive,
  hasSubItems,
  isOpen,
  onToggle,
  subItems,
  isCollapsed
}) => {
  const navigate = useNavigate();

  return (
    <div className="mb-2">
      <button
        onClick={() => hasSubItems ? onToggle?.() : navigate(path)}
        className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
          isActive
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <span className="mr-3">{icon}</span>
        {!isCollapsed && (
          <>
            <span className="flex-1 text-left">{title}</span>
            {hasSubItems && (
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
              />
            )}
          </>
        )}
      </button>
      {hasSubItems && isOpen && !isCollapsed && (
        <div className="ml-12 mt-2 space-y-2">
          {subItems?.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center text-left px-4 py-2 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-4 h-4 mr-2" />
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useKPIStore(state => state.logout);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    dashboards: false,
    reports: false,
    input: false,
    actions: false,
    users: false,
    kpi: false,
    settings: false
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleSection = (section: string) => {
    if (!isCollapsed) {
      setOpenSections(prev => ({
        ...prev,
        [section]: !prev[section]
      }));
    }
  };

  const dashboardItems = [
    { title: 'Safety', path: '/dashboards/safety', icon: Shield },
    { title: 'Quality', path: '/dashboards/quality', icon: BadgeCheck },
    { title: 'Delivery', path: '/dashboards/delivery', icon: Truck },
    { title: 'Production', path: '/dashboards/production', icon: Factory },
    { title: 'Cost', path: '/dashboards/cost', icon: DollarSign }
  ];

  const inputItems = [
    { title: 'Safety', path: '/input/safety', icon: Shield },
    { title: 'Quality', path: '/input/quality', icon: BadgeCheck },
    { title: 'Delivery', path: '/input/delivery', icon: Truck },
    { title: 'Production', path: '/input/production', icon: Factory },
    { title: 'Cost', path: '/input/cost', icon: DollarSign }
  ];

  const actionItems = [
    { title: 'Ver Todos', path: '/actions', icon: Target },
    { title: 'Nuevo Plan', path: '/actions/new', icon: Target }
  ];

  const userItems = [
    { title: 'Gestión de Usuarios', path: '/users/management', icon: Users },
    { title: 'Roles y Permisos', path: '/users/roles', icon: UserCog },
    { title: 'Asignaciones', path: '/users/assignments', icon: ClipboardList },
    { title: 'Auditoría de Actividad', path: '/users/audit', icon: History }
  ];

  const kpiItems = [
    { title: 'Value Streams', path: '/kpi-management?tab=valueStreams', icon: Factory },
    { title: 'KPIs', path: '/kpi-management?tab=kpis', icon: Target },
    { title: 'Tiers', path: '/kpi-management?tab=tiers', icon: BarChart2 }
  ];

  const settingsItems = [
    { title: 'Configuración Personal', path: '/settings/personal', icon: User },
    { title: 'Configuración Empresarial', path: '/settings/company', icon: Building2 }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`h-screen bg-white border-r border-gray-200 flex flex-col ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Logo */}
      <div className={`px-6 py-6 border-b border-gray-200 ${isCollapsed ? 'flex justify-center' : ''}`}>
        <div className="flex items-center space-x-3">
          <LayoutDashboard className="w-8 h-8 text-blue-600" />
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-gray-900">KPI System</h1>
              <p className="text-sm text-gray-500">TIER 2 Control</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        <SidebarItem
          icon={<Home className="w-5 h-5" />}
          title="Home"
          path="/"
          isActive={location.pathname === '/'}
          isCollapsed={isCollapsed}
        />

        <SidebarItem
          icon={<LayoutDashboard className="w-5 h-5" />}
          title="Dashboards"
          path="/dashboards"
          isActive={location.pathname.startsWith('/dashboards')}
          hasSubItems
          isOpen={openSections.dashboards}
          onToggle={() => toggleSection('dashboards')}
          subItems={dashboardItems}
          isCollapsed={isCollapsed}
        />

        <SidebarItem
          icon={<FileBarChart className="w-5 h-5" />}
          title="Reportes"
          path="/reports"
          isActive={location.pathname.startsWith('/reports')}
          hasSubItems
          isOpen={openSections.reports}
          onToggle={() => toggleSection('reports')}
          subItems={dashboardItems}
          isCollapsed={isCollapsed}
        />

        <SidebarItem
          icon={<Upload className="w-5 h-5" />}
          title="Input Data"
          path="/input"
          isActive={location.pathname.startsWith('/input')}
          hasSubItems
          isOpen={openSections.input}
          onToggle={() => toggleSection('input')}
          subItems={inputItems}
          isCollapsed={isCollapsed}
        />

        <SidebarItem
          icon={<Target className="w-5 h-5" />}
          title="Planes de Acción"
          path="/actions"
          isActive={location.pathname.startsWith('/actions')}
          hasSubItems
          isOpen={openSections.actions}
          onToggle={() => toggleSection('actions')}
          subItems={actionItems}
          isCollapsed={isCollapsed}
        />

        <SidebarItem
          icon={<Users className="w-5 h-5" />}
          title="Usuarios"
          path="/users"
          isActive={location.pathname.startsWith('/users')}
          hasSubItems
          isOpen={openSections.users}
          onToggle={() => toggleSection('users')}
          subItems={userItems}
          isCollapsed={isCollapsed}
        />

        <SidebarItem
          icon={<BarChart2 className="w-5 h-5" />}
          title="Gestión de KPIs"
          path="/kpi-management"
          isActive={location.pathname.startsWith('/kpi-management')}
          hasSubItems
          isOpen={openSections.kpi}
          onToggle={() => toggleSection('kpi')}
          subItems={kpiItems}
          isCollapsed={isCollapsed}
        />

        <SidebarItem
          icon={<Settings className="w-5 h-5" />}
          title="Configuración"
          path="/settings"
          isActive={location.pathname.startsWith('/settings')}
          hasSubItems
          isOpen={openSections.settings}
          onToggle={() => toggleSection('settings')}
          subItems={settingsItems}
          isCollapsed={isCollapsed}
        />
      </nav>

      {/* User Menu */}
      <div className="relative px-4 py-4 border-t border-gray-200">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className={`w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors ${
            showUserMenu ? 'bg-gray-100' : ''
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-medium text-gray-600">US</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-900">Usuario</p>
              <p className="text-xs text-gray-500">Supervisor</p>
            </div>
          )}
        </button>

        {/* User dropdown menu */}
        {showUserMenu && !isCollapsed && (
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
            <button
              onClick={() => navigate('/profile')}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <User className="w-4 h-4 mr-3" />
              Perfil
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Settings className="w-4 h-4 mr-3" />
              Configuración
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 mr-3" />
              ) : (
                <Moon className="w-4 h-4 mr-3" />
              )}
              Modo {isDarkMode ? 'Claro' : 'Oscuro'}
            </button>
            <button
              onClick={() => navigate('/knowledge')}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Book className="w-4 h-4 mr-3" />
              Knowledge Base
            </button>
            <button
              onClick={() => navigate('/help')}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <HelpCircle className="w-4 h-4 mr-3" />
              Ayuda
            </button>
            <hr className="my-2" />
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
};