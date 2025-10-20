import { modalOpenClose } from "../../../../components/helper/modalOpenCllose";
import CustomInput from "../../../../components/custom/CustomInput";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useCreatePaymentMutation } from "../../../../lib/redux/services/payment/payment.service";

// Yup schema
const schema = yup.object().shape({
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required")
    .min(1, "Amount must be greater than 0"),
  note: yup.string(),
});
const defaultValues = {
  amount: 0,
  note: "",
};
const PaymentModal = ({ borderData }) => {
  const [createPayment] = useCreatePaymentMutation();
  const handleClose = () => {
    modalOpenClose("payment_modal", false);
  };
  const totalPaybleAmount = borderData?.totalCost - borderData?.amount;

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
    const postBody = { ...data, border: borderData?._id };
    const res = await createPayment(postBody);
    handleClose();
  };
  useEffect(() => {
    if (borderData) {
      reset({
        amount: totalPaybleAmount,
        note: "",
      });
    }
  }, [borderData, reset]);
  return (
    <>
      <dialog id="payment_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="modal-action">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-base-100 p-6 rounded-2xl w-full max-w-3xl"
            >
              <div className="flex gap-4 mt-4">
                <CustomInput
                  control={control}
                  name="amount"
                  label="Amount"
                  type="number"
                  error={errors.amount?.message}
                  disabled={true}
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
    </>
  );
};

export default PaymentModal;
