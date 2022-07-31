import { Button } from "bootstrap"
import React from "react"

function EditRow(props) {
  return (
    <form>
      <input type="text" name={props.cell.value} value={props.state} onChange={e => props.handleChange(e)} />
      <Button>Submit</Button>
    </form>
  )
}

export default EditRow
