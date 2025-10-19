import React from "react";
import { modalOpenClose } from "../../../components/helper/modalOpenCllose";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomInput from "../../../components/custom/CustomInput";
import {
  useCreateBorderMutation,
  useGetBorderQuery,
} from "../../../lib/redux/services/border/border.service";
import { convertToOptions } from "../../../components/helper/convertToObject";

// Yup schema
const schema = yup.object().shape({
  border: yup.string().required("Border is required"),
  date: yup.string().required("Date is required"),
  amount: yup.number().required("Amount No is required"),
  roomNo: yup.string().required("Room No is required"),
  note: yup.string(),
});

const defaultValues = {
  border: "",
  date: new Date().toISOString(),
  roomNo: "",
  note: "",
  amount: "",
};

const BazarCreateUpdate = ({ setCreateBorder }) => {
  const [createBorder] = useCreateBorderMutation();
  const handleClose = () => {
    modalOpenClose("bazar_modal", false);
  };

  const { borderObject } = useGetBorderQuery("", {
    selectFromResult: ({ data }) => ({
      borderObject: convertToOptions(data?.data),
    }),
  });
  console.log({ borderObject });
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
    <dialog id="bazar_modal" className="modal modal-end">
      <div className="modal-box w-11/12 max-w-3xl mt-4">
        <div className="flex justify-between">
          <h3 className="font-bold text-lg text-primary">
            Create / Update Bazar
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
                name="date"
                label="Select Date"
                type="date"
                error={errors.date?.message}
              />
              <CustomInput
                control={control}
                name="border"
                label="Select Border"
                type="select"
                error={errors.border?.message}
                options={borderObject}
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
                name="amount"
                label="Amount"
                type="number"
                error={errors.amount?.message}
              />
            </div>
            <div className="flex gap-4 mt-4">
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

export default BazarCreateUpdate;
