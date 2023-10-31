import { useEffect } from "react";
import StaffSidebar from "../components/about_components/StaffSidebar";
import { getStaffs } from "../api/ApiActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StaffsList from "../components/StaffsList.jsx";
import CommonLanding from "../components/CommonLanding";
import Layout from "../components/Layout";
import Loading from "../components/Loading";

const StaffsPage = () => {
  const { loading } = useSelector((state: any) => state.staffs);

  const dispatch = useDispatch();
  const { staffType } = useParams();

  useEffect(() => {
    dispatch(getStaffs(staffType));
  }, [staffType, dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="flex flex-col gap-8  xl:gap-16" id="scroll">
        <CommonLanding title="" icon={null} />

        <div className="px-6">
          <div className="mx-auto grid max-w-[100rem] grid-cols-1 gap-4 xl:gap-12 lg:grid-cols-12">
            <div className="lg:col-span-3 ">
              <nav className="flex flex-1 flex-col">
                <ul className="flex flex-1 flex-col gap-12">
                  <StaffSidebar />
                </ul>
              </nav>
            </div>
            <div className="lg:col-span-9">
              <StaffsList />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StaffsPage;
