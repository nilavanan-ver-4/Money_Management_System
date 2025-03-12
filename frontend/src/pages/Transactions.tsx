import React from 'react';
import { format } from 'date-fns';
import { 
  ShoppingBag, 
  Coffee, 
  Home, 
  Car, 
  Utensils,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const transactions = [
  {
    id: 1,
    date: new Date(2024, 1, 28),
    description: 'Grocery Shopping',
    category: 'Shopping',
    amount: -120.50,
    icon: ShoppingBag,
  },
  {
    id: 2,
    date: new Date(2024, 1, 28),
    description: 'Coffee Shop',
    category: 'Food & Drink',
    amount: -4.50,
    icon: Coffee,
  },
  {
    id: 3,
    date: new Date(2024, 1, 27),
    description: 'Rent Payment',
    category: 'Housing',
    amount: -1500.00,
    icon: Home,
  },
  {
    id: 4,
    date: new Date(2024, 1, 27),
    description: 'Gas Station',
    category: 'Transportation',
    amount: -45.00,
    icon: Car,
  },
  {
    id: 5,
    date: new Date(2024, 1, 26),
    description: 'Restaurant',
    category: 'Food & Drink',
    amount: -65.00,
    icon: Utensils,
  },
];

export function Transactions() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
        <Button>Add Transaction</Button>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search transactions..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      {/* Transactions List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {transactions.map((transaction) => {
            const Icon = transaction.icon;
            return (
              <li key={transaction.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full ${
                        transaction.amount < 0 ? 'bg-red-100' : 'bg-green-100'
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                        }`} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {transaction.category}
                        </p>
                      </div>
                    </div>
                    <div className="ml-6 flex items-center">
                      <p className={`text-sm font-medium ${
                        transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {transaction.amount < 0 ? '-' : '+'}
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <p className="ml-4 text-sm text-gray-500">
                        {format(transaction.date, 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}