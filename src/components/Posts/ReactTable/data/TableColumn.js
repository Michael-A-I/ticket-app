import { Filter, SelectColumnFilter, DefaultColumnFilter } from "../Filter"

const columns = [
  {
    Header: () => null,
    id: "expander", // 'id' is required
    Cell: ({ row }) => <span {...row.getToggleRowExpandedProps()}>{row.isExpanded ? "👇" : "👉"}</span>
  },
  {
    Header: "User Name",
    accessor: "name",
    // Filter: SelectColumnFilter,
    filter: "equals"
    // getResizerProps: () => {}
  },
  {
    Header: "Email",
    accessor: "email"
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
    // getResizerProps: () => {}
    Filter: SelectColumnFilter
  }
]

export default columns
