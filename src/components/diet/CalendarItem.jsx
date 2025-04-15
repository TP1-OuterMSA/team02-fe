import React from 'react';
import clsx from 'clsx';

const CalendarItem = ({idx, date, isToday}) => {
  const weekDays = ["월", "화", "수", "목", "금", "토", "일"];
  return (
      <div className="flex flex-col items-center">
        <p className={clsx("text-lg font-semibold mb-1.5", isToday ? "text-(--primary) font-bold" : "text-zinc-600")}>{weekDays[idx]}</p>
        <div className={clsx("w-9 h-9 rounded-full flex items-center justify-center", isToday ? "bg-(--primary)" : "")}>
          <p className={clsx("text-base font-semibold", isToday ? "text-white" : "text-zinc-600")}>{date}</p>
        </div>
      </div>
  );
};

export default CalendarItem;