import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async (data) => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");

      // Redirect based on user role
      if (data.isAdmin) {
        window.location.href = "http://localhost:5174/"; // Redirect to the desired URL
      } else {
        navigate(from); // Navigate to the originally intended page
      }
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-4xl font-bold text-center mb-6">Sign in</h2>
        <p className="text-gray-600 text-center mb-6">
          For security, please sign in to access your information
        </p>

        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="flex justify-center mb-4">
            <button
              type="button"
              className="px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-medium"
            >
              EMAIL
            </button>
            <button
              type="button"
              className="px-4 py-2 text-gray-500 font-medium"
            >
              MOBILE
            </button>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              className={`border rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...register("email", { required: "This field is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className={`border rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white text-xl py-2 rounded-lg hover:bg-blue-500 transition-colors duration-300"
          >
            Sign in
          </button>

          <div className="flex justify-between items-center mt-4">
            <Link
              to="/register"
              className="text-sm text-blue-600 hover:underline"
            >
              Create account
            </Link>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline flex items-center"
            >
              <span className="mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 13l-3 3m0 0l-3-3m3 3V8m0 8h8.5M15 21H8.5A4.5 4.5 0 014 16.5v-9A4.5 4.5 0 018.5 3H15"
                  />
                </svg>
              </span>
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
