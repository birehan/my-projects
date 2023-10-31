import { useInView } from "react-intersection-observer";
import { CountUp } from "use-count-up";
import statisticsData from "../../data/statisticsData";

const Statistics = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div
      style={{
        backgroundImage: "url(/assets/images/stats.png)",
        backgroundSize: "cover",
      }}
      className="w-full h-[30rem]"
      ref={ref}
    >
      <div
        style={{
          backdropFilter: "brightness(60%)",
        }}
        className=" h-full"
      >
        <div className="grid mx-auto max-w-[90rem] grid-cols-2 p-6 lg:grid-cols-4 items-center h-full">
          {statisticsData.map((stats, index) => {
            const MyComponent = () => (
              <CountUp
                isCounting={inView}
                start={1}
                end={stats.title}
                duration={1}
              />
            );

            return (
              <div key={index} className="flex items-center justify-center">
                <div
                  key={index}
                  className="flex flex-col text-white w-fit max-w-[18rem] text-center justify-center items-center gap-4"
                >
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold">
                      <MyComponent /> +
                    </h1>
                    <hr className="h-[3px] border-0 bg-[#00b1f4] mt-[5px]" />
                  </div>
                  <p className="mt-[5px] text-xl">{stats.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
