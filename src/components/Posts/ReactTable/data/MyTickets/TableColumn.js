import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Filter, SelectColumnFilter, DefaultColumnFilter } from "../../Filter"

const columns = [
  {
    Header: () => null, //! no header rendered explains why it is empty.
    id: "expander", // 'id' is required
    Cell: ({ row }) => <span {...row.getToggleRowExpandedProps()}>{row.isExpanded ? "👇" : "👉"}</span>
  },
  {
    Header: "Ticket Title",
    accessor: "title"
    // Filter: SelectColumnFilter,
    // filter: "equals" //! selection must equal whole value. not partial match
    // getResizerProps: () => {}
  },

  {
    Header: "Ticket Description",
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
    Header: "Assigned",
    accessor: "assigned.username",
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
    Filter: SelectColumnFilter //! /* Dropdown list that will have a submit button attached that will change a users role only if users is admin*/
  },
  {
    Header: "Tickets",
    // accessor: "projectManager",
    // getResizerProps: () => {}
    // Filter: SelectColumnFilter //! /* Dropdown list that will have a submit button attached that will change a users role only if users is admin*/
    Cell: ({ row }) => <span>{row.isExpanded ? null : <Link to={`/projects/ticket/${row.original._id}`}>view ticket</Link>}</span>
  },
  {
    Header: "Go to project",
    // accessor: "projectManager",
    // getResizerProps: () => {}
    // Filter: SelectColumnFilter //! /* Dropdown list that will have a submit button attached that will change a users role only if users is admin*/

    Cell: ({ row }) => {
      return <span>{row.isExpanded ? null : <Link to={`/projects/${row.original.project}`}>Go to project</Link>}</span>
    }
  }
]

export default columns
