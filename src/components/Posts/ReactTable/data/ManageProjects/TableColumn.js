import { Filter, SelectColumnFilter, DefaultColumnFilter } from "../../Filter"

const columns = [
  {
    Header: () => null, //! no header rendered explains why it is empty.
    id: "expander", // 'id' is required
    Cell: ({ row }) => <span {...row.getToggleRowExpandedProps()}>{row.isExpanded ? "👇" : "👉"}</span>
  },
  {
    Header: "Projects",
    accessor: "title"
    // Filter: SelectColumnFilter,
    // filter: "equals" //! selection must equal whole value. not partial match
    // getResizerProps: () => {}
  },
  {
    Header: "Category",
    accessor: "category"

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
    Header: "Description",
    accessor: "description"
    // Filter: SelectColumnFilter

    // getResizerProps: () => {}
    // Cell: (cellProps) => {
    //   return <YourReactComponent {...cellProps}/>
    // }
    // disableSortBy: true
    // disableFilters: true
  },
  {
    Header: "Project Manager",
    accessor: "projectManager"
    // getResizerProps: () => {}
    // Filter: filter
    //! /* Dropdown list that will have a submit button attached that will change a users role only if users is admin*/
  }
]

export default columns
