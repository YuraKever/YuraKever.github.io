'use client'

import { BIBLE_BOOKS } from "../../constants/common";
import GridContainer from "./GridContainer/GridContainer";
import { useEffect, useState } from "react";
import { BibleItemType } from "../../types/common";
import PlayHeader from "./PlayHeader/PlayHeader";
import FinishDialog from "./FinishDialog/FinishDialog";
import { useTimer } from "../../hooks/useTimer";

const PlayContainer = () => {
  const BIBLE_BOOKS_copy = [...BIBLE_BOOKS]
  const [unsortedItems, setUnsortedItems] = useState<BibleItemType[]>(BIBLE_BOOKS_copy.sort(() => Math.random() - 0.5))
  const [sortedItems, setSortedItems] = useState<BibleItemType[]>(BIBLE_BOOKS);
  const [unsortedDisabledItems, setUnsortedDisabledItems] = useState<BibleItemType[]>(BIBLE_BOOKS_copy);
  const [sortedDisabledItems, setSortedDisabledItems] = useState<BibleItemType[]>(BIBLE_BOOKS);
  const [nextId, setNextId] = useState<string | null>('1');
  const [wrongId, setWrongId] = useState<string | null>(null);
  const [hintId, setHintId] = useState<string | null>(null);
  const [mistakesCounter, setMistakesCounter] = useState<number>(0);
  const [hintsCounter, setHintsCounter] = useState<number>(0);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const { seconds, start, pause, stop } = useTimer();

  const handleItemClick = (id: string): void => {
    const selectedItem = unsortedItems.find(item => item.id === id);
    console.log(selectedItem);
    if (selectedItem) {
      if (selectedItem.id === nextId) {
        setSortedDisabledItems(prev => prev.filter(elem => elem.id !== id))
        setUnsortedDisabledItems(prev => ([...prev, selectedItem]))
        setNextId(selectedItem.nextId)
        setWrongId(null)
        setHintId(null);
      } else {
        setWrongId(id);
        setMistakesCounter(prev => prev + 1);
        setHintId(null);
      }
    }
  }
  
  const handlePlayClick = () => {
    const bibleBooks = BIBLE_BOOKS_copy
      .sort(() => Math.random() - 0.5);
    
    setUnsortedItems(bibleBooks);
    setSortedItems(BIBLE_BOOKS);
    setUnsortedDisabledItems([]);
    setSortedDisabledItems(BIBLE_BOOKS);
    setNextId('1');
    setWrongId(null);
    setHintId(null);
    setHintsCounter(0);
    setMistakesCounter(0);
    stop();
    start();
  }

  const handleHintClick = () => {
    setHintId(nextId);
    setWrongId(null);
    setHintsCounter(prev => prev + 1);
  }

  useEffect(() => {
    if (nextId === null) {
      setIsOpenDialog(true);
      pause();
    }
  }, [nextId, pause])

  return (
    <>
      <PlayHeader 
        mistakes={mistakesCounter}
        hints={hintsCounter}
        onHintClick={handleHintClick} 
        onPlayClick={handlePlayClick} 
        seconds={seconds}
      />
      <div className="flex flex-col lg:flex-row w-full gap-10 p-10">
        <GridContainer 
          items={unsortedItems} 
          disabledItems={unsortedDisabledItems}
          onItemClick={handleItemClick} 
          wrongId={wrongId} 
          hintId={hintId} 
        />
        <GridContainer disabledItems={sortedDisabledItems} items={sortedItems} />
      </div>
      <FinishDialog 
        title="Гру завершено"
        subTitle={mistakesCounter <= 3 ? 'Ти молодець!' : 'Можеш краще!'}
        mistakes={mistakesCounter}
        hints={hintsCounter}
        time={`${Math.floor(seconds / 60)}:${seconds % 60}`}
        isOpen={isOpenDialog}
        handleBlur={() => setIsOpenDialog(false)} 
        handleClose={() => {handlePlayClick(); setIsOpenDialog(false)}}
      />
    </>
  );
};

export default PlayContainer;
