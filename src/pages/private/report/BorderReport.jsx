import React, { useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaCalendarAlt } from "react-icons/fa";
import { useGetBorderReportQuery } from "../../../lib/redux/services/report/report.service";
import Table from "../../../components/table/table";

const BorderReport = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const pagination = `?size=${pageSize}&page=${pageIndex}`;
  const {
    data: borderReport,
    isError,
    isLoading,
  } = useGetBorderReportQuery(pagination);
  const data = useMemo(() => borderReport?.data || [], [borderReport?.data]);

  const columns = useMemo(
    () => [
      {
        header: "SI",
        cell: (info) => info.row.index + 1,
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      { accessorKey: "createdAt", header: "Date" },
      { accessorKey: "mealCount", header: "Meal Count" },
      { accessorKey: "amount", header: "Amount" },
      { accessorKey: "totalCost", header: "Total Cost" },
      {
        accessorKey: "return",
        header: "Return Amount",
        cell: ({ row }) => {
          const { amount, totalCost } = row.original;
          const returnAmount = (amount ?? 0) - (totalCost ?? 0);
          return <span>{returnAmount?.toFixed(2)}</span>;
        },
      },
      {
        accessorKey: "note",
        header: "Note",
        cell: ({ row }) => {
          return row?.original?.note ? (
            <span>{row?.original?.note}</span>
          ) : (
            <span>N/A</span>
          );
        },
      },
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
        Failed to load bazar data.
      </div>
    );

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-xl font-semibold">Border Report</h1>

        <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
          <div className="rounded-lg px-4 py-2 shadow-sm">
            <span className="text-sm">Total Collection</span>
            <p className="text-lg font-semibold">{borderReport?.totalAmount}</p>
          </div>
          <div className="rounded-lg px-4 py-2 shadow-sm">
            <span className="text-sm">Total Meals</span>
            <p className="text-lg font-semibold">{borderReport?.totalMeal}</p>
          </div>
          <div className="rounded-lg px-4 py-2 shadow-sm">
            <span className="text-sm">Amount per Meal</span>
            <p className="text-lg font-semibold">
              {borderReport?.amountPerMeal?.toFixed(2)}
            </p>
          </div>
        </div>
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex items-center gap-2 border rounded-lg px-3 py-1.5 shadow-sm">
            <CiSearch className="" />
            <input
              type="text"
              placeholder="Search..."
              //   value={search}
              //   onChange={(e) => setSearch(e.target.value)}
              className="outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-2 border rounded-lg px-3 py-1.5 shadow-sm">
            <FaCalendarAlt className="" />
            <input
              type="date"
              //   value={dateRange.from}
              //   onChange={(e) =>
              //     setDateRange((prev) => ({ ...prev, from: e.target.value }))
              //   }
              className="outline-none"
            />
            <span>-</span>
            <input
              type="date"
              //   value={dateRange.to}
              //   onChange={(e) =>
              //     setDateRange((prev) => ({ ...prev, to: e.target.value }))
              //   }
              className="outline-none"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-base-100 p-4 rounded-2xl border border-base-200 shadow-sm">
        <Table
          data={data}
          columns={columns}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
};

export default BorderReport;
