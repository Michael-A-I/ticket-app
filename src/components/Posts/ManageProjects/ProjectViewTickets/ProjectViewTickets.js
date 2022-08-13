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
      <Page>
        <h1>Project Tickets</h1>
        <Link to={`/projects/tickets/${id}/createtickets`}> Create Ticket</Link>
        {/* TABLE TICKETS */}
        <ReactTable columns={columns} data={data} renderRowSubComponent={renderRowSubComponent} />
      </Page>
    </>
  )
}

export default ProjectViewTickets
