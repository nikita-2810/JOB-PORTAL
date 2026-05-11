import React from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import ApplicantsTable from "./ApplicantsTable";
import useGetApplicants from '../../hooks/useGetApplicants';

const Applicants = () => {
  const { id: jobId } = useParams();
  const applicants = useGetApplicants(jobId);

 return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto'>
        <h1 className='font-bold text-xl my-5'>
          Applicants ({applicants.length})
        </h1>
        <ApplicantsTable applicants={applicants} />
      </div>
    </div>
 )
}

export default Applicants;
