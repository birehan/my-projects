import { Link } from "react-router-dom";
import { Project } from "../../types/types";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="gap-4 flex flex-col justify-between rounded-xl bg-white px-6 pt-6 pb-6 shadow-lg hover:shadow-xl hover:transform hover:scale-[1.02] duration-300 ">
      <Link to={`/project/${project.id}`}>
        <div className="relative flex items-end overflow-hidden rounded-xl aspect-w-4 aspect-h-3 ">
          <img
            src={project.photoUrl}
            alt="Project"
            className="object-cover w-full h-[18rem]"
          />
        </div>

        <div className="mt-2 p-2 flex flex-col justify-between gap-2">
          <h2 className="text-primaryColor font-semibold text-xl md:text-2xl overflow-hidden overflow-ellipsis w-full">
            {project.title}
          </h2>
          <p className="mt-1 text-base text-gray-600">
            {project.description.slice(0, 135)}
            {project.description.length > 135 ? "..." : ""}
          </p>
        </div>
      </Link>

      <Link to={`/project/${project.id}`} className="text-center">
        <button className="text-md mt-3 space-x-1.5 rounded-md bg-primaryColor px-4 py-1.5 text-[white] duration-100 hover:bg-primaryColorHover  ">
          Read More
        </button>
      </Link>
    </article>
  );
};

export default ProjectCard;
