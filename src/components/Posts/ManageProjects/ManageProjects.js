import { Button } from "bootstrap"
import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import StateContext from "../../../context/StateContext"
import Page from "../../ui/Page"
// import tableColumn from "../Table/data/TableColumn"

import columns from "../ReactTable/data/ManageProjects/TableColumn"
import ReactTable from "../ReactTable/ReactTable"

import RenderRowSubComponent from "../ReactTable/subComponenet/ProjectsCard"

function ManageProjects() {
  const appState = useContext(StateContext)
  const token = appState.user.token
  /* table data state */
  const [data, setData] = useState([])

  /* set state of table data on render */
  useEffect(() => {
    console.log("useEffect")
    projects()
  }, [])

  /* get request for table data */
  const projects = async () => {
    console.log("projects")
    try {
      // get comments
      const res = await fetch(`/api/projects/`, {
        headers: {
          method: "GET",
          "x-access-token": token
        }
      })
      const projects = await res.json()
      console.log(projects)

      setData(projects)
    } catch (error) {
      return error
    }
  }
  return (
    <>
      <Page title="Manage Projects">
        <h1>Manage Projects</h1>
        <Link to="/projects/new">Create Project</Link>

        <ReactTable columns={columns} data={data} renderRowSubComponent={RenderRowSubComponent} />
      </Page>
    </>
  )
}

export default ManageProjects
