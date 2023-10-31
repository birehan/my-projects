import React from "react";
import { Link } from "react-router-dom";

interface HeaderLinkProps {
  title: string;
  link: string;
  position: "screen" | "drawer"; // Assuming "screen" or "drawer"
}

const classNames = {
  screen: "text-base lg:text-lg font-semibold leading-6 text-black",
  drawer:
    "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-gray-50",
};

const HeaderLink: React.FC<HeaderLinkProps> = ({ title, link, position }) => {
  return (
    <Link to={link} className={classNames[position]}>
      {title}
    </Link>
  );
};

export default HeaderLink;
