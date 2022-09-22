import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import StateContext from "../../../../context/StateContext"
import Page from "../../../ui/Page"
import ReactTable from "../../ReactTable/ReactTable"
import columns from "../../ReactTable/data/ProjectViewTickets/TableColumn"

import renderRowSubComponent from "../../ReactTable/subComponenet/TicketRow"
import { Link } from "react-router-dom"

function ProjectViewTickets() {
  let { id } = useParams()
  const appState = useContext(StateContext)
  const token = appState.user.token

  const [data, setData] = useState([])

  useEffect(() => {
    getTickets()
  }, [])

  const getTickets = async () => {
    console.log("projects")
    try {
      // get comments
      const res = await fetch(`/api/projects/tickets/${id}`, {
        headers: {
          method: "GET",
          "x-access-token": token
        }
      })
      const tickets = await res.json()
      console.log(tickets)

      setData(tickets)
    } catch (error) {
      return error
    }
  }

  return (
    <>
      <Page title="project tickets">
        <div style={{ width: "100%", display: "flex", margin: "25px 100px 50px 0px", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Project Tickets</h1>
          <div className="button-container">
            <Link className="button" to={`/projects/tickets/${id}/createtickets`}>
              {" "}
              Create Ticket
            </Link>
          </div>
        </div>
        {/* TABLE TICKETS */}
        <div style={{}}>
          <ReactTable columns={columns} data={data} renderRowSubComponent={renderRowSubComponent} />
        </div>
      </Page>
    </>
  )
}

export default ProjectViewTickets
