import React, { useMemo, useState } from "react";
import { convertToObject } from "../../../components/helper/convertToObject";
import { useGetBorderQuery } from "../../../lib/redux/services/border/border.service";
import { modalOpenClose } from "../../../components/helper/modalOpenCllose";
import Table from "../../../components/table/table";
import { useGetMealQuery } from "../../../lib/redux/services/meal/meal.service";
import MealCreateUpdate from "./MealCreateUpdate";

const Meal = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const pagination = `?size=${pageSize}&page=${pageIndex}`;
  const handleCreate = () => {
    modalOpenClose("meal_modal", true);
  };
  const { borderObject } = useGetBorderQuery("", {
    selectFromResult: ({ data }) => ({
      borderObject: convertToObject(data?.data),
    }),
  });
  const { data: bazarData, isLoading, isError } = useGetMealQuery(pagination);
  const data = useMemo(() => bazarData || [], [bazarData]);

  const columns = useMemo(
    () => [
      {
        header: "SI",
        cell: (info) => info.row.index + 1,
      },
      {
        accessorKey: "border",
        header: "Border",
        cell: ({ row }) => {
          const borderId = row.original.border;

          return (
            <>
              <span>{borderObject?.[borderId]?.name}</span>
              <br />
              <span>{borderObject?.[borderId]?.mobile}</span>
              <br />
              <span>{borderObject?.[borderId]?.roomNo}</span>
            </>
          );
        },
      },
      { accessorKey: "date", header: "Date" },
      { accessorKey: "mealCount", header: "Meal Count" },
      {
        accessorKey: "note",
        header: "Note",
        cell: ({ value }) => {
          return value ? <span>{value}</span> : <span>N/A</span>;
        },
      },
    ],
    [borderObject]
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
        Failed to load bazar data.
      </div>
    );
  return (
    <>
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Meal List</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage all Meal and their meal details.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              className="btn btn-secondary btn-sm shadow-md"
              // onClick={toggleFilter}
            >
              Filter
            </button>

            <button
              className="btn btn-primary btn-sm shadow-md"
              onClick={handleCreate}
            >
              + Add New Meal
            </button>
          </div>
        </div>
        {/* Table */}
        <div className="bg-base-100 p-4 rounded-2xl border border-base-200">
          <Table
            data={data}
            columns={columns}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pageSize={pageSize}
            setPageSize={setPageSize}
            //   pagination={borderData?.pagination}
          />
        </div>
        {/* Modal */}
        <MealCreateUpdate />
      </div>
    </>
  );
};

export default Meal;
