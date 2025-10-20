import { useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaCalendarAlt } from "react-icons/fa";
import Table from "../../../components/table/table";
import { useGetPaymentQuery } from "../../../lib/redux/services/payment/payment.service";
import { useGetBorderQuery } from "../../../lib/redux/services/border/border.service";
import { convertToObject } from "../../../components/helper/convertToObject";

const PaymentReport = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const pagination = `?size=${pageSize}&page=${pageIndex}`;
  const value = `${pagination}${
    search ? `&search=${encodeURIComponent(search)}` : ""
  }`;
  const { borderObject } = useGetBorderQuery("", {
    selectFromResult: ({ data }) => ({
      borderObject: convertToObject(data?.data),
    }),
  });
  const { data: paymentReport, isError, isLoading } = useGetPaymentQuery();

  const data = useMemo(() => paymentReport || [], [paymentReport]);

  const columns = useMemo(
    () => [
      {
        header: "SI",
        cell: (info) => info.row.index + 1,
      },
      { accessorKey: "createdAt", header: "Date" },
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
            </>
          );
        },
      },

      { accessorKey: "amount", header: "Amount" },

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
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-xl font-semibold">Payment Report</h1>

        {/* <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
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
        </div> */}
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

export default PaymentReport;
