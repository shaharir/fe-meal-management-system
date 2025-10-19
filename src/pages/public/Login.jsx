import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useLoginMutation } from "../../lib/redux/services/auth/auth.service";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mobile: "",
      password: "",
    },
  });

  // Handle form submit
  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* Left Side Info */}
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-primary">Login now!</h1>
          <p className="py-6 max-w-md text-gray-600">
            Access your dashboard, manage your business, and stay in control.
            Please enter your credentials to continue.
          </p>
        </div>

        {/* Login Form Card */}
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Mobile */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Mobile</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your mobile number"
                  {...register("mobile", {
                    required: "Mobile number is required",
                    minLength: {
                      value: 6,
                      message: "Mobile number is too short",
                    },
                  })}
                  className={`input input-bordered ${
                    errors.mobile ? "input-error" : ""
                  }`}
                />
                {errors.mobile && (
                  <span className="text-error text-sm mt-1">
                    {errors.mobile.message}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="form-control mt-3">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 4,
                        message: "Password must be at least 4 characters",
                      },
                    })}
                    className={`input input-bordered w-full ${
                      errors.password ? "input-error" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-error text-sm mt-1">
                    {errors.password.message}
                  </span>
                )}

                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              {/* Submit */}
              <div className="form-control mt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-neutral"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-600 mt-3">
              Don’t have an account?{" "}
              <a href="/register" className="link link-primary">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
