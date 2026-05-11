// src/components/JobDescription.jsx
import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { setLoading } from "@/redux/authSlice";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user, loading } = useSelector((store) => store.auth);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  // start false, then sync from fetched job
  const [isApplied, setIsApplied] = useState(false);

  // helper that supports both shapes: app.applicant === id OR app.applicant._id === id
  const applicationContainsUser = (applications = [], userId) => {
    if (!Array.isArray(applications) || !userId) return false;
    return applications.some((app) => {
      const applicant = app?.applicant;
      return (
        applicant === userId ||
        (typeof applicant === "object" && applicant?._id === userId)
      );
    });
  };

  // Fetch job and sync isApplied
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data?.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(applicationContainsUser(res.data.job.applications, user?._id));
        } else {
          toast.error(res.data?.message || "Failed to fetch job");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch job");
      }
    };

    if (jobId) fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  // keep isApplied in sync if singleJob changes elsewhere
  useEffect(() => {
    setIsApplied(applicationContainsUser(singleJob?.applications, user?._id));
  }, [singleJob, user?._id]);

  const applyJobHandler = async () => {
    try {
      dispatch(setLoading(true));

      // axios.post(url, body, config)
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {}, // empty body
        { withCredentials: true }
      );

      if (res.data?.success) {
        setIsApplied(true);

        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...(singleJob?.applications ?? []),
            { applicant: user?._id },
          ],
        };

        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message || "Applied successfully");
      } else {
        toast.error(res.data?.message || "Failed to apply");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>

          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position ?? 0} Positions
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleJob?.jobType ?? "-"}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singleJob?.salary ?? "-"} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={applyJobHandler}
          disabled={isApplied || loading}
          className={`rounded-lg ${
            isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : loading ? "Applying..." : "Apply Now"}
        </Button>
      </div>

      <div className="my-4">
        <h1 className="font-bold my-1 text-sm">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800 text-sm">{singleJob?.title}</span>
        </h1>
        <h1 className="font-bold my-1 text-sm">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-800 text-sm">{singleJob?.location}</span>
        </h1>
        <h1 className="font-bold my-1 text-sm">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-800 text-sm">{singleJob?.experience} Yrs</span>
        </h1>
        <h1 className="font-bold my-1 text-sm">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-800 text-sm">{singleJob?.salary} LPA</span>
        </h1>
        <h1 className="font-bold my-1 text-sm">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-gray-800 text-sm">
            {singleJob?.applications?.length ?? 0}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-sm">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-800 text-sm">
            {singleJob?.createdAt ? singleJob.createdAt.split("T")[0] : "-"}
          </span>
        </h1>
        <h1 className="border-b-2 border-b-gray-300 font-xs py-4 text-sm">
          {singleJob?.description}
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
