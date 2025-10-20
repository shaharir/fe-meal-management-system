import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { modalOpenClose } from "../../../components/helper/modalOpenCllose";
import { useGetBorderQuery } from "../../../lib/redux/services/border/border.service";
import { convertToOptions } from "../../../components/helper/convertToObject";
import CustomInput from "../../../components/custom/CustomInput";
import { useCreateDepositMutation } from "../../../lib/redux/services/deposit/deposit.service";

// Yup schema
const schema = yup.object().shape({
  border: yup.string().required("Border is required"),
  date: yup.string().required("Date is required"),
  amount: yup.number().required("Amount is required"),
  note: yup.string(),
});

const defaultValues = {
  border: "",
  date: new Date().toISOString(),
  amount: 0,
  note: "",
};

const DepositCreateUpdate = () => {
  const [createDeposit] = useCreateDepositMutation();
  const handleClose = () => {
    modalOpenClose("deposit_modal", false);
  };

  const { borderObject } = useGetBorderQuery("", {
    selectFromResult: ({ data }) => ({
      borderObject: convertToOptions(data?.data),
    }),
  });
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
    const res = await createDeposit(data);
    // if (res.data.code == 200) {
    handleClose();
    reset();
    // }
  };

  return (
    <dialog id="deposit_modal" className="modal modal-end">
      <div className="modal-box w-11/12 max-w-3xl mt-4">
        <div className="flex justify-between">
          <h3 className="font-bold text-lg text-primary">
            Create / Update Deposit
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
                name="amount"
                label="Amount"
                type="number"
                error={errors.amount?.message}
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

export default DepositCreateUpdate;
