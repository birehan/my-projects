import { partners } from "../../data/partnersData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Mousewheel } from "swiper";

const Partners = () => {
  return (
    <div className="flex gap-6 flex-col ">
      <p className="text-center text-3xl sm:text-4xl lg:text-5xl font-semibold text-primaryColor">
        Partners
      </p>
      <section className="py-4 overflow-auto px-6">
        <div className=" rounded-md mx-auto max-w-[90rem] gap-12 flex flex-row px-3 items-center justify-center h-48 relative shadow-[0px_0px_20px_0px_#00B1F42E]">
          <Swiper
            cssMode={true}
            navigation={true}
            mousewheel={true}
            spaceBetween={50}
            slidesPerView={"auto"}
            keyboard={true}
            modules={[Navigation, Mousewheel]}
            style={{ padding: "0 40px" }}
            className=" sample-slider"
          >
            {partners.map((partner, index) => {
              return (
                <SwiperSlide
                  key={index}
                  style={{
                    width: "fit-content",
                    height: "12rem",
                  }}
                >
                  <div
                    className="h-full w-48 flex items-center justify-center"
                    key={index}
                    title={partner.name}
                  >
                    <a
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={partner.imageSrc}
                        alt={partner.name}
                        className="w-[12rem] object-cover "
                      />
                    </a>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default Partners;
