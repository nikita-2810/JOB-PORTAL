import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';

const AdminJobsTable = () => {
    // ✅ Call hook unconditionally at the top level
    const { loading, error } = useGetAllAdminJobs();

    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState([]);
    const navigate = useNavigate();

    // Filter jobs whenever allAdminJobs or search text changes
    useEffect(() => {
        const filteredJobs = allAdminJobs.filter(job => {
            if (!searchJobByText) return true;
            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div>
            {loading && <p className="text-blue-500">Loading jobs...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
                <Table>
                    <TableCaption>A list of your recently posted jobs</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Company Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filterJobs?.map(job => (
                            <TableRow key={job._id}>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split('T')[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="text-black" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 bg-white">
                                            <div
                                                onClick={() => navigate(`/admin/companies/${job.company._id}`)}
                                                className="flex items-center gap-2 w-fit cursor-pointer"
                                            >
                                                <Edit2 className="w-4" />
                                                <span>Edit</span>
                                            </div>

                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                className="flex items-center gap-2 w-fit cursor-pointer mt-2"
                                            >
                                                <Eye className="w-4" />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>

                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default AdminJobsTable;
