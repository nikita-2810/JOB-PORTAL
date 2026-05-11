import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '../redux/applicationSlice'
import { APPLICATION_API_END_POINT } from '../utils/constant'

const useGetApplicants = (jobId) => {
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/applicants/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllApplicants(res.data.job.applications));
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (jobId) {
            fetchApplicants();
        }
    }, [jobId, dispatch]);

    return applicants;
};

export default useGetApplicants;
