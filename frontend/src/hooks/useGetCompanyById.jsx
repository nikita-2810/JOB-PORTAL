import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!companyId) return; // FIX undefined crash

    const fetchCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log("GET COMPANY ERROR:", error);
      }
    };

    fetchCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;