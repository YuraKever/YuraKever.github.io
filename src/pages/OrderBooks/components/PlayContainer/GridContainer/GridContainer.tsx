import { BibleItemType } from "../../../types/common";
import { FC } from "react";
import GridItem from "./GridItem/GridItem";

type Props = {
  items?: BibleItemType[];
  disabledItems?: BibleItemType[];
  onItemClick?: (id: string) => void;
  wrongId?: string | null;
  hintId?: string | null;
}

const GridContainer: FC<Props> = ({items = [], disabledItems, onItemClick, wrongId, hintId}) => {
  return (
    <div className="grid grid-cols-5 md:grid-cols-4 xl:grid-cols-5 gap-3 w-full h-fit">
      {items.map(item => (
        <GridItem 
          key={item.id} 
          item={item} 
          onClick={onItemClick}
          isWrong={item.id === wrongId}
          isHint={item.id === hintId}
          isDisabled={disabledItems?.includes(item)}
        />
      ))}
    </div>
  );
};

export default GridContainer;
