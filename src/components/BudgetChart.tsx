"use client";

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

const data = [
  { month: 'T1', actual: 180, forecast: 175, baseline: 160 },
  { month: 'T2', actual: 165, forecast: 170, baseline: 155 },
  { month: 'T3', actual: 195, forecast: 190, baseline: 180 },
  { month: 'T4', actual: 210, forecast: 205, baseline: 190 },
  { month: 'T5', actual: 190, forecast: 195, baseline: 175 },
  { month: 'T6', actual: null, forecast: 215, baseline: 195 },
  { month: 'T7', actual: null, forecast: 220, baseline: 200 },
  { month: 'T8', actual: null, forecast: 205, baseline: 190 },
  { month: 'T9', actual: null, forecast: 230, baseline: 210 },
  { month: 'T10', actual: null, forecast: 240, baseline: 215 },
  { month: 'T11', actual: null, forecast: 225, baseline: 205 },
  { month: 'T12', actual: null, forecast: 250, baseline: 220 },
];

export function BudgetChart() {
  const [gdpImpact, setGdpImpact] = useState(0);
  const [oilImpact, setOilImpact] = useState(0);

  // Apply What-if adjustments
  const adjustedData = data.map(item => ({
    ...item,
    forecast: item.forecast ? item.forecast * (1 + gdpImpact/100) * (1 + oilImpact/100) : null
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Mô phỏng Tăng trưởng GDP: {gdpImpact > 0 ? '+' : ''}{gdpImpact}%
          </label>
          <input 
            type="range" 
            min="-5" max="5" step="0.5"
            value={gdpImpact}
            onChange={(e) => setGdpImpact(parseFloat(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Mô phỏng Giá dầu thô: {oilImpact > 0 ? '+' : ''}{oilImpact}%
          </label>
          <input 
            type="range" 
            min="-20" max="20" step="1"
            value={oilImpact}
            onChange={(e) => setOilImpact(parseFloat(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={adjustedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="month" />
            <YAxis unit="T" />
            <Tooltip 
                formatter={(value: any) => {
                  if (typeof value === 'number') {
                    return [`${value.toFixed(1)} Nghìn tỷ`, ''];
                  }
                  return [value, ''];
                }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="top" height={36}/>
            <Area 
              type="monotone" 
              dataKey="actual" 
              name="Thu Thực Tế (YTD)"
              stroke="#0f3c78" 
              fill="#0f3c78" 
              fillOpacity={0.1}
              strokeWidth={3} 
            />
            <Area 
              type="monotone" 
              dataKey="forecast" 
              name="Dự báo AI (XGBoost + PhoBERT)"
              stroke="#0ea5e9" 
              fill="#0ea5e9" 
              fillOpacity={0.2}
              strokeWidth={3} 
              strokeDasharray="5 5"
            />
             <Area 
              type="monotone" 
              dataKey="baseline" 
              name="Dự báo Cơ sở (Truyền thống)"
              stroke="#94a3b8" 
              fill="none" 
              strokeWidth={2} 
              strokeDasharray="3 3"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
