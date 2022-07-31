import { Button } from "bootstrap"
import React from "react"
import { Link } from "react-router-dom"
import Page from "../../ui/Page"
// import tableColumn from "../Table/data/TableColumn"
import { data } from "../ReactTable/data/Data"
import columns from "../ReactTable/data/TableColumn"
import ReactTable from "../ReactTable/ReactTable"
import RenderRowSubComponent from "../ReactTable/subComponenet/RenderCard"
function ManageProjects() {
  return (
    <>
      <Page title="Manage Projects">
        <h1>Manage Projects</h1>
        <Link to="/projects/new">Create Project</Link>

        <ReactTable columns={columns} data={data} renderRowSubComponent={<RenderRowSubComponent />} />
      </Page>
    </>
  )
}

export default ManageProjects
