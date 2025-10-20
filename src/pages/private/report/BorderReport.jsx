import React, { useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaCalendarAlt } from "react-icons/fa";
import { useGetBorderReportQuery } from "../../../lib/redux/services/report/report.service";
import Table from "../../../components/table/table";
import { HiDotsHorizontal } from "react-icons/hi";
import { modalOpenClose } from "../../../components/helper/modalOpenCllose";
import PaymentModal from "./action/PaymentModal";
import { DateFormat } from "../../../components/helper/dateFormat";
import CustomInput from "../../../components/custom/CustomInput";
import { useForm } from "react-hook-form";
import ReturnAmountModal from "./action/RrturnAmountModal";
const statusOptions = [
  { label: "Active", value: "ACTIVE" },
  { label: "In-Active", value: "INACTIVE" },
  { label: "Partial", value: "Partial" },
];
const BorderReport = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [borderData, setBorderData] = useState("");
  const pagination = `?size=${pageSize}&page=${pageIndex}`;
  const value = `${pagination}${
    search ? `&search=${encodeURIComponent(search)}` : ""
  }`;

  const {
    data: borderReport,
    isError,
    isLoading,
  } = useGetBorderReportQuery(value);
  const handelPayment = (row) => {
    modalOpenClose("payment_modal", true);
    setBorderData(row.original);
  };
  const handelReturnAmount = (row) => {
    modalOpenClose("return_amount_modal", true);
    setBorderData(row.original);
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const data = useMemo(() => borderReport?.data || [], [borderReport?.data]);

  const columns = useMemo(
    () => [
      {
        header: "Action",
        cell: ({ row }) => {
          const amount = row?.original?.amount;
          const totalCost = row?.original?.totalCost;
          const totalAmountPaid = amount - totalCost;

          return (
            <div className="dropdown dropdown-start">
              <div tabIndex={0} role="button" className="cursor-pointer m-1">
                <HiDotsHorizontal />
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                {totalAmountPaid < 0 && (
                  <li>
                    <button onClick={() => handelPayment(row)}>Payment</button>
                  </li>
                )}
                {totalAmountPaid > 0 && (
                  <li>
                    <button onClick={() => handelReturnAmount(row)}>
                      Return Amount
                    </button>
                  </li>
                )}
              </ul>
            </div>
          );
        },
      },
      {
        header: "SI",
        cell: (info) => info.row.index + 1,
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => {
          return (
            <span>
              {DateFormat({ date: row?.original?.createdAt, showTime: true })}
            </span>
          );
        },
      },
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
      // { accessorKey: "status", header: "Status" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status?.toUpperCase();

          const getStatusColor = (status) => {
            switch (status) {
              case "PAID":
                return "bg-green-100 text-green-700";
              case "PARTIAL":
                return "bg-yellow-100 text-yellow-700";
              case "UNPAID":
                return "bg-red-100 text-red-700";
              default:
                return "bg-gray-100 text-gray-700";
            }
          };

          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                status
              )}`}
            >
              {status || "N/A"}
            </span>
          );
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
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearch(searchInput);
                }
              }}
              className="outline-none w-full"
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
      <PaymentModal {...{ borderData: borderData }} />
      <ReturnAmountModal {...{ borderData: borderData }} />
    </div>
  );
};

export default BorderReport;
