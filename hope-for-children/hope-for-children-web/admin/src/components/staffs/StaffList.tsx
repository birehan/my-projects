import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import { Staff } from "../../types/types";
import Notification from "../common/Notification";
import {
  CleanUpStatusStaff,
  FetchAllstaffs,
} from "../../features/redux/staffSlice";
import Loading from "../common/Loading";
import { BsPlus } from "react-icons/bs";
import StaffCard from "./StaffCard";

export const staffMembers = {
  BoardMember: "Board Members",
  ManagementMember: "Management Members",
  StaffMember: "Staff Members",
  FormerMember: "Former Members",
};

const StaffsList = () => {
  const { staffType } = useParams();
  const dispatch = useDispatch();

  const { isLoading, staffs, isDeleteSuccess, error } = useSelector(
    (state: any) => state.staffs
  );

  useEffect(() => {
    if (staffs.length === 0) {
      dispatch(FetchAllstaffs());
    }
    return () => {
      dispatch(CleanUpStatusStaff());
    };
  }, [dispatch, staffType]);

  const [staffMemebers, setStaffMemebers] = useState([]);

  useEffect(() => {
    if (
      staffType !== undefined &&
      staffMembers.hasOwnProperty(staffType) &&
      staffs.length !== 0
    ) {
      setStaffMemebers(
        staffs.filter((item: Staff) => item.userSector === staffType)
      );
    } else {
      setStaffMemebers(staffs);
    }
    return () => {};
  }, [staffType, staffs]);

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(staffs.length / itemsPerPage);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="xl:pb-8 ">
      {isDeleteSuccess && (
        <Notification success={isDeleteSuccess} message="Delete succesffully" />
      )}

      {error && <Notification success={isDeleteSuccess} message={error} />}

      <div className="mx-auto max-w-[100rem] flex flex-col gap-6 ">
        <div className="flex flex-row justify-between items-center gap-4">
          <h3 className="text-primaryColor text-2xl font-bold">
            {staffType !== undefined &&
            staffMembers.hasOwnProperty(staffType as keyof typeof staffMembers)
              ? staffMembers[staffType as keyof typeof staffMembers]
              : "Staff Members"}
          </h3>

          <Link to="/staffs/create">
            <button
              type="button"
              className=" inline-flex justify-center items-center  gap-x-1.5 rounded-md bg-primaryColor px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primaryColorHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryColorHover"
            >
              <BsPlus className=" h-6 w-6" aria-hidden="true" />
              Create Staff
            </button>
          </Link>
        </div>
        <div className="md:grid-cols-2 lg:grid-cols-3 grid gap-10  grid-cols-1">
          {staffMemebers
            .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
            .map((staff: Staff, index: number) => (
              <StaffCard key={index} staff={staff} />
            ))}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </section>
  );
};

export default StaffsList;
