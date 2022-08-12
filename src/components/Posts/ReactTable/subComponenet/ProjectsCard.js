import { useState } from "react"
import { Link } from "react-router-dom"
import { Button, Container, Card } from "react-bootstrap"

const ProjectCard = props => {
  const [edit, setEdit] = useState()

  const { _id, files, category, projectManager, title, description } = props.row.original

  const editMode = () => {
    setEdit(!edit)
  }

  return (
    <Card style={{ width: "18rem", margin: "0 auto" }}>
      {files == [] ? <Card.Img top src={files[0]} alt="Card image cap" /> : null}
      <Card.Body>
        <Card.Title>
          <strong>{title} </strong>
        </Card.Title>
        {/* set html in view */}
        <Card.Text dangerouslySetInnerHTML={{ __html: description }}></Card.Text>
        <Link to="#">Go to project</Link>
      </Card.Body>
    </Card>
  )
}

export default ProjectCard
