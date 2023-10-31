import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Gallery } from "../../types/types";
import Notification from "../common/Notification";
import { FetchAllGallerys } from "../../features/redux/gallerySlice";
import Loading from "../common/Loading";
import { BsPlus } from "react-icons/bs";

const GalleryList = () => {
  const dispatch = useDispatch();

  const { isLoading, galleries, isDeleteSuccess, error } = useSelector(
    (state: any) => state.galleries
  );

  useEffect(() => {
    if (galleries.length === 0) {
      dispatch(FetchAllGallerys());
    }
  }, [dispatch]);

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
            Gallery Categories
          </h3>

          <Link to="/gallery/create">
            <button
              type="button"
              className=" inline-flex justify-center items-center  gap-x-1.5 rounded-md bg-primaryColor px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primaryColorHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryColorHover"
            >
              <BsPlus className=" h-6 w-6" aria-hidden="true" />
              Create Gallery
            </button>
          </Link>
        </div>
        <div className="mx-auto w-full  grid grid-cols-2 gap-6   xl:grid-cols-3 2xl:grid-cols-4">
          {galleries.map((gallery: Gallery, index: number) => {
            return (
              <article
                key={index}
                className="bg-[white] border border-[silver] gap-4 flex flex-col justify-between rounded-xl  hover:transform hover:scale-[1.02] duration-300 "
              >
                <Link to={`/galleries/${gallery.id}`}>
                  <div className="relative flex items-end overflow-hidden rounded-t-lg  aspect-w-4 aspect-h-3 ">
                    <img
                      src={gallery.mainPhotoUrl}
                      alt="gallery"
                      className="object-cover w-full max-h-[20rem] xl:max-h-[24rem]"
                    />
                  </div>

                  <div className=" px-2 py-1">
                    <h2 className="text-center mt-1 text-base font-semibold leading-7 text-gray-900 w-full">
                      {gallery.title}
                    </h2>
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

export default GalleryList;
