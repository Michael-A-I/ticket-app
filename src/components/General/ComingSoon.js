import React from "react"
import Navbar from "../Navbar/Navbar"
import Page from "../ui/Page"
import "./css/Home.css"
import Feed from "../ui/Feed"
import { Button, Card, Jumbotron, Row } from "react-bootstrap"
import "./css/ComingSoon.css"
import { Link, useNavigate } from "react-router-dom"

function ComingSoon() {
  const history = useNavigate()

  function goBack(back) {
    history(back)
  }

  return (
    <>
      <div className="home-background"></div>

      <Page title="ComingSoon">
        <div id="override-bootstrap" className="home-container">
          <div className="jumbotron">
            <Row>
              <h1>Coming Soon!</h1>
            </Row>

            <Row>
              <Button onClick={() => goBack(-1)} className="jumbotron-button">
                Home
              </Button>
            </Row>
          </div>
        </div>
      </Page>
    </>
  )
}

export default ComingSoon
