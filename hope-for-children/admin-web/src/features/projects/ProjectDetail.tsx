import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  CleanStatusProject,
  DeleteProjectAction,
  GetProjectByIdAction,
} from "../../features/redux/projectSlice";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Loading from "../../components/common/Loading";
import Notification from "../../components/common/Notification";
import DeletePopup from "../../components/common/DeletePopup";

const ProjectDetail = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { id } = useParams();
  const { project, isLoading, isDeleteSuccess } = useSelector(
    (state: any) => state.projects
  );

  useEffect(() => {
    if (id) {
      dispatch(GetProjectByIdAction(id));
    }

    return () => {
      dispatch(CleanStatusProject());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (isDeleteSuccess) {
      console.log("delete success");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [isDeleteSuccess, navigate]);

  if (isLoading || project === null) {
    console.log("loading");
    return (
      <div>
        <Loading />
        {isDeleteSuccess && (
          <Notification
            success={isDeleteSuccess}
            message="Delete succesffully"
          />
        )}
      </div>
    );
  }

  return (
    <section className="xl:pb-8 ">
      {openDelete && (
        <DeletePopup
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          id={project.id}
          DeleteAction={DeleteProjectAction}
        />
      )}

      <div className="mx-auto max-w-[100rem] flex flex-col gap-6 ">
        <div className="flex flex-row justify-between items-center gap-4">
          <h3 className="text-primaryColor text-2xl font-bold">
            {project.title}
          </h3>

          <div className="flex flex-row items-center justify-center gap-4">
            <Link to={`/Project/update/${project.id}`}>
              <button
                type="button"
                className=" inline-flex justify-center items-center  gap-x-1.5 rounded-md bg-blue-600  hover:bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryColorHover"
              >
                <AiFillEdit className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Update
              </button>
            </Link>

            <button
              onClick={() => setOpenDelete(true)}
              type="button"
              className=" inline-flex justify-center items-center  gap-x-1.5 rounded-md bg-[red] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#ff6666] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryColorHover"
            >
              <AiFillDelete className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Delete
            </button>
          </div>
        </div>
        <div className="mx-auto w-full  grid grid-cols-1 gap-6">
          <div className="flex flex-col gap-4">
            <h3 className="block text-sm font-medium leading-6 text-gray-900">
              Cover Image
            </h3>
            <div className="relative flex items-end overflow-hidden rounded-t-lg  aspect-w-4 aspect-h-3 ">
              <img
                src={project.photoUrl}
                alt="gallery"
                className="object-cover w-[40rem] max-w-full max-h-[20rem] xl:max-h-[24rem] border border-[silver]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="block text-sm font-medium leading-6 text-gray-900">
              Project Introduction
            </h3>
            <p>{project.description}</p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="block text-sm font-medium leading-6 text-gray-900">
              Project Content
            </h3>

            <div className="flex flex-col gap-4 px-6 mt-8 xl:mt-16">
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: project.content,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
