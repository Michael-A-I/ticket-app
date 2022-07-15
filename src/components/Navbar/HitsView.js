import React from "react"
import { Button, Card, CardGroup } from "react-bootstrap"
import { Hits } from "react-instantsearch-hooks-web"
import "./css/HitsView.css"

function HitsView() {
  /* component for hits */
  function Hit({ hit }) {
    return (
      <article className="hit-box">
        <Card>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Card.Title>{hit.title}</Card.Title>
            <Card.Text>{hit.description}</Card.Text>
            <Card.Text>{hit.user}</Card.Text>
          </Card.Body>
        </Card>
      </article>
    )
  }

  return (
    <>
      <Hits hitComponent={Hit} />
    </>
  )
}

export default HitsView
