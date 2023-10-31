import { sidebarProjects, sidebarPrograms } from "../data/aboutData";
import { Link } from "react-router-dom";

export const ProjectsSidebar = () => {
  return (
    <ul className="flex flex-col gap-4 bg-white p-6  shadow-sm rounded-sm">
      <li className="group flex items-center gap-3 rounded-md p-2">
        <img
          className="w-10 h-10"
          src={sidebarProjects.icon}
          alt={sidebarProjects.title}
        />
        <h4 className="text-lg leading-6 font-semibold">
          {sidebarProjects.title}
        </h4>
      </li>

      <li>
        <ul className=" space-y-1 flex flex-col gap-2">
          {sidebarProjects.items.map((item, index) => (
            <li key={index}>
              <Link
                to="/"
                className="
                     text-gray-700 hover:text-primaryColor hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className="
                      text-gray-400 group-hover:text-primaryColor h-6 w-6 shrink-0"
                  aria-hidden="true"
                />
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
};

export const ProgramsSidebar = () => {
  return (
    <ul className="flex flex-col gap-4 bg-white p-6  shadow-sm rounded-sm">
      <li className="group flex items-center gap-3 rounded-md p-2">
        <img
          className="w-10 h-10"
          src={sidebarPrograms.icon}
          alt={sidebarPrograms.title}
        />
        <h4 className="text-lg leading-6 font-semibold">
          {sidebarPrograms.title}
        </h4>
      </li>

      <li>
        <ul className=" space-y-1 flex flex-col gap-2">
          {sidebarPrograms.items.map((item, index) => (
            <li key={index}>
              <Link
                to={`/programs/${item.href}`}
                className="
                       text-gray-700 hover:text-primaryColor hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className="
                        text-gray-400 group-hover:text-primaryColor h-6 w-6 shrink-0"
                  aria-hidden="true"
                />
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
};
