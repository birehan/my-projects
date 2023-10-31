import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Pagination from "./Pagination";

export const staffMembers = {
  BoardMember: "Board Members",
  ManagementMember: "Management Members",
  StaffMember: "Staff Members",
  FormerMember: "Former Members",
};

const StaffsList = () => {
  const { staffs } = useSelector((state) => state.staffs);
  const { staffType } = useParams();

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(staffs.length / itemsPerPage);

  return (
    <section className="xl:pb-8 ">
      <div className="mx-auto max-w-[100rem] flex flex-col gap-6 ">
        <h3 className="text-primaryColor text-2xl font-bold">
          {staffMembers[staffType]}
        </h3>
        <div className="md:grid-cols-2 lg:grid-cols-3 grid gap-10  grid-cols-1">
          {staffs
            .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
            .map((staff, index) => (
              <article
                key={index}
                className="gap-4 flex flex-col justify-between rounded-xl bg-white px-6 pt-6 pb-6 shadow-lg hover:shadow-xl hover:transform hover:scale-[1.02] duration-300 "
              >
                <div className="text-center">
                  <div className="relative flex items-end overflow-hidden rounded-xl aspect-w-4 aspect-h-3 ">
                    <img
                      src={staff.photoUrl}
                      alt="staff"
                      className="object-cover w-full h-[18rem]"
                    />
                  </div>

                  <div className="mt-2 p-2 flex flex-col justify-between gap-2">
                    <h2 className="text-primaryColor font-semibold text-xl md:text-2xl overflow-hidden overflow-ellipsis w-full">
                      {staff.name}
                    </h2>
                    <p className="mt-1 text-lg text-gray-600 font-bold">
                      {staff.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">{staff.about}</p>
                  </div>
                </div>
              </article>
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
