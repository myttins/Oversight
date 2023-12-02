import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { useMessageBanner } from '../../../contexts/MessageBannerContext';
import Loading from '../../../util/Loading';
import Table from '../../../util/Table';
import { useParams } from 'react-router';

const NewVehicleSchedule = () => {
  const { showBanner } = useMessageBanner();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [schedules, setSchedules] = useState([]);
  const [checkedIds, setCheckedIds] = useState([]);

  const tableColumns = [
    { title: 'ID', value: 'schedule_id', width: 1, style: '', sort: true },
    { title: 'LABEL', value: 'label', width: 2, style: 'truncate', sort: false },
    { title: 'AMOUNT', value: 'amount', width: 2, style: '', sort: true },
    { title: 'DESCRIPTION', value: 'description', width: 4, style: 'truncate', sort: true },
    { title: 'CREATED', value: 'date_created', width: 3, style: 'truncate', sort: true },
  ];

  const selectedSchedules = schedules.filter((schedule) => checkedIds.includes(schedule[tableColumns[0].value]));

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/payments/schedules/vehicle/${id}`);
      setSchedules(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      // Type narrowing to check if error is an AxiosError
      if (axios.isAxiosError(error)) {
        showBanner({ style: 'error', message: error.response.data.message });
      } else {
        // Handle non-Axios errors
        showBanner({ style: 'error', message: 'An unexpected error occurred' });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <div className='bg-white p-4'>
        <Loading />
      </div>
    );

  return (
    <div className='bg-white p-4 my-4 h-'>
      <header>
        <h2>ADD SCHEDULE TO VEHICLE</h2>
      </header>
      <div className='py-4'>
        <h2>SELECTED</h2>

        <div className='border my-2'>
          <Table
            columns={tableColumns}
            data={selectedSchedules}
            filter={false}
            checkbox={false}
            size={{ height: 'h-32' }}
          />
        </div>
        <button className='btn'>ADD {selectedSchedules.length} SELECTED</button>
      </div>
      <div className='py-4'>
        <h2>SELECT SCHEDULES</h2>
        <Table columns={tableColumns} data={schedules} filter={true} checkbox={true} setChecked={setCheckedIds} />
      </div>
    </div>
  );
};

export default NewVehicleSchedule;
