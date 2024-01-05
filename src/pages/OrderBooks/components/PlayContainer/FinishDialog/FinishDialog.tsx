import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import Button from "../../ui/Button/Button";

type Props = {
  title?: string;
  subTitle?: string;
  time?: string;
  mistakes?: number;
  hints?: number;
  isOpen?: boolean;
  handleClose?: () => void;
  handleBlur?: () => void;
}

const FinishDialog: FC<Props> = ({
  title, 
  subTitle, 
  time, 
  mistakes, 
  hints, 
  isOpen, handleClose = () => {}, 
  handleBlur = () => {}}) => {
  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <Dialog 
        onClose={handleBlur}
        className="relative z-50"
        >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-slate-900 py-20 px-24">
            <Dialog.Title className='text-3xl mb-5'>{title}</Dialog.Title>
            <Dialog.Description className='mb-3'>
              {subTitle}
            </Dialog.Description>
            <p>
              Допущено помилок: {mistakes}
            </p>
            <p>
              Використано підказок: {hints}
            </p>
            <p>
              Загальний час: {time}
            </p>
            <div className="w-fit mt-3">
              <Button title="Грати ще!" onClick={handleClose} />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  )
}

export default FinishDialog;