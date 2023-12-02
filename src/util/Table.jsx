import React, { useMemo, useState } from 'react';
import SortArrow from '../assets/icons/arrow-separate-vertical.svg';

const Table = ({ columns, data, filter, checkbox }) => {
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
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelection = (index) => {
    const newSelectedRows = selectedRows.includes(index)
      ? selectedRows.filter((id) => id !== index)
      : [...selectedRows, index];
    setSelectedRows(newSelectedRows);
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
        const aChecked = selectedRows.includes(a[columns[0].value]);
        const bChecked = selectedRows.includes(b[columns[0].value]);
        if (aChecked && !bChecked) return -1;
        if (!aChecked && bChecked) return 1;
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
    <div className='p-2'>
      {/* Table filter input boxes */}
      <div className='flex w-full p-2'>
        {checkbox && <span className='w-6'></span>}
        {filter &&
          columns.map((column, i) => (
            <input
              key={i}
              value={filters[column.value] || ''}
              placeholder={'Filter'}
              onChange={(e) => handleFilterChange(column.value, e.target.value)}
              className={`input ${widthClasses[column.width]} mr-2`}
            />
          ))}
      </div>

      {/* Table column titles */}
      <div className='flex w-full bg-zinc-100 p-2'>
        {checkbox && (
          <span className='w-6 flex items-center justify-between cursor-pointer ' onClick={() => handleSort('checkbox')}>
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

      {sortedAndFilteredData.map((row, i) => (
        <div
          key={i}
          className='flex w-full py-3 px-2 border-t text-zinc-700 text-sm hover:bg-zinc-50 transition-transform duration-300'
        >
          {checkbox && (
            <span className='w-6'>
              <input
                type='checkbox'
                onChange={() => handleRowSelection(row[columns[0].value])}
                checked={selectedRows.includes(row[columns[0].value])}
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
  );
};

export default Table;
