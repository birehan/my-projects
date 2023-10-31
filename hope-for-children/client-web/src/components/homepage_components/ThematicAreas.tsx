import React from "react";
import ThematicSample from "./ThematicSample";

const ThematicAreas = () => {
  return (
    <div className="flex flex-col gap-4 px-6">
      <h1 className="text-center text-4xl lg:text-5xl text-primaryColor font-bold">
        Thematic Areas
      </h1>
      <p className="text-center lg:text-lg">
        Hope for Children Organization helps children and their families reach
        their full potential by providing comprehensive support.
      </p>
      <ThematicSample />
    </div>
  );
};

export default ThematicAreas;
