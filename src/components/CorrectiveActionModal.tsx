import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, X } from 'lucide-react';

interface CorrectiveActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  metric: {
    name: string;
    value: number;
    target: number;
  };
  line: string;
  date: string;
}

export const CorrectiveActionModal: React.FC<CorrectiveActionModalProps> = ({
  isOpen,
  onClose,
  metric,
  line,
  date
}) => {
  const navigate = useNavigate();
  
  if (!isOpen) return null;

  const handleStartCorrectiveAction = () => {
    // Navigate to the action plan page with pre-filled data
    navigate(`/actions/new`, {
      state: {
        metric: metric.name,
        value: metric.value,
        target: metric.target,
        line,
        date
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-amber-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              Valor por debajo de la meta
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            El valor registrado para {metric.name} está por debajo de la meta establecida:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Valor actual:</span>
              <span className="font-medium text-red-600">{metric.value}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Meta:</span>
              <span className="font-medium text-gray-900">{metric.target}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Diferencia:</span>
              <span className="font-medium text-red-600">
                {(metric.value - metric.target).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleStartCorrectiveAction}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Iniciar Acciones Correctivas
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Registrar sin acción
          </button>
        </div>
      </div>
    </div>
  );
};