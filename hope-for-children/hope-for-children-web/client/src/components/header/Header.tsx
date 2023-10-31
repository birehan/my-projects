import { Popover } from "@headlessui/react";
import HeaderDrawer from "./HeaderDrawer";
import AchievementDropdown from "./AchievementDropdown";
import HeaderLink from "./HeaderLink";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header
      className="w-full sticky top-0 bg-secondaryColor shadow-md"
      style={{
        filter: "brightness(100%) !important",
        zIndex: 10,
        backdropFilter: "blur(5px)",
      }}
    >
      <nav
        className="mx-auto flex max-w-[90rem] items-center justify-between px-6 py-4 2xl:px-0"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1 flex flex-row gap-3 items-center">
            <img
              className="h-8 lg:h-10 w-auto"
              src="assets/images/logo2.png"
              alt=""
            />
            <p className="text-primaryColor font-bold text-xl  lg:text-2xl">
              Hope For Children
            </p>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-8 xl:gap-x-12">
          <HeaderLink title="Home" link="/" position="screen" />
          <HeaderLink title="About-Us" link="/about" position="screen" />
          <AchievementDropdown />
          <HeaderLink title="Projects" link="/projects" position="screen" />
          <HeaderLink title="Gallery" link="/gallery" position="screen" />
          <HeaderLink title="Contact-Us" link="/contact" position="screen" />
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={() => navigate("/donate")}
            type="button"
            className="rounded-lg bg-primaryColor px-3 py-1.5 text-base lg:text-lg font-semibold text-white shadow-sm hover:bg-primaryColorHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryColorHover"
          >
            DONTATE NOW
          </button>
        </div>
      </nav>
      <HeaderDrawer
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </header>
  );
};

export default Header;
