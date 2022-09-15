import { Filter, SelectColumnFilter, DefaultColumnFilter } from "../Filter"
import React, { Fragment } from "react"

const columns = [
  {
    Header: () => null, //! no header rendered explains why it is empty.
    id: "expander", // 'id' is required
    Cell: ({ row }) => <span {...row.getToggleRowExpandedProps()}>{row.isExpanded ? "👇" : "👉"}</span>
  },
  {
    Header: "User Name",
    accessor: "username",
    width: 250
    // Filter: SelectColumnFilter,
    // filter: "equals" //! selection must equal whole value. not partial match
    // getResizerProps: () => {}
  },
  {
    Header: "Name",
    width: 250,
    accessor: values => {
      // console.log(values)
      const firstName = values.firstName
      const lastName = values.lastName

      if (firstName === undefined || lastName === undefined) {
        return "No name in data base"
      }
      return firstName + " " + lastName
    }
    // console.log(row)

    // Filter: SelectColumnFilter

    // getResizerProps: () => {}
    // Cell: (cellProps) => {
    //   return <YourReactComponent {...cellProps}/>
    // }
    // disableSortBy: true
    // disableFilters: true
  },
  {
    Header: "Email",
    accessor: "email",
    width: 250
    // Filter: SelectColumnFilter

    // getResizerProps: () => {}
    // Cell: (cellProps) => {
    //   return <YourReactComponent {...cellProps}/>
    // }
    // disableSortBy: true
    // disableFilters: true
  },
  {
    Header: "Role",
    accessor: "role",
    width: 250,
    // getResizerProps: () => {}
    Filter: SelectColumnFilter
    //! /* Dropdown list that will have a submit button attached that will change a users role only if users is admin*/
  }
]

export default columns
