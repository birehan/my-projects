import { useEffect, useState } from "react";
import { staffItems } from "../../data/aboutData";
import StaffDropdown from "./StaffDropdown";
import { useParams, Link } from "react-router-dom";

const StaffSidebar = () => {
  const { staffType } = useParams();

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const [isLargeScreen, setIsLargeScreen] = useState(true); // Initialize with 1 item per row

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
  }, []);

  return (
    <div>
      {isLargeScreen ? (
        <ul className="flex flex-col gap-2 bg-white p-6  shadow-md rounded-md">
          <li className="group flex items-center gap-3 rounded-md px-2">
            <img
              className="w-10 h-10"
              src={staffItems.icon}
              alt={staffItems.title}
            />
            <h4 className="text-lg leading-6 font-semibold">
              {staffItems.title}
            </h4>
          </li>

          <li>
            <ul className=" space-y-1 flex flex-col gap-1">
              {staffItems.items.map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/staffs/${item.staffType}`}
                    className={classNames(
                      staffType === item.staffType
                        ? " text-primaryColor bg-[#F7F8FC80]"
                        : "text-gray-700 hover:text-primaryColor hover:bg-gray-50",
                      "group flex gap-x-3 rounded-md p-2 text-md leading-6 font-semibold"
                    )}
                  >
                    <img
                      src={item.icon}
                      alt={item.title}
                      className={classNames(
                        staffType === item.staffType
                          ? "text-primaryColor "
                          : "text-gray-400 group-hover:text-primaryColor  ",
                        "h-6 w-6 shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      ) : (
        <StaffDropdown />
      )}
    </div>
  );
};

export default StaffSidebar;
