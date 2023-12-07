import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { useMessageBanner } from '../../../contexts/MessageBannerContext';
import Loading from '../../../util/Loading';
import Table from '../../../util/Table';
import { useNavigate, useParams } from 'react-router';

const VehucleScheduleManage = () => {
  const navigate = useNavigate();
  const { showBanner } = useMessageBanner();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [schedules, setSchedules] = useState([]);

  const tableColumns = [
    { title: 'ID', value: 'schedule_id', width: 2, style: '', sort: true },
    { title: 'LABEL', value: 'label', width: 2, style: 'truncate', sort: false },
    { title: 'DESC.', value: 'description', width: 4, style: 'truncate', sort: false },
    { title: 'AMOUNT', value: 'amount', width: 2, style: '', sort: true },
    { title: 'CREATED', value: 'date_created', width: 2, style: 'truncate', sort: true },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/payments/${id}`);
      const modifiedSchedules = response.data.schedules;
      modifiedSchedules.forEach((item) => {
        if (item.vehicle_match === true) item.checked = true;
      });
      setSchedules(modifiedSchedules);
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

  const handleSaveSchedules = async () => {
    const scheduleIds = schedules.filter((schedule) => schedule.checked === true).map((item) => item.schedule_id);

    try {
      await axios.post(`/api/payments/schedules/${id}`, scheduleIds);
      showBanner({ style: 'success', message: 'Schedules updated' });
      navigate(`/vehicle/${id}/payments`);
    } catch (error) {
      showBanner({
        style: 'error',
        message: axios.isAxiosError(error) ? error.response.data.message : 'Internal server error',
      });
    }
  };

  if (!loading)
    return (
      <div className='bg-white p-4 my-4 h-'>
        <header>
          <h2>MANAGE SCHEDULES</h2>
        </header>
        <div className='py-4'>
          <h2>SELECTED</h2>
          <div className='my-2'>
            <Table
              columns={tableColumns}
              data={schedules.filter((schedule) => schedule.checked === true)}
              filter={false}
              checkbox={false}
              size={{ height: 'h-32' }}
            />
          </div>
        </div>
        <div className='py-4'>
          <h2>ALL</h2>
          <div className='my-2'>
            <Table
              columns={tableColumns}
              data={schedules}
              setData={setSchedules}
              filter={true}
              checkbox={true}
              size={{ height: 'h-32' }}
            />
          </div>
        </div>
        <div className='flex justify-end'>
          <button className='btn-lte mx-2' onClick={() => navigate(-1)}>
            CANCEL
          </button>
          <button className='btn' onClick={handleSaveSchedules}>
            SAVE
          </button>
        </div>
      </div>
    );
};

export default VehucleScheduleManage;
