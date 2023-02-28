import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function TrailerModal({
  open,
  setOpen,
  trailer,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  trailer: string;
}): JSX.Element {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-100'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-full'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative rounded-lg align-center'>
                <div className='sm:flex sm:items-start'>
                  <iframe
                    className='trailer-modal rounded-md'
                    loading='lazy'
                    width={`${
                      window.innerWidth > 400
                        ? '800px'
                        : `${window.innerWidth * 0.8}px`
                    }`}
                    height={`${
                      window.innerWidth > 400
                        ? '500px'
                        : `${window.innerWidth * 0.8}px`
                    }`}
                    src={`https://www.youtube.com/embed/${trailer}`}
                    title='YouTube video player'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
