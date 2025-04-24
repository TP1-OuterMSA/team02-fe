import clsx from 'clsx';

const Badges = ({name, isActive, onClick}) => {
  return (
    <div className={clsx('cursor-pointer rounded-3xl shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)] p-3 pr-4 pl-4', isActive ? 'bg-(--primary)': 'bg-white ')} onClick={onClick}>
      <p className={clsx("text-base font-bold", isActive ? 'text-white' : 'text-black')}>{name}</p>
    </div>
  );
};

export default Badges;