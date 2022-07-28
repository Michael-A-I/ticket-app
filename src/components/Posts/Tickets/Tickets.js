import React, { useMemo } from "react"
import { dummy } from "./data/Data"
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from "react-table"
import tableColumn from "./data/TableColumn"
import Page from "../../ui/Page"

function Table() {
  const columns = useMemo(() => tableColumn, []) //memosized
  const data = useMemo(() => dummy, []) //memosized

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setGlobalFilter, // for global filter
    // rows replaced with page for pagination
    page, //An array of rows for the current page, determined by the pageIndex value.
    nextPage,
    previousPage,
    canPreviousPage, // a boolean value which is true if the pageIndex is not 0
    canNextPage, //a boolean value which is true if the pageIndex is not the last page
    pageOptions,
    gotoPage, // gives us the ability to jump to any page
    state: {
      pageIndex, // Current PageIndex Value
      globalFilter // current global filter value
    }
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0, // Default value 0
        pageSize: 5 //Determines the amount of rows on any given page. Default Value 10
      }
    },
    useGlobalFilter,
    useSortBy,
    usePagination //should be at the very bottom to avoid errors
  )

  return (
    <>
      <Page>
        <table {...getTableProps()} className="table table-striped table-hover text-center fs-5 table-bordered border-dark col-12">
          <thead>
            {headerGroups.map(head => {
              return (
                <>
                  {/* useGlobalFilter */}
                  <span className="my-3">
                    <h3>Search</h3>
                    <input className="col-2" type="text" value={globalFilter || ""} onChange={e => setGlobalFilter(e.target.value)} />
                  </span>

                  <tr {...head.getHeaderGroupProps()}>
                    {head.headers.map(col => {
                      return (
                        <>
                          <th {...col.getHeaderProps(col.getSortByToggleProps())} className="bg-secondary text-white fs-4">
                            {col.render("Header")}
                            <span>
                              {col.isSorted // true if the column is sorted at this moment
                                ? col.isSortedDesc // for deciding the direction of the sorting
                                  ? " 🔽" // descending
                                  : " 🔼" //ascending
                                : ""}
                            </span>
                          </th>
                        </>
                      )
                    })}
                  </tr>
                </>
              )
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(page => {
              prepareRow(page)
              return (
                <>
                  <tr {...page.getRowProps()}>
                    {page.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    })}
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="d-flex justify-content-between my-3">
          <button
            className="px-3 py-1 mx-3 text-center btn-secondary"
            onClick={previousPage}
            disabled={!canPreviousPage} //pages before 1 are disabled
          >
            Previous
          </button>
          <span className="fs-4 text-center">
            Page
            <strong className="mx-3">
              {pageIndex + 1} of {pageOptions.length}
            </strong>
            &nbsp; | &nbsp; Go To Page &nbsp;&nbsp;
            <input
              type="number"
              className="col-1 text-center"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(pageNumber)
              }}
            />
          </span>
          <button
            className="px-3 py-1 mx-3 text-center btn-secondary"
            onClick={nextPage}
            disabled={!canNextPage} //pages after 50 are disabled
          >
            Next
          </button>
        </div>
      </Page>
      ;
    </>
  )
}

export default Table
