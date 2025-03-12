import React from 'react';
import { Line } from 'react-chartjs-2';
import { TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';

const monthlyData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Income',
      data: [4200, 4200, 4200, 4200, 4200, 4200],
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.5)',
      tension: 0.4,
    },
    {
      label: 'Expenses',
      data: [2800, 3100, 2900, 3000, 2700, 2900],
      borderColor: 'rgb(239, 68, 68)',
      backgroundColor: 'rgba(239, 68, 68, 0.5)',
      tension: 0.4,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export function Insights() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Financial Insights</h2>

      {/* Income vs Expenses Chart */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Income vs Expenses Trend
        </h3>
        <div className="h-80">
          <Line options={options} data={monthlyData} />
        </div>
      </div>

      {/* AI Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Spending Patterns */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-6 w-6 text-blue-500" />
            <h3 className="ml-2 text-lg font-medium text-gray-900">
              Spending Patterns
            </h3>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm font-medium text-gray-900">
                Recurring Expenses
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Your subscription services account for 15% of monthly expenses. Consider reviewing unused subscriptions.
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm font-medium text-gray-900">
                Weekend Spending
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Weekend entertainment expenses have increased by 25% compared to last month.
              </p>
            </div>
          </div>
        </div>

        {/* Fraud Detection */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
            <h3 className="ml-2 text-lg font-medium text-gray-900">
              Fraud Detection
            </h3>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4">
              <p className="text-sm font-medium text-gray-900">
                Unusual Activity
              </p>
              <p className="mt-1 text-sm text-gray-500">
                No suspicious transactions detected in the last 30 days.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-sm font-medium text-gray-900">
                Security Status
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Your account security measures are up to date.
              </p>
            </div>
          </div>
        </div>

        {/* Savings Opportunities */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <DollarSign className="h-6 w-6 text-green-500" />
            <h3 className="ml-2 text-lg font-medium text-gray-900">
              Savings Opportunities
            </h3>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-sm font-medium text-gray-900">
                Potential Savings
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Switch to annual billing for subscriptions to save up to $240 annually.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-sm font-medium text-gray-900">
                Smart Goals
              </p>
              <p className="mt-1 text-sm text-gray-500">
                You're on track to reach your emergency fund goal in 3 months.
              </p>
            </div>
          </div>
        </div>

        {/* Financial Health Score */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Financial Health Score
          </h3>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeDasharray="85, 100"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-3xl font-bold text-gray-900">85</div>
                <div className="text-sm text-gray-500">Excellent</div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500 text-center">
            Your financial health score has improved by 5 points since last month
          </div>
        </div>
      </div>
    </div>
  );
}