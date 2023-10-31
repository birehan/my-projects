import { MouseEvent, SetStateAction, useState } from "react";
import { values } from "../../data/valuesData";

const ValuesList = () => {
  const [selectedValue, setSelectedValue] = useState(0);

  const handleSelectChange = (
    event: MouseEvent,
    index: SetStateAction<number>
  ) => {
    event.preventDefault();
    setSelectedValue(index);
  };

  return (
    <div className="flex-1 flex-col flex items-stretch justify-between h-full gap-5 lg:gap-0">
      {values.map((val, index) => (
        <div className="py-5 px-6 rounded-sm bg-white" key={index}>
          <details
            open={index === selectedValue ? true : false}
            className={`group`}
            id={`details${index}`}
          >
            <summary
              onClick={(event) => handleSelectChange(event, index)}
              className="flex justify-between items-center font-medium cursor-pointer list-none"
            >
              <span className="text-primaryColor text-xl">
                {val.id} {val.title}
              </span>
              <span className="transition group-open:rotate-180">
                <svg
                  fill="none"
                  height="24"
                  shapeRendering="geometricPrecision"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </summary>
            <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
              {val.desc}
            </p>
          </details>
        </div>
      ))}
    </div>
  );
};

export default ValuesList;
