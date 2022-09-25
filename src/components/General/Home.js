import React, { useContext } from "react"
import { Button, Card, Jumbotron, Row } from "react-bootstrap"

/* Components */

import Page from "../ui/Page"
import "./css/Home.css"
import { Link } from "react-router-dom"

/* Styles */
import "./css/Home.css"

/* Context */
import StateContext from "../../context/StateContext"

function Home() {
  const appState = useContext(StateContext)

  return (
    <>
      <div className="home-background"></div>
      <Page title="Home">
        <div id="override-bootstrap" className="home-container">
          <div className="jumbotron">
            <Row>
              <h1>Welcom to Chatter APP</h1>
            </Row>
            <Row>
              <p>A place for you to track you applications features and bugs</p>
            </Row>
            <Row>
              {appState.loggedIn ? (
                <Link className="jumbotron-button" to="/dashboard">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link style={{ margin: "10px auto" }} className="jumbotron-button" to="/login">
                    Login
                  </Link>

                  <Link style={{ margin: "10px auto" }} className="jumbotron-button" to="/register">
                    Register
                  </Link>
                </>
              )}
            </Row>
          </div>
        </div>
      </Page>
    </>
  )
}

export default Home
