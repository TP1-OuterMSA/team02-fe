import clsx from 'clsx';

const SmallButton = ({text,style, onClick}) => {
  return (
    <div className={clsx("p-2 bg-blue-800 rounded-md cursor-pointer", style)} onClick={onClick}>
      <p className="text-white text-xs font-normal">{text}</p>
    </div>
  );
};

export default SmallButton;