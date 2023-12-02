import React from 'react';
import { ScheduleRow } from '../../payments/schedules/Schedules';

const VehicleSchedule = ({ schedules }) => {
  // navigate
  // useParams, useSearchParams
  // contexts
  // useSate

  return (
    <div className='bg-white p-4 my-4'>
      <h2>SCHEDULES</h2>
      {!schedules || schedules.length === 0 ? (
        <div>NO SCHEDULES</div>
      ) : (
        <div className='p-2'>
          <div className='flex w-full bg-zinc-100 p-2'>
            <span className='w-1/12 pl-2 font-bold'>ID</span>
            <span className='w-2/6 pl-2 font-bold'>LABEL</span>
            <span className='w-1/6 pl-2 font-bold'>AMOUNT</span>
            <span className='w-2/6'>CREATED</span>
          </div>
          {schedules.map((schedule) => (
            <ScheduleRow key={schedule.schedule_id} schedule={schedule} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleSchedule;
