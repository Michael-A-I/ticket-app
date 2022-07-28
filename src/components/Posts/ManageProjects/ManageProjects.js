import { Button } from "bootstrap"
import React from "react"
import { Link } from "react-router-dom"
import Page from "../../ui/Page"
// import tableColumn from "../Table/data/TableColumn"
import { data } from "../ReactTable/data/Data"
import columns from "../ReactTable/data/TableColumn"
import ReactTable from "../ReactTable/ReactTable"
import renderRowSubComponent from "../ReactTable/RenderRowSubcomponent"
function ManageProjects() {
  const obj = { columns: columns, data: data }

  return (
    <>
      <Page title="Manage Projects">
        <h1>Manage Projects</h1>
        <Link to="/projects/new">Create Project</Link>
        {console.log(data)}
        {console.log({ ...obj })}

        <ReactTable columns={columns} data={data} renderRowSubComponent={renderRowSubComponent} />
      </Page>
    </>
  )
}

export default ManageProjects
