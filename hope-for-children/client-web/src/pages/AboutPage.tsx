import StaffSidebar from "../components/about_components/StaffSidebar";
import AboutContent from "../components/about_components/AboutContent";
import CommonLanding from "../components/CommonLanding";
import Layout from "../components/Layout";

const AboutPage = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-8  xl:gap-16">
        <CommonLanding title="Who We Are" icon={null} />

        <div className="px-6">
          <div className="mx-auto grid max-w-[100rem] grid-cols-1 gap-4 xl:gap-12 lg:grid-cols-12">
            <div className="lg:col-span-3 ">
              <nav className="flex flex-1 flex-col">
                <ul className="flex flex-1 flex-col gap-12">
                  <StaffSidebar />
                </ul>
              </nav>
            </div>
            <div className="lg:col-span-9">
              <AboutContent />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
