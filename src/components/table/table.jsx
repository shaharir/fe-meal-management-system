import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

const Table = ({
  data,
  columns,
  pageIndex,
  setPageIndex,
  pageSize,
  setPageSize,
  pagination,
}) => {
  const table = useReactTable({
    data,
    columns,
    pageCount: pagination?.totalPage || 1,
    state: { pagination: { pageIndex: pageIndex - 1, pageSize } },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: (updater) => {
      const newPageIndex =
        typeof updater === "function"
          ? updater({ pageIndex: pageIndex - 1 }).pageIndex
          : updater.pageIndex;
      setPageIndex(newPageIndex + 1);
    },
  });

  return (
    <div>
      <div className="p-4 bg-base-100 rounded-2xl shadow-md">
        <div className="overflow-x-auto border rounded-lg">
          <table className="table w-full table-border">
            <thead className="bg-base-200 sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-sm font-semibold p-3 text-left border-b"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`${
                      idx % 2 === 0 ? "bg-base-100" : "bg-base-200/40"
                    } hover:bg-primary/10 transition-colors`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-3 border-b text-sm">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center p-4 text-gray-500"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">
          Page <strong>{pageIndex}</strong> of{" "}
          <strong>{pagination?.totalPage}</strong>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setPageIndex(1)}
            disabled={pageIndex === 1}
            className="btn btn-xs btn-outline"
          >
            {"<<"}
          </button>
          <button
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={pageIndex === 1}
            className="btn btn-xs btn-outline"
          >
            Previous
          </button>
          <button
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={pageIndex === pagination?.totalPage}
            className="btn btn-xs btn-outline"
          >
            Next
          </button>
          <button
            onClick={() => setPageIndex(pagination?.totalPage)}
            disabled={pageIndex === pagination?.totalPage}
            className="btn btn-xs btn-outline"
          >
            {">>"}
          </button>

          {/* Page Size Selector */}
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="ml-2 border rounded px-2 py-1 text-sm"
          >
            {[2, 5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Table;
