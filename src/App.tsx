import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { LoginPage } from './components/auth/LoginPage';
import { Home } from './components/Home';
import { SecurityDashboard } from './components/SecurityDashboard';
import { InputDataLayout } from './components/input/InputDataLayout';
import { ActionPlanPage } from './components/ActionPlanPage';
import { ActionPlansHistory } from './components/ActionPlansHistory';
import { ProfilePage } from './components/user/ProfilePage';
import { SettingsPage } from './components/settings/SettingsPage';
import { KnowledgeBasePage } from './components/user/KnowledgeBasePage';
import { HelpPage } from './components/user/HelpPage';
import { UserManagement } from './components/users/UserManagement';
import { RolesAndPermissions } from './components/users/RolesAndPermissions';
import { Assignments } from './components/users/Assignments';
import { ActivityAudit } from './components/users/ActivityAudit';
import { KPIManagement } from './components/kpi/KPIManagement';
import { useKPIStore } from './store/kpiStore';
import { kpiAreas } from './config/kpiConfig';

export default function App() {
  const { isAuthenticated } = useKPIStore();

  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />
            
            {/* Dashboards */}
            <Route path="/dashboards/safety" element={<SecurityDashboard config={kpiAreas.find(area => area.name === 'Safety')!} />} />
            
            {/* Input Data */}
            <Route path="/input" element={<InputDataLayout />} />
            <Route path="/input/:area" element={<InputDataLayout />} />
            
            {/* Action Plans */}
            <Route path="/actions" element={<ActionPlansHistory />} />
            <Route path="/actions/new" element={<ActionPlanPage />} />
            
            {/* User Management */}
            <Route path="/users/management" element={<UserManagement />} />
            <Route path="/users/roles" element={<RolesAndPermissions />} />
            <Route path="/users/assignments" element={<Assignments />} />
            <Route path="/users/audit" element={<ActivityAudit />} />
            
            {/* KPI Management */}
            <Route path="/kpi-management" element={<KPIManagement />} />
            
            {/* Settings */}
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/settings/personal" element={<SettingsPage />} />
            <Route path="/settings/company" element={<SettingsPage />} />
            
            {/* User Profile & Help */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/knowledge" element={<KnowledgeBasePage />} />
            <Route path="/help" element={<HelpPage />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      )}
    </Router>
  );
}