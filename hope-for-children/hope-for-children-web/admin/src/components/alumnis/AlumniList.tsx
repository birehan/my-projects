import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import { Alumni } from "../../types/types";
import Notification from "../common/Notification";
import { FetchAllAlumnis } from "../../features/redux/alumniSlice";
import Loading from "../common/Loading";
import { BsPlus } from "react-icons/bs";
import AlumniCard from "./AlumniCard";

const AlumniList = () => {
  const dispatch = useDispatch();

  const { isLoading, alumnis, isDeleteSuccess, error } = useSelector(
    (state: any) => state.alumnis
  );

  useEffect(() => {
    if (alumnis.length === 0) {
      dispatch(FetchAllAlumnis());
    }
  }, [dispatch]);

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(alumnis.length / itemsPerPage);

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
            Alumni Students
          </h3>

          <Link to="/alumnis/create">
            <button
              type="button"
              className=" inline-flex justify-center items-center  gap-x-1.5 rounded-md bg-primaryColor px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primaryColorHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryColorHover"
            >
              <BsPlus className=" h-6 w-6" aria-hidden="true" />
              Create Alumni
            </button>
          </Link>
        </div>
        <div className="mx-auto mt-16 md:mt-24 xl:mt-32 mb-8 xl:mb-16  max-w-[70rem] flex flex-col gap-8 md:gap-24  px-6">
          {alumnis
            .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
            .map((alumni: Alumni, index: number) => (
              <AlumniCard key={index} alumni={alumni} />
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

export default AlumniList;
