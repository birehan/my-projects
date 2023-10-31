import { BiLogoFacebook, BiLogoTelegram } from "react-icons/bi";
import { FaTiktok } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    icon: <BiLogoFacebook />,
    url: "https://www.facebook.com/100077574357136/posts/pfbid02UdtwXfeB5aVovhnFy7xjv8maqHdTn8zKg7tY3wnEfrrdCwHNSWoba9Xd1AoMprjXl/?app=fbl",
  },
  {
    icon: <BiLogoTelegram />,
    url: "https://t.me/hfc_ethio",
  },
  {
    icon: <FaTiktok />,
    url: "https://www.tiktok.com/@hfc",
  },
  {
    icon: <AiOutlineTwitter />,
    url: "https://twitter.com/HFCEORG",
  },
];

const Footer = () => {
  return (
    <footer
      className="bg-[#F7F8FC80] py-8 mt-8 xl:mt-16 "
      style={{ boxShadow: "0 -3px 3px -5px #333" }}
    >
      <div className="mx-auto max-w-[90rem] px-6 flex flex-col gap-4 ">
        <div className=" flex-wrap md:flex-nowrap flex justify-between ">
          <div className="flex flex-col gap-2">
            <h1 className="font-volkhov font-bold text-xl leading-6 tracking-wider">
              Hope For Children
            </h1>
            <div>
              <p className="">Children Grow in a happy</p>
              <p className="">and healthy environment</p>
            </div>
            <div className="flex items-center gap-2">
              {socialLinks.map((social, index) => {
                return (
                  <a
                    key={index}
                    className="w-10 h-10 border rounded-[50%]  bg-[#FFFFFF] shadow-md flex items-center justify-center hover:bg-primaryColor hover:text-white"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="mt-5 sm:mt-0">
            <h1 className="font-volkhov font-bold text-xl leading-6 tracking-wider text-primary-b">
              Company
            </h1>
            <ul className="mt-2 ">
              <li className="my-2 hover:text-primaryColor">
                <Link to="/about">About</Link>
              </li>
              <li className="my-2 hover:text-primaryColor">
                <Link to="/projects">Projects</Link>
              </li>
              <li className="my-2 hover:text-primaryColor">
                <Link to="/programs#">Programs</Link>
              </li>
              <li className="my-2 hover:text-primaryColor">
                <Link to="/donate">Donate</Link>
              </li>
            </ul>
          </div>
          <div className="mt-5 md:mt-0">
            <h1 className="font-volkhov font-bold text-xl leading-6 tracking-wider text-primary-b">
              Contact
            </h1>
            <p className="my-2">Phone : +251 11 122 2621 /+251 91 156 3074</p>
            <p className="my-2">
              P.O.box : 24550 Code 1000 Addis Ababa, Ethiopia
            </p>
            <p className="my-2 hover:text-primaryColor">
              Email:{" "}
              <a
                href="mailto:hopeforchildrenethiopia2001@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                hopeforchildrenethiopia2001@gmail.com
              </a>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <hr className="border border-gray-400 border-opacity-50" />
          <div className="flex ">
            <p>@2023 Hope For Children all rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
