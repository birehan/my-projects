import CommonLanding from "../components/CommonLanding";
import Layout from "../components/Layout";
import { accomplishments } from "../data/accomplishmentsData";
import { BiTask } from "react-icons/bi";

const OurWorkPage = () => {
  return (
    <Layout>
      <div>
        <CommonLanding title="Our Accomplishment" icon={BiTask} />

        <div className="flex flex-col gap-16 my-8">
          <div className="flex flex-col gap-4 px-6">
            <div className="mx-auto mt-4 grid max-w-[70rem] gap-10  grid-cols-1">
              {accomplishments.map((work, index) => {
                return (
                  <div key={index} className="flex flex-col gap-4">
                    <p className="flex items-center gap-x-3 text-2xl font-semibold leading-7 text-primaryColor">
                      {work.title}
                    </p>
                    <div className="flex flex-col  shadow-md p-4 lg:p-8 rounded-md bg-white">
                      <dd className=" flex flex-auto flex-col text-base leading-7 text-gray-600 gap-2">
                        <p
                          dangerouslySetInnerHTML={{ __html: work.detail }}
                          className="flex-auto  text-base"
                        />
                        {/* {work.detail}
                        </p> */}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OurWorkPage;
