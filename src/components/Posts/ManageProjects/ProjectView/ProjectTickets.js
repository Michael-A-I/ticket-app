import React, { useContext, useEffect, useState } from "react"
import ReactTable from "../../ReactTable/ReactTable"
import columns from "../../ReactTable/data/ProjectViewTickets/TableColumn"
import StateContext from "../../../../context/StateContext"
import { useParams } from "react-router"
import renderRowSubComponent from "../../ReactTable/subComponenet/TicketRow"

function ProjectTickets() {
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
      <h1 style={{ fontSize: "16px", boxShadow: "1.5px 1.5px rgb(64, 78, 237)" }}>Project Tickets</h1>
      <div style={{ width: "100%", fontSize: "10px", border: "1px solid black", padding: "5px", borderRadius: "5px", boxShadow: "2.5px 3.5px rgb(64, 78, 237)" }}>
        <ReactTable columns={columns} data={data} renderRowSubComponent={renderRowSubComponent} />
      </div>
    </>
  )
}

export default ProjectTickets
