import { v4 as uuidv4 } from "uuid";
import Select from "react-select";

const DonateForm = () => {
  const currencyList = [
    { value: "ETB", label: "ETB" },
    { value: "USD", label: "USD" },
  ];

  return (
    <div className="flex-1 ">
      <div>
        <h1 className="text-center mb-6 text-4xl">Donate Now</h1>
        <p></p>
      </div>
      <div className="donate flex flex-col items-center justify-center  px-0">
        <form
          method="POST"
          action={process.env.REACT_APP_CHAPA_URL}
          className="flex flex-col items-center justify-center w-full"
          onSubmit={(e) => {
            console.log("data: ", e);
          }}
        >
          <div className="sm:flex flex-col gap-5 w-full  my-3">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email Address
              </label>
              <input
                name="email"
                type="emil"
                required
                className="p-[8px]  border w-full border-[#00B1F4] rounded-md mt-2 flex-1"
              />
            </div>

            <div>
              <label
                htmlFor="currency"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Donation Amount
              </label>
              <div className="mt-2 flex flex-row gap-4 items-center justify-center">
                <div className=" flex-[4]">
                  <Select
                    className="select-input"
                    placeholder="Select currency"
                    isClearable
                    options={currencyList}
                    required
                    name="currency"
                  />
                </div>

                <div className="flex-[6] ">
                  <input
                    className="remove-arrow p-[8px] border w-full border-[#00B1F4] rounded-md my-6 sm:my-0 flex-[7]"
                    placeholder="Amount"
                    type="number"
                    name="amount"
                    required
                  />
                </div>
              </div>
            </div>

            <input
              type="hidden"
              name="public_key"
              value={process.env.REACT_APP_CHAPA_PBULIC_ID}
            />
            <input type="hidden" name="tx_ref" value={`negade-${uuidv4()}`} />
            <input
              type="hidden"
              name="return_url"
              value={process.env.REACT_APP_CHAPA_RETURN_URL}
            />

            <button
              type="submit"
              className="my-5 p-[10px] bg-[#00B1F4] w-full rounded-md text-white flex items-center justify-center gap-2"
            >
              DONATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonateForm;
