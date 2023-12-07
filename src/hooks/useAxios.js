import axios from 'axios';
import { useState } from 'react';
import { useMessageBanner } from '../contexts/MessageBannerContext';


export function handleAxiosError(error) {
    let errorMessage = 'An unexpected error occurred';
    if (axios.isAxiosError(error)) {
        errorMessage = error.message;
        if (error.response) {
            // Add more specific error handling based on response
            errorMessage = `Error: ${error.response.status} - ${error.response.data.message}`;
        }
    }
    return errorMessage;
}

export function useAxios() {
    // const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {showBanner} = useMessageBanner();

    const fetchData = async (url, options, showLoading = false) => {
       
        if (showLoading) setLoading(true);
        try {
            
            const response = await axios(url, options);
            // throw new Error()
            return response.data;
        } catch (err) {
            const errorMessage = handleAxiosError(err)
            showBanner({style: 'error', message: errorMessage})
            // setError(err);  // Set the error state
            return null;    // Return null or throw an error
        } finally {
            setLoading(false);
        }
    };

    return { fetchData, error, loading };
}