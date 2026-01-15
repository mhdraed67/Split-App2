import React from 'react';

const ExpenseList = ({ expenses, onEdit, onDelete, loading }) => {
  if (loading) {
    return <div className="text-center py-8">Loading expenses...</div>;
  }

  if (expenses.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow-md">
        <p className="text-gray-500">No expenses found. Start by adding a new expense!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{expense.description}</td>
              <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                ${parseFloat(expense.amount).toFixed(2)}
              </td>
              <td className="px-6 py-4 text-sm">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {expense.category}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {new Date(expense.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm">
                <button
                  onClick={() => onEdit(expense)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(expense.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
