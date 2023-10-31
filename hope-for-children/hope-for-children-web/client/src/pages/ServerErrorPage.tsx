import { useLocation } from "react-router-dom";
export default function ServerErrorPage() {
  const { state } = useLocation();

  const handleReload = () => {
    console.log("path: ", state.path);
    window.location.href = state.path;
  };

  return (
    <>
      <div className="h-full grid min-h-[100vh] place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-3xl font-semibold text-primaryColor">500</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Server Error
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Oops, something went wrong.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={handleReload}
              className="rounded-md bg-primaryColor px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primaryColorHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryColorHover"
            >
              Reload
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
