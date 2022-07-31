import { Container, Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap"

const renderCard = row => {
  const {
    email
    // location: { city, street, postcode },
    // picture,
    // cell
  } = row.original
  return (
    <Card style={{ width: "18rem", margin: "0 auto" }}>
      {/* <CardImg top src={picture.large} alt="Card image cap" /> */}
      <CardBody>
        <CardTitle>
          <strong>{email} </strong>
        </CardTitle>
        <CardText>
          {/* <strong>Phone</strong>: {cell} <br />
          <strong>Address:</strong> {`${street.name} ${street.number} - ${postcode} - ${city}`} */}
        </CardText>
      </CardBody>
    </Card>
  )
}

export default renderCard
