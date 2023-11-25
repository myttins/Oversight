import React, { useContext, useEffect, useState } from 'react';
import { MessageBannerContext } from '../../util/MessageBannerContext';
import axios from 'axios';

const Schedules: React.FC = () => {
  const [data, setData] = useState([]);
  const { showBanner } = useContext(MessageBannerContext);



  const fetchData = async () => {
    try {
      const response = await axios.get('/api/payments/schedules');
      console.log(response.data)
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
    fetchData()
  }, [])
  
  return (
    <div className="bg-white p-4">
      <header>FEE SCHEDULES</header>
    </div>
  );
};

export default Schedules;
