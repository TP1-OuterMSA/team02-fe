import React from 'react';
import clsx from 'clsx';

const CalendarItem = ({idx, date, isSelect, onClick}) => {
  const weekDays = ["월", "화", "수", "목", "금", "토", "일"];
  return (
      <div className="flex max-xl:flex-col max-xl:gap-0 gap-2 items-center cursor-pointer" onClick={onClick}>
        <p className={clsx("text-lg font-semibold max-xl:mb-1.5", isSelect ? "text-(--primary) font-bold" : "text-zinc-600")}>{weekDays[idx]}</p>
        <div className={clsx("w-9 h-9 rounded-full flex items-center justify-center", isSelect ? "bg-(--primary)" : "")}>
          <p className={clsx("text-base font-semibold", isSelect ? "text-white" : "text-zinc-600")}>{date}</p>
        </div>
      </div>
  );
};

export default CalendarItem;