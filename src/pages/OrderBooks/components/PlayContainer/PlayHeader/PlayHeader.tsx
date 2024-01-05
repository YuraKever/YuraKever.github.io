import { FC, useEffect, useState } from "react";
import Button from "../../ui/Button/Button";
import { useTimer } from "@/app/order-book/hooks/useTimer";

type Props = {
  onPlayClick?: () => void;
  onHintClick?: () => void;
  mistakes?: number;
  hints?: number;
  seconds?: number;
}

const PlayHeader: FC<Props> = ({onHintClick, onPlayClick = () => {}, mistakes = 0, hints = 0, seconds = 0}) => {  
  // const { seconds, start, pause, running, stop } = useTimer();
  const [minutes, setMinutes] = useState(0);
  const [seconds1, setSeconds1] = useState(0);

  useEffect(() => {
    setMinutes(Math.floor(seconds / 60))
    setSeconds1(seconds % 60)
  }, [seconds])
 
  return (
    <div className="w-full bg-slate-800">
      <div className="flex gap-10 justify-center p-5">
        <div className="w-fit">
          <Button 
            isWrong={true} 
            onClick={onPlayClick}  
            title="Грати ще" 
          />
        </div>
        <div className="flex justify-between w-24 text-center text-3xl">
          <div className="w-[47%] text-right" >{minutes < 10 ? '0' + minutes : minutes}</div>
          <span>:</span>
          <div className="w-[47%] text-left">{seconds1 < 10 ? '0' + seconds1 : seconds1}</div>
        </div>
        <div className="w-fit">
          <Button isHint={true} onClick={onHintClick} title="Підказка" />
        </div>
      </div>
      <div className="flex gap-10 justify-center p-5">
        <span>Помилок: {mistakes}</span>
        <span>Підказок: {hints}</span>
      </div>
    </div>
  );
};

export default PlayHeader;