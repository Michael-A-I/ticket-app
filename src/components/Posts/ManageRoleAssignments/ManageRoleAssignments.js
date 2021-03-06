import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Page from "../../ui/Page"
import ReactTable from "../ReactTable/ReactTable"
// import { data } from "../ReactTable/data/Data"
import columns from "../ReactTable/data/TableColumn"
import StateContext from "../../../context/StateContext"
import RenderEditRow from "../ReactTable/subComponenet/RenderEditRow"

function ManageRoleAssignments() {
  const appState = useContext(StateContext)
  const token = appState.user.token
  /* table data state */
  const [data, setData] = useState([])

  /* set state of table data on render */
  useEffect(() => {
    console.log("useEffect")
    users()
  }, [])

  /* get request for table data */
  const users = async () => {
    console.log("users")
    try {
      // get comments
      const res = await fetch(`/api/usersIndex`, {
        headers: {
          method: "GET",
          "x-access-token": token
        }
      })

      const users = await res.json()
      console.log(users)
      setData(users)
    } catch (error) {
      return error
    }
  }

  return (
    <>
      <Page>
        <h1>Manage Role Assignments</h1>
        {/* create user w/o password or generic password  */}
        {/* <Link to="#">Create User</Link> */}
        <ReactTable columns={columns} data={data} renderRowSubComponent={RenderEditRow} users={users} />
      </Page>
    </>
  )
}

export default ManageRoleAssignments
