import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ParetoAnalysis } from './ParetoAnalysis';
import { ActionPlanForm } from './ActionPlanForm';

interface Cause {
  id: string;
  description: string;
  units: number;
  comments?: string;
}

interface Action {
  id: string;
  causeId: string;
  description: string;
  responsible: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export const ActionPlanPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState<'pareto' | 'plan'>('pareto');
  const [causes, setCauses] = useState<Cause[]>([]);
  const { metric, value, target, line, date } = location.state || {};

  const handleParetoComplete = (causes: Cause[]) => {
    setCauses(causes);
    setStep('plan');
  };

  const handlePlanComplete = (actions: Action[]) => {
    // Here you would typically save the action plan to your backend
    console.log('Action Plan:', { causes, actions });
    navigate('/actions');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Plan de Acción Correctiva
        </h2>
        
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Métrica
              </label>
              <span className="text-gray-900">{metric}</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Valor Actual
              </label>
              <span className="text-red-600">{value}%</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Meta
              </label>
              <span className="text-gray-900">{target}%</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Línea
              </label>
              <span className="text-gray-900">{line}</span>
            </div>
          </div>
        </div>

        {step === 'pareto' ? (
          <ParetoAnalysis onComplete={handleParetoComplete} />
        ) : (
          <ActionPlanForm
            causes={causes}
            onComplete={handlePlanComplete}
          />
        )}
      </div>
    </div>
  );
};