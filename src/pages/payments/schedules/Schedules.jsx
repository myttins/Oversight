import React, { useContext, useEffect, useMemo, useState } from 'react';
import { MessageBannerContext } from '../../../contexts/MessageBannerContext';
import axios, { AxiosResponse } from 'axios';

export const ScheduleRow = ({ schedule }) => {
  return (
    <div className='flex w-full py-1 hover:bg-zinc-100'>
      <span className='w-1/6'>{schedule.schedule_id}</span>
      <span className='w-2/6'>{schedule.label}</span>
      <span className='w-1/6'>{'CN¥ ' + schedule.amount}</span>
      <span className='w-2/6'>{schedule.date_created}</span>
    </div>
  );
};

const Schedules = () => {
  const [data, setData] = useState([]);
  const { showBanner, hideBanner } = useContext(MessageBannerContext);

  const [sortConfig, setSortConfig] = useState({ key: 'schedule_id', direction: 'ascending' });

  const [filters, setFilters] = useState({
    schedule_id: '',
    label: '',
    amount: '',
    frequency: '',
    period: '',
    date_created: '',
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/payments/schedules');
      setData(response.data);
    } catch (error) {
      console.error(error);
      // Type narrowing to check if error is an AxiosError
      if (axios.isAxiosError(error)) {
        // Now TypeScript knows error is an AxiosError and response is defined
        const message = error.response?.data.message;
        if (message) {
          showBanner({ style: 'error', message });
        } else {
          // Handle the case where the error message is not in the expected format
          showBanner({
            style: 'error',
            message: 'An unexpected error occurred',
          });
        }
      } else {
        // Handle non-Axios errors
        showBanner({ style: 'error', message: 'An unexpected error occurred' });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSort = (key) => {
    if (sortConfig?.key === key && sortConfig.direction === 'ascending') {
      setSortConfig({ key, direction: 'descending' });
    } else {
      setSortConfig({ key, direction: 'ascending' });
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const sortedAndFilteredData = useMemo(() => {
    let scheduleItems = [...data];

    // Filtering
    Object.keys(filters).forEach((key) => {
      const filterValue = filters[key];
      if (filterValue) {
        scheduleItems = scheduleItems.filter((schedule) =>
          schedule[key].toString().toLowerCase().includes(filters[key].toLowerCase()),
        );
      }
    });

    // Sorting
    if (sortConfig !== null) {
      scheduleItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return scheduleItems;
  }, [data, sortConfig, filters]);

  return (
    <div className='bg-white p-4'>
      <header className='my-2'>
        <h2>FEE SCHEDULES</h2>
      </header>
      <div className='flex w-full'>
        <input
          className='input'
          type='text'
          value={filters.schedule_id || ''}
          onChange={(e) => handleFilterChange('schedule_id', e.target.value)}
        />
      </div>
      <div className='flex w-full'>
        <button className='w-1/6' onClick={() => handleSort('schedule_id')}>
          TOGGLE
        </button>
        <button className='w-1/6' onClick={() => handleSort('label')}>
          TOGGLE
        </button>
        <button className='w-1/6' onClick={() => handleSort('amount')}>
          TOGGLE
        </button>
      </div>
      <div className='flex w-full'>
        <span className='w-1/6'>ID</span>
        <span className='w-2/6'>LABEL</span>
        <span className='w-1/6'>AMOUNT</span>
        <span className='w-2/6'>CREATED</span>
      </div>
      {sortedAndFilteredData.map((item, i) => {
        return <ScheduleRow key={item.schedule_id} schedule={item} />;
      })}
    </div>
  );
};

export default Schedules;
