import React, { Fragment, useMemo, useState } from "react"
import { dummy } from "./data/Data"
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useExpanded, useBlockLayout, useResizeColumns, useFlexLayout } from "react-table"
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
import RenderEditRow from "./subComponenet/RenderEditRow"
import EditRow from "./EditRow"
// import { Button } from "bootstrap"

function ReactTable({ columns, data, renderRowSubComponent }) {
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
    usePagination
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
      <Page>
        <Table {...getTableProps()}>
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
            {page.map(row => {
              prepareRow(row)

              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    })}
                  </tr>
                  {row.isExpanded && <tr>{row.cells.map((cell, index) => (index == 0 ? <span></span> : <td {...cell.getCellProps()}>{/* <EditRow cell={cell} state={state} handleChange={handleChange} /> */}</td>))}</tr>}
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
      </Page>
    </>
  )
}

export default ReactTable
