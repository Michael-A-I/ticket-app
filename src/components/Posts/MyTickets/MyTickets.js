import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import StateContext from "../../../context/StateContext"
import Page from "../../ui/Page"
import columns from "../ReactTable/data/MyTickets/TableColumn"
import ReactTable from "../ReactTable/ReactTable"
import RenderEditRow from "../ReactTable/subComponenet/RenderEditRow"

function MyTickets() {
  const appState = useContext(StateContext)
  const token = appState.user.token
  /* table data state */
  const [data, setData] = useState([])
  const { id } = useParams()

  /* set state of table data on render */
  useEffect(() => {
    console.log("useEffect")
    myTickets()
  }, [])

  /* get request for table data */
  const myTickets = async () => {
    console.log("myTickets")
    try {
      // get comments
      const res = await fetch(`/api/projects/myticket/${id}`, {
        headers: {
          method: "GET",
          "x-access-token": token
        }
      })

      const myTickets = await res.json()
      console.log({ myTickets })
      setData(myTickets)
    } catch (error) {
      return error
    }
  }

  return (
    <>
      <Page>
        <h1>My Tickets</h1>
        <ReactTable columns={columns} data={data} renderRowSubComponent={RenderEditRow} users={myTickets} />
      </Page>
    </>
  )
}

export default MyTickets
