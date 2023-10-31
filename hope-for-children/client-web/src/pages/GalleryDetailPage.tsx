import { useEffect, useState } from "react";
import CommonLanding from "../components/CommonLanding";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGalleryDetail } from "../api/ApiActions";
import Loading from "../components/Loading";
import Layout from "../components/Layout";

const GalleryDetailPage = () => {
  const dispatch = useDispatch();
  const { gallery, loading } = useSelector((state: any) => state.reducer);
  const { id } = useParams();
  const [isLargeScreen, setIsLargeScreen] = useState(true); // Initialize with 1 item per row

  const grid_rows = [
    [3, 4],
    [1, 3],
    [1, 2],
    [1, 3],
    [3, 4],
    [2, 4],
  ];

  const grid_rows_sm = [
    [6, 7],
    [1, 3],
    [1, 2],
    [3, 4],
    [2, 4],
    [4, 5],
    [4, 6],
    [5, 7],
  ];

  useEffect(() => {
    dispatch(getGalleryDetail(id));
  }, [dispatch, id]);

  const updateisLargeScreen = () => {
    if (window.innerWidth >= 1024) {
      setIsLargeScreen(true); // Large screens
    } else {
      setIsLargeScreen(false); // Small screens
    }
  };

  // Listen for window resize and update isLargeScreen accordingly
  useEffect(() => {
    updateisLargeScreen();
    window.addEventListener("resize", updateisLargeScreen);
    return () => {
      window.removeEventListener("resize", updateisLargeScreen);
    };
  }, [dispatch]);

  if (loading || gallery === null) {
    return <Loading />;
  }

  return (
    <Layout>
      <div>
        <CommonLanding icon={null} title={`${gallery.title}`} />

        <div className="px-6 mt-8 xl:mt-16">
          <div className="mx-auto grid max-w-[90rem] grid-cols-2 gap-4 lg:grid-cols-3 gallery-container">
            {gallery.photos.map((photo: any, index: number) => {
              let row_start = 0;
              let row_end = 0;
              let height = "24rem";
              if (index % 2 === 0) {
                height = "36rem";
              }

              if (isLargeScreen) {
                const grid_index = (index + 1) % 6;
                row_start = grid_rows[grid_index][0];
                row_end = grid_rows[grid_index][1];
                grid_rows[grid_index] = [row_start + 4, row_end + 4];
              } else {
                const grid_index = (index + 1) % 8;
                row_start = grid_rows_sm[grid_index][0];
                row_end = grid_rows_sm[grid_index][1];
                grid_rows_sm[grid_index] = [row_start + 6, row_end + 6];

                let diff = row_end - row_start;
                if (diff === 1) {
                  height = "16rem";
                } else {
                  height = "24rem";
                }
              }

              return (
                <div
                  style={{
                    gridRow: `${row_start}/${row_end}`,
                    height: `${height}`,
                  }}
                  key={index}
                  className={`hover:transform hover:scale-[1.02] duration-300`}
                >
                  <img
                    src={photo.url}
                    alt="gallery"
                    className="object-cover w-full rounded-md h-full"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GalleryDetailPage;
