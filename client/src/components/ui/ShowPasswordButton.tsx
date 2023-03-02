import React from 'react';
import { BiRadioCircle, BiRadioCircleMarked } from 'react-icons/bi';

interface ShowPasswordButtonProps {
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
}

function ShowPasswordButton({
  showPassword,
  setShowPassword,
}: ShowPasswordButtonProps): JSX.Element {
  return (
    <button
      type='button'
      className='mt-4 pr-3 flex items-center text-sm leading-5 text-gray-500 focus:outline-none'
      onClick={() => {
        setShowPassword(!showPassword);
      }}
    >
      {showPassword ? (
        <BiRadioCircleMarked className='h-5 w-5' />
      ) : (
        <BiRadioCircle className='h-5 w-5' />
      )}
      <span className='ml-2'>Show Password</span>
    </button>
  );
}

export default ShowPasswordButton;
