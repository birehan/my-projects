import React from "react";
import { IconType } from "react-icons";

interface Props {
  icon: IconType | null;
  title: string;
  backgroundImage?: string;
}

const CommonLanding = ({
  icon: IconComponent,
  title,
  backgroundImage = "/assets/images/stats.png",
}: Props) => {
  return (
    <div
      className="w-full h-[30rem]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          backdropFilter: "brightness(60%)",
        }}
        className=" h-full"
      >
        <div className="flex mx-auto max-w-[90rem]  justify-center items-center gap-4 h-full text-center">
          {IconComponent && (
            <IconComponent className="text-primaryColor text-4xl xl:text-5xl" />
          )}
          <h1 className="text-primaryColor text-3xl sm:text-4xl  lg:text-5xl font-bold">
            {title}{" "}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CommonLanding;
