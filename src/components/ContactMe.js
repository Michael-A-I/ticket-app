import React, { Link } from "react"
import Navbar from "./Navbar"
import Page from "./Page"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
function ContactMe() {
  return (
    <Page>
      <Navbar />
      <Card>
        <Card.Body>
          <Card.Title>Contact Me</Card.Title>
          <Card.Text>Mike.Aduayi@gmail.com</Card.Text>
          <Card.Text>
            <a href=" https://www.linkedin.com/in/michael-aduayi/">Linkedin</a>
          </Card.Text>
        </Card.Body>
      </Card>
    </Page>
  )
}

export default ContactMe
