import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  "/assets/images/stats.png",
  "/assets/images/lifeskill.png",
  "/assets/images/stats.png",
];

const Landing: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const scrollToNextScreen = () => {
    const screenHeight = window.innerHeight;
    const scrollOffset = screenHeight - 5.28 * 16; // 1rem = 16px
    window.scrollBy({ top: scrollOffset, behavior: "smooth" });
  };

  return (
    <div className=" relative w-full h-[calc(100vh-5.28rem)] z-[5] filter brightness-100">
      <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-300">
        <div
          className="bg-cover bg-center filter brightness-[60%] absolute inset-0 z-[-1] object-cover"
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
            animation: "slideAnimation 0.3s forwards",
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-8 w-[calc(100%-130px)]   max-w-[90rem] m-auto text-center">
          <p className="text-secondaryColor text-4xl  lg:text-6xl font-bold">
            <span className="text-primaryColor">Happiness</span> comes from your
            <span className="text-primaryColor"> action</span>
          </p>

          <p className="text-secondaryColor text-xl lg:text-3xl ">
            Give a hope for children to grow in healthy environment
          </p>
          <div className="flex flex-row gap-6 items-center justify-center">
            <button
              onClick={() => navigate("/donate")}
              type="button"
              className="rounded-lg bg-primaryColor border-primaryColor px-3 py-1.5 text-base lg:text-lg font-semibold text-white shadow-sm hover:bg-transparent hover:border-secondaryColor border-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryColorHover"
            >
              SPONSOR A CHILD
            </button>

            <button
              onClick={() => navigate("/donate")}
              type="button"
              className="rounded-lg bg-transparent border-secondaryColor px-3 py-1.5 text-base lg:text-lg font-semibold text-white shadow-sm hover:bg-primaryColor hover:border-primaryColor border-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryColorHover"
            >
              DONATE NOW
            </button>
          </div>
        </div>
      </div>

      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-lg"
        onClick={goToPrevious}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-primaryColor"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-lg"
        onClick={goToNext}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-primaryColor"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <button
        onClick={scrollToNextScreen}
        className="animate-bounce absolute bottom-12 left-0 right-0 m-auto w-full flex justify-center"
      >
        <div className="w-6 h-6 border-b-2 border-r-2 transform rotate-45"></div>
      </button>
    </div>
  );
};

export default Landing;
