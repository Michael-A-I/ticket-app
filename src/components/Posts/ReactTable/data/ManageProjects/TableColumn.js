import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Filter, SelectColumnFilter, DefaultColumnFilter } from "../../Filter"

const columns = [
  {
    Header: () => null, //! no header rendered explains why it is empty.
    id: "expander", // 'id' is required
    Cell: ({ row }) => <span {...row.getToggleRowExpandedProps()}>{row.isExpanded ? <i class="fa-sharp fa-solid fa-square-check"></i> : <i class="fa-thin fa-square"></i>}</span>
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
    accessor: "category",

    // console.log(row)

    Filter: SelectColumnFilter

    // getResizerProps: () => {}
    // Cell: (cellProps) => {
    //   return <YourReactComponent {...cellProps}/>
    // }
    // disableSortBy: true
    // disableFilters: true
  },
  {
    Header: "Description",
    accessor: "description",
    // Filter: SelectColumnFilter

    // getResizerProps: () => {}
    Cell: value => {
      return <p dangerouslySetInnerHTML={{ __html: value.cell.value.substring(0, 50) }}></p>
    }
    // disableSortBy: true
    // disableFilters: true
  },
  {
    Header: "Project Manager",
    accessor: "createdBy.username",
    // getResizerProps: () => {}
    Filter: SelectColumnFilter //! /* Dropdown list that will have a submit button attached that will change a users role only if users is admin*/
  },
  {
    Header: "status",
    accessor: "done",
    Cell: val => {
      const value = val.cell.value
      console.log({ value })
      return value ? <p>Completed</p> : <p>Not Completed</p>
    },
    // getResizerProps: () => {}
    Filter: SelectColumnFilter //! /* Dropdown list that will have a submit button attached that will change a users role only if users is admin*/
  },
  {
    Header: "Go to Tickets",
    // accessor: "projectManager",
    // getResizerProps: () => {}
    // Filter: SelectColumnFilter //! /* Dropdown list that will have a submit button attached that will change a users role only if users is admin*/
    width: 150,
    Cell: ({ row }) => (
      <span>
        {row.isExpanded ? null : (
          <Link style={{ background: "#404eed", padding: "5px 20px", color: "white", textDecoration: "none", width: "200px", borderRadius: "5px", display: "inline", textAlign: "center" }} to={`/projects/tickets/${row.original._id}`}>
            view tickets
          </Link>
        )}
      </span>
    )
  },
  {
    Header: "Go to project",
    // accessor: "projectManager",
    // getResizerProps: () => {}
    // Filter: SelectColumnFilter //! /* Dropdown list that will have a submit button attached that will change a users role only if users is admin*/

    Cell: ({ row }) => (
      <span>
        {row.isExpanded ? null : (
          <Link style={{ background: "#404eed", padding: "5px 20px", color: "white", textDecoration: "none", width: "200px", borderRadius: "5px", display: "inline", textAlign: "center" }} to={`/projects/${row.original._id}`}>
            Go to project
          </Link>
        )}
      </span>
    )
  }
]

export default columns
