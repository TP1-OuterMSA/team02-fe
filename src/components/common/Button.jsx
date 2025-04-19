import clsx from "clsx";

const Button = ({text, onClick, style}) => {
  return (
      <div className="w-36">
        <button onClick={onClick} className={clsx("font-bold text-white cursor-pointer pt-4 pb-4 rounded-lg w-full", style ? `${style}` : "bg-(--primary)")}>
          {text}
        </button>
      </div>
  );
};

export default Button;