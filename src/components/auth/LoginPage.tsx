import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ExternalLink } from 'lucide-react';
import { useKPIStore } from '../../store/kpiStore';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useKPIStore(state => state.login);
  const [email, setEmail] = useState('demo@company.com');
  const [password, setPassword] = useState('Demo123!');
  const [rememberMe, setRememberMe] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTwoFactor(true);
  };

  const handleTwoFactorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (twoFactorCode === '123456') { // Demo code
      login();
      navigate('/');
    }
  };

  const handleMicrosoftLogin = () => {
    // En un caso real, esto redireccionaría a Microsoft OAuth
    alert('Redireccionando a Microsoft...');
  };

  return (
    <div className="flex h-screen">
      {/* Lado izquierdo - Foto */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
          alt="Industrial facility"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white p-8">
              <h2 className="text-4xl font-bold mb-4">Sistema de KPIs</h2>
              <p className="text-xl">Control y seguimiento de indicadores</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lado derecho - Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Bienvenido</h1>
            <p className="mt-2 text-gray-600">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          {!showTwoFactor ? (
            <form onSubmit={handleLogin} className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Correo Electrónico
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="usuario@empresa.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Recordarme
                    </label>
                  </div>
                  <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Iniciar Sesión
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={handleMicrosoftLogin}
                  className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Continuar con Microsoft
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleTwoFactorSubmit} className="mt-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Código de Verificación
                </label>
                <p className="mt-1 text-sm text-gray-500">
                  Hemos enviado un código a tu correo electrónico
                </p>
                <div className="mt-2">
                  <input
                    type="text"
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="123456"
                    maxLength={6}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Verificar
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};