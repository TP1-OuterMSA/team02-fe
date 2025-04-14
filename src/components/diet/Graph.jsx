import React from 'react';

const Graph = ({title, current, amount, percentage, color}) => {
  return (
      <div className="flex flex-col items-center">
        <p className="text-center justify-start text-black text-lg font-semibold">{title}</p>
        <div className="w-24 h-3.5 rounded-md bg-indigo-100 mt-2"><div className={`h-full w-5 ${color}`}></div></div>
        <p className="text-black text-xl font-semibold mt-1">{percentage}%</p>
      </div>
  );
};

export default Graph;