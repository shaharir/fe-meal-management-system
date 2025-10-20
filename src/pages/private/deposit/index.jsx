import { useMemo, useState } from "react";
import { modalOpenClose } from "../../../components/helper/modalOpenCllose";
import { useGetBorderQuery } from "../../../lib/redux/services/border/border.service";
import { convertToObject } from "../../../components/helper/convertToObject";
import Table from "../../../components/table/table";
import { useGetDepositQuery } from "../../../lib/redux/services/deposit/deposit.service";
import DepositCreateUpdate from "./DepositCreateUpdate";
import { DateFormat } from "../../../components/helper/dateFormat";

const Deposit = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const pagination = `?size=${pageSize}&page=${pageIndex}`;
  const handleCreate = () => {
    modalOpenClose("deposit_modal", true);
  };
  const { borderObject } = useGetBorderQuery("", {
    selectFromResult: ({ data }) => ({
      borderObject: convertToObject(data?.data),
    }),
  });
  const {
    data: depositData,
    isLoading,
    isError,
  } = useGetDepositQuery(pagination);
  const data = useMemo(() => depositData || [], [depositData]);

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
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => {
          return DateFormat({ date: row?.original?.date, showTime: true });
        },
      },
      { accessorKey: "amount", header: "Amount" },
      {
        accessorKey: "note",
        header: "Note",
        cell: ({ row }) => {
          return row.original.note ? (
            <span>{row.original.note}</span>
          ) : (
            <span>N/A</span>
          );
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
        Failed to load deposit data.
      </div>
    );
  return (
    <>
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Deposit List</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage all deposit and their deposit details.
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
              + Add New Deposit
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
        <DepositCreateUpdate />
      </div>
    </>
  );
};

export default Deposit;
