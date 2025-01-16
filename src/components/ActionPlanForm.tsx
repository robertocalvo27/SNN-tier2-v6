import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

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

interface ActionPlanFormProps {
  causes: Cause[];
  onComplete: (actions: Action[]) => void;
}

export const ActionPlanForm: React.FC<ActionPlanFormProps> = ({
  causes,
  onComplete
}) => {
  const [actions, setActions] = useState<Action[]>([]);
  const [newAction, setNewAction] = useState<Omit<Action, 'id'>>({
    causeId: '',
    description: '',
    responsible: '',
    dueDate: '',
    status: 'pending'
  });

  const handleAddAction = () => {
    if (!newAction.causeId || !newAction.description || !newAction.responsible || !newAction.dueDate) {
      return;
    }

    setActions([...actions, { ...newAction, id: Date.now().toString() }]);
    setNewAction({
      causeId: '',
      description: '',
      responsible: '',
      dueDate: '',
      status: 'pending'
    });
  };

  const handleRemoveAction = (id: string) => {
    setActions(actions.filter(action => action.id !== id));
  };

  const calculateProgress = () => {
    if (actions.length === 0) return 0;
    const completed = actions.filter(action => action.status === 'completed').length;
    return (completed / actions.length) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Plan de Acción
        </h3>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Causa
              </label>
              <select
                value={newAction.causeId}
                onChange={(e) => setNewAction({ ...newAction, causeId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Seleccionar causa</option>
                {causes.map((cause) => (
                  <option key={cause.id} value={cause.id}>
                    {cause.description}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Acción Correctiva
              </label>
              <input
                type="text"
                value={newAction.description}
                onChange={(e) => setNewAction({ ...newAction, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Descripción de la acción"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Responsable
              </label>
              <input
                type="text"
                value={newAction.responsible}
                onChange={(e) => setNewAction({ ...newAction, responsible: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Nombre del responsable"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha Límite
              </label>
              <input
                type="date"
                value={newAction.dueDate}
                onChange={(e) => setNewAction({ ...newAction, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <button
            onClick={handleAddAction}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Acción
          </button>
        </div>

        {actions.length > 0 && (
          <>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-700">
                  Progreso del Plan
                </h4>
                <span className="text-sm text-gray-500">
                  {calculateProgress().toFixed(0)}% Completado
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Causa
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acción
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Responsable
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha Límite
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {actions.map((action) => (
                    <tr key={action.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {causes.find(c => c.id === action.causeId)?.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {action.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {action.responsible}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(action.dueDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={action.status}
                          onChange={(e) => {
                            const newActions = actions.map(a =>
                              a.id === action.id
                                ? { ...a, status: e.target.value as Action['status'] }
                                : a
                            );
                            setActions(newActions);
                          }}
                          className="text-sm border-gray-300 rounded-md"
                        >
                          <option value="pending">Pendiente</option>
                          <option value="in-progress">En Proceso</option>
                          <option value="completed">Completado</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleRemoveAction(action.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => onComplete(actions)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar Plan de Acción
            </button>
          </>
        )}
      </div>
    </div>
  );
};