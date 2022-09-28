import React, { Fragment, useMemo, useState } from "react"
import { dummy } from "./data/Data"
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useExpanded, useBlockLayout, useResizeColumns, useFlexLayout, useRowSelect } from "react-table"
import tableColumn from "./data/TableColumn"
import Page from "../../ui/Page"
import "./css/Table.css"
import Table from "react-bootstrap/Table"
import { Filter, SelectColumnFilter, DefaultColumnFilter } from "./Filter"
import ColumnSelector from "./ColumnSelector"
import Resizer from "./Resizer"
import styles from "./css/ColumnSelector.module.css"
import Pagination from "./Pagination"
import { Form, Col, Row, Input, Button } from "reactstrap"
import Dropdown from "react-bootstrap/Dropdown"
import Toasty from "../../ui/Toasty"

import EditRow from "./EditRow"
// import { Button } from "bootstrap"
const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef()
  const resolvedRef = ref || defaultRef

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  )
})
// !renderRowSubComponent is interchangable
function ReactTable({ columns, data, renderRowSubComponent: SubComponenet, users }) {
  const [msg, setMsg] = useState({
    show: false,
    poisiton: "center",
    msg: "",
    context: "",
    title: ""
  })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    page,
    prepareRow,
    visibleColumns, // below new props related to 'usePagination' hook
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,

    state: { selectedRowIds },
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: 10 }
    },
    /* filtering */
    useFilters,
    /* sorting */
    useSortBy,
    // defaultColumn
    useExpanded,
    usePagination,
    useRowSelect,
    useBlockLayout
  )

  /* sorting */
  const generateSortingIndicator = column => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
  }

  const onChangeInSelect = event => {
    setPageSize(Number(event.target.value))
  }

  const onChangeInInput = event => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0
    gotoPage(page)
  }

  const [state, setState] = useState()
  const handleChange = e => {
    setState(e.target.value)
  }
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Toasty msg={msg} setMsg={setMsg} />
      </div>
      <div style={{ margin: "auto" }}>
        <Table className="tableWrap" {...getTableProps()}>
          {/* Headers */}
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    <div {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {generateSortingIndicator(column)}
                    </div>
                    <Filter column={column} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {/* Body */}
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)

              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps({ className: "yo display-row" })}>{cell.render("Cell")}</td>
                    })}
                  </tr>
                  {row.isExpanded && (
                    <tr>
                      {/* <h1>User Profile</h1> */}
                      <td colSpan={visibleColumns.length}>{<SubComponenet row={row} users={users} setMsg={setMsg} />}</td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
          </tbody>{" "}
        </Table>

        <Row style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <Col md={3}>
            <Button color="primary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </Button>
            <Button color="primary" onClick={previousPage} disabled={!canPreviousPage}>
              {"<"}
            </Button>
          </Col>
          <Col md={2} style={{ marginTop: 7 }}>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </Col>
          <Col md={2}>
            <Input type="number" min={1} style={{ width: 70 }} max={pageOptions.length} defaultValue={pageIndex + 1} onChange={onChangeInInput} />
          </Col>
          <Col md={2}>
            <Input type="select" value={pageSize} onChange={onChangeInSelect}>
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Input>
          </Col>
          <Col md={3}>
            <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
              {">"}
            </Button>
            <Button color="primary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {">>"}
            </Button>
          </Col>
        </Row>
        {/* <Pagination setPageSize={setPageSize} gotoPage={gotoPage} pageIndex={pageIndex} nextPage={nextPage} canNextPage={canNextPage} pageOptions={pageOptions} /> */}
      </div>
    </>
  )
}

export default ReactTable
