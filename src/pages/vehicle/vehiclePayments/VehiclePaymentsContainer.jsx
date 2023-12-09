import React, { useEffect, useState } from 'react';
import VehiclePayments from './VehiclePayments';
import VehicleSchedule from './VehicleSchedule';
import { useMessageBanner } from '../../../contexts/MessageBannerContext';

import axios from 'axios';
import { useParams } from 'react-router';

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
      const filteredSchedules = response.data.schedules.filter(schedule => schedule.vehicle_match === true)
      setSchedules(filteredSchedules);
      setLoading(false);
    } catch (error) {
      console.error(error);
      showBanner({ style: 'error'});
    }
  };

  useEffect(() => {
    fetchPaymentsAndSetState();
  }, [id]);

  if (loading) return null;
   

  return (
    <div>
      <VehicleSchedule schedules={schedules} />
      <VehiclePayments payments={payments} />
    </div>
  );
};

export default VehiclePaymentsContainer;
