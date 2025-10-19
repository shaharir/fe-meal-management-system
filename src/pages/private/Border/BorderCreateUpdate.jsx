import React from "react";
import { modalOpenClose } from "../../../components/helper/modalOpenCllose";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomInput from "../../../components/custom/CustomInput";
import { useCreateBorderMutation } from "../../../lib/redux/services/border/border.service";

// Yup schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{11}$/, "Mobile number must be exactly 11 digits"),
  roomNo: yup.string().required("Room No is required"),
  note: yup.string(),
});

const defaultValues = { name: "", mobile: "", roomNo: "", note: "" };

const BorderCreateUpdate = ({ setCreateBorder }) => {
  const [createBorder] = useCreateBorderMutation();
  const handleClose = () => {
    modalOpenClose("border_modal", false);
    setCreateBorder(false);
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const res = await createBorder(data);
    if (res.data.code == 200) {
      handleClose();
      reset();
    }
  };

  return (
    <dialog id="border_modal" className="modal modal-end">
      <div className="modal-box w-11/12 max-w-3xl mt-4">
        <div className="flex justify-between">
          <h3 className="font-bold text-lg text-primary">
            Create / Update Border
          </h3>
          <button
            type="button"
            className="btn btn-error btn-sm"
            onClick={handleClose}
          >
            Close
          </button>
        </div>

        <div className="modal-action">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-base-100 p-6 rounded-2xl shadow-xl w-full max-w-3xl"
          >
            <div className="flex gap-4">
              <CustomInput
                control={control}
                name="name"
                label="Name"
                type="text"
                error={errors.name?.message}
              />
              <CustomInput
                control={control}
                name="mobile"
                label="Mobile"
                type="text"
                error={errors.mobile?.message}
              />
            </div>

            <div className="flex gap-4 mt-4">
              <CustomInput
                control={control}
                name="roomNo"
                label="Room No"
                type="text"
                error={errors.roomNo?.message}
              />
              <CustomInput
                control={control}
                name="note"
                label="Note"
                type="text"
                error={errors.note?.message}
              />
            </div>

            <div className="mt-6 flex justify-center">
              <button type="submit" className="btn btn-neutral w-full">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default BorderCreateUpdate;
