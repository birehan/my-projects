import CommonLanding from "../components/CommonLanding";
import DonateForm from "../components/DontationForm";
import Layout from "../components/Layout";

const DontationPage = () => {
  return (
    <Layout>
      <div>
        <CommonLanding
          title="Donating is about making a Difference."
          icon={null}
        />

        <div className="px-6 mt-8 xl:mt-16 flex flex-col lg:flex-row max-w-[90rem] mx-auto gap-8">
          <div className="mx-auto w-full flex-[6]">
            <div className=" my-3">
              <h1 className="text-2xl">Bank Account Details</h1>
            </div>
            <div className="border rounded-md px-4 text-base md:text-lg w-full">
              <div className="grid grid-cols-16 auto-cols-max gap-2 md:gap-4  py-4">
                <h1 className="text-[#00B1F4] col-span-1">01</h1>
                <h1 className="col-span-5">BANK OF ABYSSINIA</h1>
                <h1 className="col-span-4">62246871</h1>
                <h1 className="col-span-6">Hope for Children Organization</h1>
              </div>
              <hr />
              <div className="grid grid-cols-16 md:gap-4 gap-2  my-4">
                <h1 className="text-[#00B1F4] col-span-1">02</h1>
                <h1 className="col-span-5">COMMERCIAL BANK OF ETHIOPIA</h1>
                <h1 className="col-span-4">1000010785069</h1>
                <h1 className="col-span-6">Hope for Children Organization</h1>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full shadow-md border-[#00B1F4] rounded-md  p-6 bg-white flex-[4]">
            <DonateForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DontationPage;
