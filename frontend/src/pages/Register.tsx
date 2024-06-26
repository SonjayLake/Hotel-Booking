import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-clients";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Successful", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <>
      <form className="flex flex-col gap-5 " onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Create an Account</h2>

        <div className="flex flex-col md:flex-row gap-5">
          <label className="text-gray-700  text-sm text-bold flex-1">
            First Name
            <input
              className="border rounded w-full py-1 px-2 font-normal flex-1"
              {...register("firstName", { required: "This field is required" })}
            />
            {errors.firstName && (
              <span className="text-red-500">{errors.firstName.message}</span>
            )}
          </label>
          <label className="text-gray-700 text-sm text-bold flex-1">
            Last Name
            <input
              className="border rounded w-full py-1 px-2 font-normal flex-1"
              {...register("lastName", { required: "This field is required" })}
            />
            {errors.lastName && (
              <span className="text-red-500">{errors.lastName.message}</span>
            )}
          </label>
        </div>
        <label className="text-gray-700  text-sm text-bold flex-1">
          Email
          <input
            type="email"
            className="border rounded w-full py-1 px-2 font-normal flex-1"
            {...register("email", { required: "This field is required" })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </label>
        <label className="text-gray-700  text-sm text-bold flex-1">
          Password
          <input
            type="password"
            className="border rounded w-full py-1 px-2 font-normal flex-1"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters.",
              },
            })}
            autoComplete="on"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>
        <label className="text-gray-700  text-sm text-bold flex-1">
          Confirm Password
          <input
            type="password"
            autoComplete="on"
            className="border rounded w-full py-1 px-2 font-normal flex-1"
            {...register("confirmPassword", {
              validate: (value) => {
                if (!value) {
                  return "This field is required.";
                } else if (watch("password") != value) {
                  return "The passwords do not match.";
                } else {
                }
              },
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters.",
              },
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>

        <span>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold text-xl hover:bg-blue-500"
          >
            Create Account
          </button>
        </span>
      </form>
    </>
  );
}

export default Register;
