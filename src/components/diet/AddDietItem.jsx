import clsx from 'clsx';

const AddDietItem = ({foodName, foodWeight, kcal, onClick, active}) => {
  return (
    <div className={clsx("px-5 py-3.5 cursor-pointer rounded-xl border border-neutral-200 mt-3 cursor-pointer", active ? "bg-blue-800/20": "bg-white")} onClick={onClick}>
      <p className="text-black text-lg font-bold">{foodName}</p>
      <div className="flex justify-between">
        <p className="text-neutral-400 text-base font-bold">{Math.round(foodWeight)}g</p>
        <p className="text-neutral-400 text-base font-bold">{Math.round(kcal)} kcal</p>
      </div>
    </div>
  );
};

export default AddDietItem;