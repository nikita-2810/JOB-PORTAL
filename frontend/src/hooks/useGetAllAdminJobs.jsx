import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setAllAdminJobs } from '../redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
                    withCredentials: true
                });

                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                    setError(null);
                } else {
                    setError('Failed to fetch jobs');
                }
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchAllAdminJobs();
    }, [dispatch]);

    return { loading, error };
};

export default useGetAllAdminJobs;
