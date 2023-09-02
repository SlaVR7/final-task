import { SelectCategory } from './selectCategory/selectCategory';
import SortingView from './sorting/sortingView';
import FilterView from './filter/filterView';
import SearchView from './search/searchView';
import Breadcrumb from '../../../components/BasicBreadcrumbs';
import React, { useState } from 'react';
import { NavigationViewProps } from '../../../lib/interfaces';

export function NavigationView({ nav, changeQuery }: NavigationViewProps) {
  const [filterQuery, setFilterQuery] = useState('');
  const [sortQuery, setSortQuery] = useState('');

  function updateFilterQuery(options: string) {
    setFilterQuery(options);
    console.log('filter query updated');
    changeQuery(`${options}&${sortQuery}`);
  }

  function updateSortQuery(options: string) {
    setSortQuery(options);
    console.log('sort query updated');
    changeQuery(`${filterQuery}&${options}`);
  }

  return (
    <div className='bg-accentColor dark:bg-accentDarkColor text-primaryColor'>
      <div className='flex flex-wrap justify-between items-center max-w-[1440px] py-4 px-4 mx-auto lg:px-big gap-[10px]'>
        <Breadcrumb nav={nav} />
        <div className='flex flex-wrap gap-[10px] md:min-w-[550px]'>
          <SelectCategory nav={nav} />
          <div className='flex flex-wrap gap-[10px]'>
            <SortingView changeQuery={updateSortQuery} />
            <FilterView changeQuery={updateFilterQuery} />
          </div>
          <SearchView />
        </div>
      </div>
    </div>
  );
}
