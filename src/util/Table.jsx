import React, { useMemo, useState } from 'react';
import SortArrow from '../assets/icons/arrow-separate-vertical.svg';

const Table = ({ columns, data, filter, checkbox, size, setData }) => {
  const widthClasses = {
    1: 'w-1/12',
    2: 'w-2/12',
    3: 'w-3/12',
    4: 'w-4/12',
    5: 'w-5/12',
    6: 'w-6/12',
  };

  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const [filters, setFilters] = useState({});

  const handleCheck = (id) => {
    const newData = [...data];
    newData.forEach((item) => {
      if (item[columns[0].value] === id) {
        item.checked === true ? (item.checked = false) : (item.checked = true);
      }
    });
    setData(newData);
  };

  const handleSort = (key) => {
    // Adjusting handleSort to account for special checkbox column
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    setSortConfig({ key, direction });
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const sortedAndFilteredData = useMemo(() => {
    let sortedItems = [...data];

    // Filtering
    if (filter) {
      Object.keys(filters).forEach((key) => {
        const filterValue = filters[key];
        if (filterValue) {
          sortedItems = sortedItems.filter((schedule) =>
            schedule[key].toString().toLowerCase().includes(filters[key].toLowerCase()),
          );
        }
      });
    }

    if (sortConfig.key === 'checkbox') {
      sortedItems.sort((a, b) => {
        if (a.checked && !b.checked) return -1;
        if (!a.checked && b.checked) return 1;
        return 0;
      });
    } else {
      sortedItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortedItems;
  }, [data, sortConfig, filters]);

  return (
    <div>
      {/* Table filter input boxes */}
      <div className='flex w-full'>
        {checkbox && <span className='w-6'></span>}
        {filter &&
          columns.map((column, i) => (
            <input
              key={i}
              value={filters[column.value] || ''}
              placeholder={'Filter'}
              onChange={(e) => handleFilterChange(column.value, e.target.value)}
              className={`input ${widthClasses[column.width]} mr-2 mb-2`}
            />
          ))}
      </div>

      {/* Table column titles */}
      <div className='flex w-full bg-zinc-100 p-2'>
        {checkbox && (
          <span
            className='w-6 flex items-center justify-between cursor-pointer '
            onClick={() => handleSort('checkbox')}
          >
            <img className={'h-4'} src={SortArrow} />
          </span>
        )}

        {columns.map((column, i) => {
          if (column.sort)
            return (
              <span
                key={i}
                className={`${
                  widthClasses[column.width]
                } px-2 font-bold flex items-center justify-between cursor-pointer 
                ${sortConfig.key === column.value && 'underline'}`}
                onClick={() => handleSort(column.value)}
              >
                {column.title}
                <img className={'h-4'} src={SortArrow} />
              </span>
            );
          else
            return (
              <span key={i} className={`${widthClasses[column.width]} pl-2 font-bold flex`}>
                {column.title}
              </span>
            );
        })}
      </div>

      {/* Table rows */}
      <div className={size ? `${size.height} overflow-scroll` : ''}>
        {sortedAndFilteredData.map((row, i) => (
          <div
            key={i}
            className='flex w-full py-3 px-2 border-t text-zinc-700 text-sm hover:bg-zinc-50 transition-transform duration-300'
          >
            {checkbox && (
              <span className='w-6'>
                <input
                  type='checkbox'
                  onChange={() => handleCheck(row[columns[0].value])}
                  checked={row.checked === true}
                  className='mr-2'
                />
              </span>
            )}
            {columns.map((column, i) => (
              <span key={i} className={`${widthClasses[column.width]} px-2 ${column.style || ''}`}>
                {row[column.value]}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
