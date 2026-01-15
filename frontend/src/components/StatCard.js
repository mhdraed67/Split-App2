import React from 'react';

const StatCard = ({ title, value, color = 'blue', icon }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    purple: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className={`${colorClasses[color]} rounded-lg p-6 shadow-md`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        {icon && <span className="text-4xl opacity-50">{icon}</span>}
      </div>
    </div>
  );
};

export default StatCard;
