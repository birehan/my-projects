import { Key, useState } from "react";
import { useSelector } from "react-redux";
import AlumniCard from "../components/AlumniCard";
import { Alumni } from "../types/types";
import Pagination from "./Pagination";

const AlumniList = () => {
  const { alumnis } = useSelector((state: any) => state.reducer);
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(alumnis.length / itemsPerPage);

  return (
    <div>
      <div className="mx-auto mt-16 md:mt-24 xl:mt-32 mb-8 xl:mb-16  max-w-[70rem] flex flex-col gap-8 md:gap-24  px-6">
        {alumnis
          .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
          .map((alumni: Alumni, index: Key | null | undefined) => {
            return (
              <AlumniCard
                key={index}
                name={alumni.name}
                story={alumni.story}
                photoUrl={alumni.photoUrl}
              />
            );
          })}
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default AlumniList;
