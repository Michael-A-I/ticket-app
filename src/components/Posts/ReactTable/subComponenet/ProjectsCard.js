import { Container, Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap"

const projectCard = props => {
  const { _id, files, category, projectManager, title, description } = props.row.original
  console.log(props.row.original)
  return (
    <Card style={{ width: "18rem", margin: "0 auto" }}>
      {files == [] ? <CardImg top src={files[0]} alt="Card image cap" /> : null}
      <CardBody>
        <CardTitle>
          <strong>{title} </strong>
        </CardTitle>
        {/* set html in view */}
        <CardText dangerouslySetInnerHTML={{ __html: description }}></CardText>
      </CardBody>
    </Card>
  )
}

export default projectCard
