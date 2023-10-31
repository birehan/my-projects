import { useDispatch } from "react-redux";
import { FetchAllProjects } from "../../features/redux/projectSlice";
import { useEffect } from "react";

const Projects = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchAllProjects());
    return () => {};
  }, []);

  return (
    <main className="py-10 ">
      <div className="px-4 sm:px-6 lg:px-8">Projects changes</div>
    </main>
  );
};

export default Projects;
