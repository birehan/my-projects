import { Key, SetStateAction, useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { useSelector } from "react-redux";
import { Project } from "../../types/types";
import Loading from "../Loading";
import { useDispatch } from "react-redux";
import { getProjects } from "../../api/ApiActions";

const ProjectsComponent = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerRow, setItemsPerRow] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const updateItemsPerRow = () => {
    if (window.innerWidth >= 1024) {
      setItemsPerRow(3); // Large screens
    } else if (window.innerWidth >= 768) {
      setItemsPerRow(2); // Medium screens
    } else {
      setItemsPerRow(1); // Small screens
    }
  };

  // Listen for window resize and update itemsPerRow accordingly
  useEffect(() => {
    updateItemsPerRow();
    window.addEventListener("resize", updateItemsPerRow);
    return () => {
      window.removeEventListener("resize", updateItemsPerRow);
    };
  }, []);

  const { projects, loading, message } = useSelector(
    (state: any) => state.reducer
  );

  const totalRows = Math.ceil(projects.length / itemsPerRow);

  const handleDotClick = (pageIndex: SetStateAction<number>) => {
    setCurrentPage(pageIndex);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex gap-10 flex-col">
      <p className="text-center text-3xl sm:text-4xl lg:text-5xl font-semibold text-primaryColor">
        Our Projects
      </p>
      <section className="py-12 bg-[#E6EFFA]">
        {message && <div className="text-center px-8">{message}</div>}

        <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-10 px-6  md:grid-cols-2 lg:grid-cols-3">
          {projects
            .slice(currentPage * itemsPerRow, (currentPage + 1) * itemsPerRow)
            .map((project: Project, index: Key | null | undefined) => (
              <ProjectCard key={index} project={project} />
            ))}
        </div>
        {totalRows > 1 && (
          <div className="flex items-center justify-center mt-6 space-x-2">
            {Array.from({ length: totalRows }, (_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full ${
                  currentPage === index ? "bg-primaryColor" : "bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProjectsComponent;
