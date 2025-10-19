import React from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/custom/CustomInput";

const defaultValues = {
  username: "",
  age: "",
  gender: "",
  agree: false,
};

const SignUp = () => {
  const { control, handleSubmit } = useForm({ defaultValues });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-100 p-6 rounded-2xl shadow-xl w-full max-w-3xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomInput
            control={control}
            name="username"
            label="Username"
            type="text"
          />
          <CustomInput control={control} name="age" label="Age" type="number" />

          <CustomInput
            control={control}
            name="gender"
            label="Gender"
            type="select"
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
          />

          <CustomInput
            control={control}
            name="agree"
            label="I agree to the terms"
            type="checkbox"
          />
        </div>

        <div className="mt-6 flex justify-center">
          <button type="submit" className="btn btn-neutral w-1/2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
