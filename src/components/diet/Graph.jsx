import { useEffect, useState } from 'react';

const Graph = ({ title, percentage, color }) => {
  const [width, setWidth] = useState('0%');

  useEffect(() => {
    // 컴포넌트가 마운트되면 퍼센트로 width 변경
    setTimeout(() => {
      setWidth(`${percentage}%`);
    }, 100); // 살짝 delay를 주면 더 부드러움
  }, [percentage]);

  return (
    <div className="flex flex-col items-center">
      <p className="text-center text-black text-lg font-semibold">{title}</p>
      <div className="w-24 h-3.5 rounded-md bg-indigo-100 mt-2 overflow-hidden">
        <div
          className={`rounded-md h-full ${color}`}
          style={{
            width: width,
            transition: 'width 1s ease-in-out',
          }}
        ></div>
      </div>
      <p className="text-black text-xl font-semibold mt-1">{percentage}%</p>
    </div>
  );
};

export default Graph;
