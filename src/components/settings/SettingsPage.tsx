import React from 'react';
import { useLocation } from 'react-router-dom';
import { PersonalSettings } from './PersonalSettings';
import { CompanySettings } from './CompanySettings';

export const SettingsPage: React.FC = () => {
  const location = useLocation();
  const isCompanySettings = location.pathname === '/settings/company';
  const isPersonalSettings = location.pathname === '/settings/personal';
  const defaultView = !isCompanySettings && !isPersonalSettings;

  // Si estamos en /settings, mostrar configuración personal por defecto
  if (defaultView || isPersonalSettings) {
    return <PersonalSettings />;
  }

  // Si estamos en /settings/company, mostrar configuración empresarial
  return <CompanySettings />;
};