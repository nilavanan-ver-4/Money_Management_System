import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Button } from '@/components/ui/Button';

ChartJS.register(ArcElement, Tooltip, Legend);

const budgetData = {
  labels: ['Housing', 'Transportation', 'Food', 'Utilities', 'Entertainment', 'Savings'],
  datasets: [
    {
      data: [1500, 400, 600, 300, 200, 1000],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const categories = [
  { name: 'Housing', budget: 1500, spent: 1450, color: 'bg-red-100 text-red-800' },
  { name: 'Transportation', budget: 400, spent: 350, color: 'bg-blue-100 text-blue-800' },
  { name: 'Food', budget: 600, spent: 580, color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Utilities', budget: 300, spent: 280, color: 'bg-teal-100 text-teal-800' },
  { name: 'Entertainment', budget: 200, spent: 150, color: 'bg-purple-100 text-purple-800' },
  { name: 'Savings', budget: 1000, spent: 1000, color: 'bg-orange-100 text-orange-800' },
];

export function Budget() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Budget Overview</h2>
        <Button>Edit Budget</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Budget Allocation</h3>
          <div className="aspect-square">
            <Pie data={budgetData} />
          </div>
        </div>

        {/* Budget Categories */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Budget Categories</h3>
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">{category.name}</span>
                  <span className="text-sm text-gray-500">
                    ${category.spent} / ${category.budget}
                  </span>
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${(category.spent / category.budget) * 100}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">AI Budget Recommendations</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">Optimize Food Budget</p>
              <p className="mt-1 text-sm text-gray-500">
                You're close to your food budget limit. Consider meal prepping to reduce restaurant expenses.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">Savings Goal Progress</p>
              <p className="mt-1 text-sm text-gray-500">
                You've met your savings goal! Consider increasing your monthly savings target by 10% to accelerate your financial growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}