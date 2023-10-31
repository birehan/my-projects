import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const achievements = [
  {
    name: "Our Work",
    to: "/acheivements",
  },
  {
    name: "Alumni",
    to: "/alumni",
  },
];

export default function AchievementDropdown() {
  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center gap-x-1 text-base lg:text-lg  font-semibold leading-6 text-black">
        Achievements
        <ChevronDownIcon
          className="h-5 w-5 flex-none text-gray-400"
          aria-hidden="true"
        />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-[13rem] overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5">
          {({ close }) => (
            
            <div className="p-4">
              {achievements.map((item) => (
                <div
                  key={item.name}
                  className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                >
                  <div className="flex-auto">
                    <Link
                      onClick={() => close()}
                      to={item.to}
                      className="block font-semibold text-black"
                    >
                      {item.name}
                      <span className="absolute inset-0" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
