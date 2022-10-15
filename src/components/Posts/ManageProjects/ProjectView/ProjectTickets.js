import React, { useContext, useEffect, useState } from "react"
import { Button, Form, Row } from "react-bootstrap"

import ReactTable from "../../ReactTable/ReactTable"
import columns from "../../ReactTable/data/ProjectViewTickets/TableColumn"
import StateContext from "../../../../context/StateContext"
import { useParams } from "react-router"
import renderRowSubComponent from "../../ReactTable/subComponenet/TicketRow"

function ProjectTickets(props) {
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
      <div style={{ boxShadow: "2px 1px #404eed", display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
        <h1 style={{ fontSize: "16px" }}>Project Tickets</h1>
        {props.closeProject ? (
          <Button style={{ padding: "0px 10px", margin: "0px 10px 10px", width: "150px", height: "30px", fontSize: "12px" }} onClick={props.closeProjects}>
            Close
          </Button>
        ) : (
          <Button style={{ padding: "0px 10px", margin: "0px 10px 10px", width: "150px", height: "30px", fontSize: "12px" }} onClick={props.closeProjects}>
            Open
          </Button>
        )}
      </div>
      <div style={{ visibility: props.closeProject ? "" : "hidden" }}>
        <div style={{ width: "100%", fontSize: "10px", border: "1px solid black", padding: "5px", margin: "0px 0px 100px 0px", borderRadius: "5px", boxShadow: "2.5px 3.5px rgb(64, 78, 237)" }}>
          <ReactTable columns={columns} data={data} renderRowSubComponent={renderRowSubComponent} />
        </div>
      </div>
    </>
  )
}

export default ProjectTickets
