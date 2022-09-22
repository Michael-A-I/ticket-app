import { useState } from "react"
import { Link } from "react-router-dom"
import { Button, Container, Card } from "react-bootstrap"

const ProjectCard = props => {
  const [edit, setEdit] = useState()

  const { _id, files, category, projectManager, title, description } = props.row.original

  const editMode = () => {
    setEdit(!edit)
  }

  const descriptionLimited = description

  console.log(descriptionLimited)

  return (
    <Card style={{ margin: "0 auto" }}>
      {files == [] ? <Card.Img top src={files[0]} alt="Card image cap" /> : null}
      <Card.Body>
        <Card.Title style={{ width: "fit-content", margin: "auto" }}>
          <strong>{title} </strong>
        </Card.Title>
        {/* set html in view */}

        <Card.Text style={{ border: "1px solid black", borderRadius: "5px", height: "150px", width: "50%", overflow: "auto", margin: "auto", textAlign: "left", textOverflow: "ellipsis", padding: "10px" }} dangerouslySetInnerHTML={{ __html: description }}></Card.Text>

        <div style={{ display: "flex", alignItems: "center", paddingTop: "10px", width: "100%", margin: "auto", justifyContent: "center" }}>
          <Link style={{ textDecoration: "none", padding: "10px 50px", background: "black", borderRadius: "5px", color: "white", width: "fit-content", margin: "2.5px" }} to={`/projects/tickets/${props.row.original._id}`}>
            View Tickets
          </Link>
          <Link style={{ textDecoration: "none", padding: "10px 50px", background: "black", borderRadius: "5px", color: "white", width: "fit-content", margin: "2.5px" }} to={`/projects/${props.row.original._id}`}>
            Go to project
          </Link>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProjectCard
