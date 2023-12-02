import React from 'react';
import Table from '../../../util/Table';

const VehicleSchedule = ({ schedules }) => {
  // navigate
  // useParams, useSearchParams
  // contexts
  // useSate

  const tableColumns = [
    { title: 'ID', value: 'schedule_id', width: 2, style: '', sort: true },
    { title: 'LABEL', value: 'label', width: 4, style: 'truncate', sort: false },
    { title: 'AMOUNT', value: 'amount', width: 2, style: '', sort: true },
    { title: 'CREATED', value: 'date_created', width: 4, style: 'truncate', sort: true },
  ];

  const handleAddSchedule = () => {

  }

  return (
    <div className='bg-white p-4 my-4'>
      <header className='flex justify-between'>
        <h2>SCHEDULES</h2>
        <button className='btn mx-2' onClick={handleAddSchedule}>
          ADD
        </button>
      </header>

      {!schedules || schedules.length === 0 ? (
        <div>NO SCHEDULES</div>
      ) : (
        <Table columns={tableColumns} data={schedules} filter={false} />
      )}
    </div>
  );
};

export default VehicleSchedule;
