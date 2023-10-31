import { useState } from "react";
import { Staff } from "../../types/types";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import DeletePopup from "../common/DeletePopup";
import { DeleteStaffAction } from "../../features/redux/staffSlice";

interface Props {
  staff: Staff;
}

const StaffCard = ({ staff }: Props) => {
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <article className="gap-4 flex flex-col justify-between rounded-xl bg-white px-6 pt-6 pb-6 shadow-lg hover:shadow-xl hover:transform hover:scale-[1.02] duration-300 ">
      {openDelete && (
        <DeletePopup
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          id={staff.id}
          DeleteAction={DeleteStaffAction}
        />
      )}

      <div className="text-center">
        <div className="relative border border-[#e3dede] flex items-end overflow-hidden rounded-xl aspect-w-4 aspect-h-3 ">
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
          <p className="mt-1 text-lg text-gray-600 font-bold">{staff.title}</p>
          <p className="mt-1 text-sm text-gray-600">{staff.about}</p>
          <div className="flex flex-row gap-4 items-center justify-center mt-8">
            <Link to={`/staffs/update/${staff.id}`}>
              <button
                type="button"
                className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <AiFillEdit className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Edit
              </button>
            </Link>

            <button
              onClick={() => setOpenDelete(true)}
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <AiFillDelete className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default StaffCard;
