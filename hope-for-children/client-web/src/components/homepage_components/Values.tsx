import ValuesList from "./ValuesList";

const Values = () => {
  return (
    <div className="flex gap-10 flex-col ">
      <p className="text-center text-3xl sm:text-4xl lg:text-5xl font-semibold text-primaryColor">
        Our Values
      </p>
      <section className="py-12 bg-[#E6EFFA]">
        <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-16 px-6  lg:grid-cols-2">
          <ValuesList />
          <div className="hidden lg:flex flex-1">
            <img
              className="object-cover h-full min-h-[35rem] rounded-sm"
              src="/assets/images/a.jpg"
              alt="values"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
export default Values;
