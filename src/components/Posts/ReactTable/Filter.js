import React, { useCallback, useState } from "react"
import { Input } from "reactstrap"
/* render filter from table columns array */
export const Filter = ({ column }) => {
  // console.log(column)
  // checks if fileter is on and what filter to render from table columns.. if nothing default filter.
  return <div style={{ marginTop: 5 }}>{column.canFilter && column.render("Filter")}</div>
}
// default filter
export const DefaultColumnFilter = ({
  column: {
    filterValue,
    setFilter,
    preFilteredRows: { length }
  }
}) => {
  return (
    <Input
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
      placeholder={`search (${length}) ...`}
    />
  )
}

export const SelectColumnFilter = ({ column: { filterValue, setFilter, preFilteredRows, id } }) => {
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  return (
    <Input
      id="custom-select"
      type="select"
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Input>
  )
}
