import React from 'react';
import { BsSearch } from 'react-icons/bs';

export const SearchBar = (): JSX.Element => {
  const [searchText, setSearchText] = React.useState<any>('');

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchText(params.get('query'));
  }, []);

  return (
    <div className='w-full max-w-lg lg:max-w-xs'>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <div className='relative'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <BsSearch
            size={40}
            className='h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
        </div>
        <input
          id='search'
          name='search'
          className='block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
          placeholder='Search'
          type='search'
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const params = new URLSearchParams(window.location.search);
              const typeParam = params.get('type');
              const searchUrl =
                '/search?' +
                (typeParam ? `type=${typeParam}&` : 'type=movie&') +
                `query=${searchText}`;

              window.location.href = searchUrl;
            }
          }}
        />
      </div>
    </div>
  );
};
