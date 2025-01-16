import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { KPIMetric } from '../types/kpi';

interface KPIMetricChartProps {
  metric: KPIMetric;
  data: Record<string, Record<string, number>>;
}

export const KPIMetricChart: React.FC<KPIMetricChartProps> = ({ metric, data }) => {
  const chartData = Object.entries(data).map(([line, values]) => {
    const latestDate = Object.keys(values).sort().pop() || '';
    return {
      name: line,
      valor: values[latestDate] || 0,
      meta: metric.target,
    };
  });

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <ReferenceLine y={metric.target} stroke="#10B981" strokeDasharray="3 3" label="Meta" />
          <Bar
            dataKey="valor"
            fill="#3B82F6"
            name="Valor Actual"
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};