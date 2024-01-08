import clsx from "clsx";
import { FC } from "react";

type Props = {
  className?: string;
  title: string;
  isDisabled?: boolean;
  isHint?: boolean;
  isWrong?: boolean;
  onClick?: () => void;
}

const Button: FC<Props> = ({
  title, 
  onClick, 
  className, 
  isDisabled, 
  isHint, 
  isWrong
}) => {
  return (
    <button 
      className={clsx(
        className, 
        "w-full px-4 py-2 border border-gray-300 bg-blue-800",
        "overflow-hidden truncate transition-all ease-out duration-1000",
        [
          {'opacity-0 scale-y-0 scale-x-50': isDisabled},
          {'bg-green-800 scale-105': isHint},
          {'bg-red-800 scale-105': isWrong},
        ]
      )} 
      disabled={isDisabled}
      onClick={onClick}
    >
      <span>{title}</span>
    </button>
  );
};

export default Button;