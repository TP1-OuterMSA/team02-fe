const Button = ({text, onClick}) => {
  return (
      <div className="w-36">
        <button onClick={onClick} className="bg-(--primary) text-white cursor-pointer pt-4 pb-4 rounded-lg w-full">
          {text}
        </button>
      </div>
  );
};

export default Button;