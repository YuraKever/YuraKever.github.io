import Button from "../../../ui/Button/Button"
import { BibleItemType } from "../../../../types/common"
import { FC } from "react"
import { SM_SCREEN_WIDTH } from "../../../../constants/common"

type Props = {
  item: BibleItemType;
  onClick?: (id: string) => void;
  isWrong?: boolean;
  isHint?: boolean;
  isDisabled?: boolean;
}

const GridItem: FC<Props> = ({item, onClick = () => {}, isWrong, isHint, isDisabled}) => {
  return (
    <Button 
      title={screen.width < SM_SCREEN_WIDTH ? item.shortTitle || item.title :item.title} 
      isDisabled={isDisabled}
      isWrong={isWrong}
      isHint={isHint}
      onClick={() => {
        onClick(item.id)
        // setIsDisabled(true);
      }} 
    />
  )
}

export default GridItem;