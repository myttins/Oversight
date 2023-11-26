import React, { useContext, useEffect, useState } from 'react';
import { MessageBannerContext } from '../../util/MessageBannerContext';
import axios from 'axios';

type Schedule = {
  schedule_id: string;
  label: string;
  amount: number;
  frequency: number;
  period: string;
  date_created: string;
};

type ScheduleRowProps = {
  schedule: Schedule;
};

const ScheduleRow: React.FC<ScheduleRowProps> = ({ schedule }) => {
  return (
    <div className="flex w-full py-1 hover:bg-zinc-100">
      <a className="w-1/6">{schedule.schedule_id}</a>
      <a className="w-1/6">{schedule.label}</a>
      <a className="w-1/6">{schedule.amount}</a>
      <a className="w-1/6">{schedule.frequency}</a>
      <a className="w-1/6">{schedule.period}</a>
      <a className="w-1/6">{schedule.date_created}</a>
    </div>
  );
};

const Schedules: React.FC = () => {
  const [data, setData] = useState<Schedule[]>([]);
  const { showBanner } = useContext(MessageBannerContext);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/payments/schedules');
      setData(response.data);
    } catch (error: unknown) {
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

  return (
    <div className="bg-white p-4">
      <header>FEE SCHEDULES</header>
      <div className="flex w-full">
        <a className="w-1/6">ID</a>
        <a className="w-1/6">LABEL</a>
        <a className="w-1/6">AMOUNT</a>
        <a className="w-1/6">FREQUENCY</a>
        <a className="w-1/6">PERIOD</a>
        <a className="w-1/6">CREATED</a>
      </div>
      {data.map((item, i) => {
        return <ScheduleRow key={i} schedule={item} />;
      })}
    </div>
  );
};

export default Schedules;
