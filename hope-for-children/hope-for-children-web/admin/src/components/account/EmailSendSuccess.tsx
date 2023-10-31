import { Link } from "react-router-dom";

const EmailSentSuccess = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border border-gray-200 rounded-lg p-8 shadow-md w-full md:w-96">
        <div className="text-center">
          <img
            src="/assets/images/email.svg"
            alt="Email Sent"
            className="w-32 h-32 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold">Email Sent!</h2>
        </div>
        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="bg-primaryColor text-white px-8 py-2 rounded hover:opacity-80"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailSentSuccess;
