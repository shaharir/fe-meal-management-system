import React, { useState, useMemo } from "react";
import Table from "../../../components/table/table";
import { useGetBorderQuery } from "../../../lib/redux/services/border/border.service";
import BorderCreateUpdate from "./BorderCreateUpdate";
import { modalOpenClose } from "../../../components/helper/modalOpenCllose";
import CustomInput from "../../../components/custom/CustomInput";
import { useForm } from "react-hook-form";

const Border = () => {
  const [createBorder, setCreateBorder] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [showFilter, setShowFilter] = useState(false);
  const toggleFilter = () => setShowFilter((prev) => !prev);
  const pagination = `?size=${pageSize}&page=${pageIndex}`;
  const {
    data: borderData,
    isLoading,
    isError,
  } = useGetBorderQuery(pagination);
  const handleCreate = () => {
    setCreateBorder(true);
    modalOpenClose("border_modal", true);
  };
  const { control, handleSubmit, watch } = useForm();
  const data = useMemo(() => borderData?.data || [], [borderData?.data]);

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "mobile", header: "Mobile" },
      { accessorKey: "roomNo", header: "Room No" },
      { accessorKey: "amount", header: "Amount" },
      { accessorKey: "mealCount", header: "Meal Count" },
    ],
    []
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-error p-6 bg-base-200 rounded-xl shadow-sm">
        Failed to load border data.
      </div>
    );

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Border List</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all borders and their meal details.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            className="btn btn-secondary btn-sm shadow-md"
            onClick={toggleFilter}
          >
            Filter
          </button>

          <button
            className="btn btn-primary btn-sm shadow-md"
            onClick={handleCreate}
          >
            + Add New Border
          </button>
        </div>
      </div>

      {/* Filter Options */}
      {showFilter && (
        <form>
          <div className="bg-base-100 p-4 rounded-2xl border border-base-200 space-y-2">
            <h3 className="font-semibold">Filter Options</h3>
            <div className="flex gap-4">
              <CustomInput control={control} name="username" type="text" />

              <button className="btn btn-sm btn-primary">Apply</button>
            </div>
            <div className="flex justify-end"></div>
          </div>
        </form>
      )}

      {/* Table */}
      <div className="bg-base-100 p-4 rounded-2xl border border-base-200">
        <Table
          data={data}
          columns={columns}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          pageSize={pageSize}
          setPageSize={setPageSize}
          pagination={borderData?.pagination}
        />
      </div>

      {/* Modal */}
      <BorderCreateUpdate
        setCreateBorder={setCreateBorder}
        createBorder={createBorder}
      />
    </div>
  );
};

export default Border;
