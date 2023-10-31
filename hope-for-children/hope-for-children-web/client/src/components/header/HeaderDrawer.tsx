import { Dialog, Disclosure } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import HeaderLink from "./HeaderLink";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
interface props {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
}

export default function HeaderDrawer({
  mobileMenuOpen,
  setMobileMenuOpen,
}: props) {
  const navigate = useNavigate();

  return (
    <Dialog
      as="div"
      className="lg:hidden z-[100]"
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
    >
      <div className="fixed inset-0 z-10" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <Link to="/" className="-m-1.5 p-1.5">
            <img
              className="h-8 w-auto"
              src="/assets/images/logo2.png"
              alt="hope"
            />
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              <HeaderLink title="Home" link="/" position="drawer" />
              <HeaderLink title="About-Us" link="/about" position="drawer" />
              <Disclosure as="div" className="-mx-3">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-black hover:bg-gray-50">
                      Achievements
                      <ChevronDownIcon
                        className={classNames(
                          open ? "rotate-180" : "",
                          "h-5 w-5 flex-none"
                        )}
                        aria-hidden="true"
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-2 space-y-2 flex flex-col items-start">
                      {[...achievements].map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          // as="a"
                          // href={item.href}
                        >
                          <Link
                            to={item.to}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-black hover:bg-gray-50"
                          >
                            {item.name}
                          </Link>
                        </Disclosure.Button>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <HeaderLink title="Projects" link="/projects" position="drawer" />
              <HeaderLink title="Gallery" link="/gallery" position="drawer" />
              <HeaderLink
                title="Contact-Us"
                link="/contact"
                position="drawer"
              />
            </div>
            <div className="py-6 text-center">
              <button
                onClick={() => navigate("/donate")}
                type="button"
                className=" rounded-lg bg-primaryColor px-3 py-1.5 text-base lg:text-lg font-semibold text-white shadow-sm hover:bg-primaryColorHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                DONTATE NOW
              </button>
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
