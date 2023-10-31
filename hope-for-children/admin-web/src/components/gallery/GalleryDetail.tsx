import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  CleanStatusGallery,
  DeleteGalleryAction,
  GetGalleryByIdAction,
} from "../../features/redux/gallerySlice";
import Loading from "../common/Loading";
import { PhotoDetail } from "../../types/types";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import DeletePopup from "../common/DeletePopup";
import Notification from "../common/Notification";

const GalleryDetail = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { id } = useParams();
  const { gallery, isLoading, isDeleteSuccess } = useSelector(
    (state: any) => state.galleries
  );

  useEffect(() => {
    if (id) {
      dispatch(GetGalleryByIdAction(id));
    }

    return () => {
      dispatch(CleanStatusGallery());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (isDeleteSuccess) {
      setTimeout(() => {
        navigate("/galleries");
      }, 2000);
    }
  }, [isDeleteSuccess, navigate]);

  if (isLoading || gallery === null) {
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
          id={gallery.id}
          DeleteAction={DeleteGalleryAction}
        />
      )}

      <div className="mx-auto max-w-[100rem] flex flex-col gap-6 ">
        <div className="flex flex-row justify-between items-center gap-4">
          <h3 className="text-primaryColor text-2xl font-bold">
            {gallery.title}
          </h3>

          <div className="flex flex-row items-center justify-center gap-4">
            <Link to={`/gallery/update/${gallery.id}`}>
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
        <div className="mx-auto w-full  grid grid-cols-2 gap-6   xl:grid-cols-3 2xl:grid-cols-4">
          {gallery.photos.map((photo: PhotoDetail, index: number) => {
            return (
              <article
                key={index}
                className="bg-[white] border border-[silver] gap-4 flex flex-col justify-between rounded-xl  hover:transform hover:scale-[1.02] duration-300 "
              >
                <Link to={`/gallery/${gallery.id}`}>
                  <div className="relative flex items-end overflow-hidden rounded-t-lg  aspect-w-4 aspect-h-3 ">
                    <img
                      src={photo.url}
                      alt="gallery"
                      className="object-cover w-full max-h-[20rem] xl:max-h-[24rem]"
                    />
                    {photo.isMainPhoto && (
                      <div className=" px-2 py-2 absolute b-0 bg-white">
                        <h2 className="text-center mt-1 text-sm font-semibold leading-7 text-gray-900 w-full">
                          Cover Photo
                        </h2>
                      </div>
                    )}
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GalleryDetail;
