import { Button } from "bootstrap"
import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import StateContext from "../../../context/StateContext"
import Page from "../../ui/Page"
// import tableColumn from "../Table/data/TableColumn"

import columns from "../ReactTable/data/ManageProjects/TableColumn"
import ReactTable from "../ReactTable/ReactTable"

import RenderRowSubComponent from "../ReactTable/subComponenet/ProjectsCard"

// CSS
import "./css/ManageProjects.css"

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
      // const filteredProjects = projects.filter(project => project.archived == false)
      console.log({ projects })
      setData(projects)
    } catch (error) {
      return error
    }
  }

  return (
    <>
      <Page>
        <div style={{ width: "100%", display: "flex", margin: "25px 100px 50px 0px", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ paddingLeft: "60px" }}>
            <h1>Manage Projects</h1>
          </div>

          <div className="button-container">
            <Link className="button" to="/projects/new">
              Create Project
            </Link>
          </div>
        </div>

        <ReactTable columns={columns} data={data} renderRowSubComponent={RenderRowSubComponent} />
      </Page>
    </>
  )
}

export default ManageProjects
