import { Link } from "react-router-dom";
import { homeThematics } from "../../data/thematicData";

const ThematicSample = () => {
  return (
    <div className="mx-auto mt-4 grid max-w-[90rem] grid-cols-1 gap-10  md:grid-cols-2 lg:grid-cols-3">
      {homeThematics.map((feature) => (
        <div
          key={feature.name}
          className="flex flex-col  shadow-md p-4 rounded-md bg-white"
        >
          <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
            <feature.icon
              className="h-5 w-5 flex-none text-primaryColor"
              aria-hidden="true"
            />
            {feature.name}
          </dt>
          <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
            <p className="flex-auto">{feature.description}</p>
            <p className="mt-6">
              <Link
                to={`/programs${feature.href}`}
                className="text-sm font-semibold leading-6 text-primaryColor"
              >
                Read more <span aria-hidden="true">→</span>
              </Link>
            </p>
          </dd>
        </div>
      ))}
    </div>
  );
};

export default ThematicSample;
