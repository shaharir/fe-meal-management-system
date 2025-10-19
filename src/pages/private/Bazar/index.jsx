import React, { useMemo, useState } from "react";
import { useGetBazarQuery } from "../../../lib/redux/services/bazar/bazar.service";
import Table from "../../../components/table/table";
import { useGetBorderQuery } from "../../../lib/redux/services/border/border.service";
import { convertToObject } from "../../../components/helper/convertToObject";
import { modalOpenClose } from "../../../components/helper/modalOpenCllose";
import BazarCreateUpdate from "./BazarCreateUpdate";

const Bazar = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const pagination = `?size=${pageSize}&page=${pageIndex}`;
  const handleCreate = () => {
    modalOpenClose("bazar_modal", true);
  };
  const { borderObject } = useGetBorderQuery("", {
    selectFromResult: ({ data }) => ({
      borderObject: convertToObject(data?.data),
    }),
  });
  const { data: bazarData, isLoading, isError } = useGetBazarQuery(pagination);
  const data = useMemo(() => bazarData || [], [bazarData]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "border",
        header: "Border",
        cell: ({ row }) => {
          const borderId = row.original.border;

          return <span>{borderObject?.[borderId]?.name}</span>;
        },
      },
      { accessorKey: "date", header: "Date" },
      { accessorKey: "roomNo", header: "Room No" },
      { accessorKey: "amount", header: "Amount" },
      { accessorKey: "note", header: "Note" },
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
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Bazar List</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all bazars and their meal details.
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
            + Add New Bazar
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
      <BazarCreateUpdate
      // setCreateBorder={setCreateBorder}
      // createBorder={createBorder}
      />
    </div>
  );
};

export default Bazar;
