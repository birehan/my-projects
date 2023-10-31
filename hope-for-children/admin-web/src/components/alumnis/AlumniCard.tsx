import { useState } from "react";
import { Alumni } from "../../types/types";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import DeletePopup from "../common/DeletePopup";
import { DeleteAlumniAction } from "../../features/redux/alumniSlice";

interface Props {
  alumni: Alumni;
}

const AlumniCard = ({ alumni }: Props) => {
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <div className="studentList py-5 px-10 m-auto  flex flex-col md:flex-row  gap-6 items-center justify-center w-full rounded-xl">
      {openDelete && (
        <DeletePopup
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          id={alumni.id}
          DeleteAction={DeleteAlumniAction}
        />
      )}
      <div className="p-5 md:mt-[-6rem] bg-white flex-[1]">
        <img
          className="w-full rounded-md max-h-80 xl:h-full object-cover"
          src={alumni.photoUrl}
          alt="student"
        />
      </div>
      <div className="flex-[2]">
        <h1 className="text-center font-bold mb-2  text-lg">{alumni.name}</h1>
        <p className="text-gray-600">{alumni.story}</p>

        <div className="flex flex-row gap-4 items-center justify-center mt-8">
          <Link to={`/alumnis/update/${alumni.id}`}>
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-600  hover:bg-blue-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
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
  );
};

export default AlumniCard;
