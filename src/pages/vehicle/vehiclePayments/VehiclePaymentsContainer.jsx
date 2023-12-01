import React, { useEffect, useState } from 'react';
import VehiclePayments from './VehiclePayments';
import VehicleSchedule from './VehicleSchedule';
import { useMessageBanner } from '../../../contexts/MessageBannerContext';

import axios from 'axios';
import { useParams } from 'react-router';
import Loading from '../../../util/Loading';

const VehiclePaymentsContainer = () => {
  const { id } = useParams();

  const { showBanner } = useMessageBanner();

  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const fetchPaymentsAndSetState = async () => {
    try {
      const response = await axios.get(`/api/payments/${id}`);
      setPayments(response.data.payments);
      setSchedules(response.data.schedules);
      setLoading(false);
    } catch (error) {
      console.error(error);
      showBanner({ style: 'error'});
    }
  };

  useEffect(() => {
    fetchPaymentsAndSetState();
  }, [id]);

  if (loading)
    return (
      <div className='bg-white p-4'>
        <Loading />
      </div>
    );

  return (
    <div>
      <VehicleSchedule schedules={schedules} />
      <VehiclePayments payments={payments} />
    </div>
  );
};

export default VehiclePaymentsContainer;
