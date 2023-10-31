import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { staffItems } from "../../data/aboutData";
import { useParams, useNavigate } from "react-router-dom";

const StaffDropdown = () => {
  const { staffType } = useParams();
  const navigate = useNavigate();

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="flex gap-4 items-center text-base lg:text-lg  font-semibold leading-6 text-black">
            <div className="flex flex-row gap-2 items-center">
              <img
                src={staffItems.icon}
                className="h-10 w-10 text-gray-600 group-hover:text-indigo-600"
                aria-hidden="true"
                alt={staffItems.title}
              />

              <h4 className="text-xl">{staffItems.title}</h4>
            </div>
            <ChevronDownIcon
              className="h-5 w-5 flex-none text-gray-400"
              aria-hidden="true"
            />
          </Popover.Button>

          {open && (
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute top-full z-10 mt-3 w-screen max-w-[100%] overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5">
                {({ close }) => (
                  <div className="p-4 flex flex-col gap-2">
                    {staffItems.items.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => [
                          close(),
                          navigate(`/staffs/${item.staffType}`),
                        ]}
                        className={classNames(
                          staffType === item.staffType
                            ? " text-primaryColor bg-[#F7F8FC80]"
                            : "text-gray-700 hover:text-primaryColor hover:bg-gray-50",
                          "group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50 hover:cursor-pointer"
                        )}
                      >
                        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <img
                            src={item.icon}
                            className="h-6 w-6 "
                            aria-hidden="true"
                            alt={item.title}
                          />
                        </div>

                        <div className="flex-auto">
                          <div className="block font-semibold">
                            {item.title}
                            <span className="absolute inset-0" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Popover.Panel>
            </Transition>
          )}
        </>
      )}
    </Popover>
  );
};

export default StaffDropdown;
