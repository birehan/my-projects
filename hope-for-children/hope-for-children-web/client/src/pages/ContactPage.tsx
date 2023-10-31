import { Map, Marker } from "pigeon-maps";
import { BiSolidPhoneCall } from "react-icons/bi";
import { HiOutlineMailOpen } from "react-icons/hi";
import ContactForm from "../components/ContactForm";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const ContactPage = () => {
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
    <Layout>
      <div className="w-full min-h-[calc(100vh-5.28rem)] filter brightness-100 flex items-center mx-auto bg-cover bg-center relative">
        <div
          className="bg-cover bg-center filter brightness-[60%] absolute inset-0 z-[-1] object-cover"
          style={{
            backgroundImage: `url(/assets/images/stats.png)`,
          }}
        ></div>
        <div className=" flex items-center justify-center w-full px-6 py-12 h-full">
          <div className=" max-w-[80rem] w-full rounded-2xl bg-white mx-auto flex overflow-hidden flex-col lg:flex-row h-full">
            <div className="p-6 xl:p-12 flex-1 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-semibold">
                  Get In <span className="text-primaryColor">Touch</span>
                </h1>
                <p className="my-2 text-base  text-gray-900">
                  Give a hope for homeless and be some one that creates
                  happiness for someone who needs
                </p>
              </div>
              <ContactForm />
              <div className="flex gap-8 flex-col xl:flex-row">
                <div className="flex flex-row gap-3 items-center">
                  <BiSolidPhoneCall size={30} />
                  <div className="flex flex-col gap-1 ">
                    <p className="font-semibold">Phone</p>
                    <p className="text-primaryColor">+251 11 122 2621</p>
                  </div>
                </div>

                <div className="flex flex-row gap-3 items-center">
                  <HiOutlineMailOpen size={30} />
                  <div className="flex flex-col gap-1 ">
                    <p className="font-semibold">Email</p>
                    <a
                      className="text-primaryColor"
                      href="mailto:hopeforchildrenethiopia2001@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      hopeforchildrenethiopia2001@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <Map
                animate={true}
                defaultCenter={[9.06223, 38.7584]}
                defaultZoom={6}
                height={isLargeScreen ? 0 : 350}
              >
                <Marker width={50} anchor={[9.06223, 38.7584]} />
              </Map>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
