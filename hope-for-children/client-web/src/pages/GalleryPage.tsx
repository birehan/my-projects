import { useEffect } from "react";
import CommonLanding from "../components/CommonLanding";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Gallery } from "../types/types";
import { getGalleries } from "../api/ApiActions";
import Loading from "../components/Loading";
import Layout from "../components/Layout";

const GalleryPage = () => {
  const dispatch = useDispatch();
  const { galleries, loading } = useSelector((state: any) => state.reducer);

  useEffect(() => {
    dispatch(getGalleries());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div>
        <CommonLanding icon={null} title="WELCOME TO OUR GALLERY" />

        <div className="px-6 mt-8 xl:mt-16">
          <div>
            <div className="mx-auto  max-w-[90rem] grid grid-cols-2 gap-6   lg:grid-cols-3 xl:grid-cols-4">
              {galleries.map((gallery: Gallery, index: number) => {
                return (
                  <article
                    key={index}
                    className="gap-4 flex flex-col justify-between rounded-xl  hover:transform hover:scale-[1.02] duration-300 "
                  >
                    <Link to={`/gallery/${gallery.id}`}>
                      <div className="relative flex items-end overflow-hidden rounded-lg aspect-w-4 aspect-h-3 ">
                        <img
                          src={gallery.mainPhotoUrl}
                          alt="gallery"
                          className="object-cover w-full h-[16rem] xl:h-[24rem]"
                        />
                      </div>

                      <h2 className="mt-1 text-base font-semibold leading-7 text-gray-900 w-full">
                        {gallery.title}
                      </h2>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GalleryPage;
