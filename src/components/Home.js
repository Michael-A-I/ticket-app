import React, { useContext } from "react"
import { Button, Card, Jumbotron, Row } from "react-bootstrap"

/* Components */
import Navbar from "./Navbar"
import Page from "./Page"
import "./css/Home.css"
import Feed from "./ui/Feed"
import { Link } from "react-router-dom"

/* Styles */
import "./css/Home.css"

/* Context */
import StateContext from "../context/StateContext"

function Home() {
  const appState = useContext(StateContext)

  return (
    <>
      <div className="home-background"></div>
      <Navbar />
      <Page title="Home">
        <div id="override-bootstrap" className="home-container">
          <div className="jumbotron">
            <Row>
              <h1>IMAGINE A PLACE...</h1>
            </Row>
            <Row>
              <p>Where you can collaborate with you fellow engineers regarding a product and get answers fast!</p>
            </Row>
            <Row>
              {appState.loggedIn ? (
                <Link className="jumbotron-button" to="/general">
                  Go to Dashboard
                </Link>
              ) : (
                <Link className="jumbotron-button" to="/login">
                  Login
                </Link>
              )}
              <Link className="jumbotron-button" to="/comingsoon">
                Download for `OS`
              </Link>
            </Row>
          </div>
        </div>
      </Page>
    </>
  )
}

export default Home
