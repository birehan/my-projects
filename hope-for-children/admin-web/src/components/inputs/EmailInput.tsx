import { useFormContext } from "react-hook-form";

const EmailInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex-1">
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Email address
      </label>

      <div className="mt-2">
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email", {
            required: {
              value: true,
              message: "email is required",
            },
            pattern: {
              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
              message: "invalid email",
            },
          })}
          className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryColorHover sm:text-sm sm:leading-6"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.email && errors.email.message
            ? String(errors.email.message)
            : null}
        </p>
      </div>
    </div>
  );
};

export default EmailInput;
