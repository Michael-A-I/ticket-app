import React, { PureComponent, useContext, useEffect } from "react"
import { Col, Row } from "react-bootstrap"
import Page from "../../ui/Page"
import BugsFeatures from "./charts/BugsFeatures"
import MyTickets from "./charts/myTickets"
import { PiePie } from "./charts/Pie"
import PieUserTickets from "./charts/PieUserTickets"
import ProjectsCompleted from "./charts/ProjectsCompleted"
import TicketsCompleted from "./charts/TicketsCompleted"
import TicketStatus from "./charts/TicketStatus"
import TicketType from "./charts/TicketType"
import msgConext from "../../ui/helpers/toastyMessages.js"

import "./css/charts.css"
import DispatchContext from "../../../context/DispatchContext"
import StateContext from "../../../context/StateContext"

function Dashboard() {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  if (appState.loggedIn && appState.initialLogin) {
    appDispatch({ type: "message", show: true, msg: msgConext.welcome, title: msgConext.good, context: msgConext.info })
    localStorage.setItem("initialLogin", false)
    appDispatch({ type: "initialLogin", value: false })
  }

  const graphContainer = { borderRadius: "15px", boxShadow: "2.5px 5px #404eed", height: "55vh", width: "35vw", minHeight: "55vh", minWidth: "150px", maxWidth: "600px", margin: "auto", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid black", background: "gainsboro" }
  return (
    <>
      <Page>
        <div style={{ width: "100%", display: "flex", margin: "25px 100px 50px 0px", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ paddingLeft: "60px" }}>Dashboard</h1>
        </div>

        <div>
          <Row>
            <Col>
              <div style={graphContainer}>
                <ProjectsCompleted />
              </div>
            </Col>
            <Col>
              <div style={graphContainer}>
                <MyTickets />
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div style={graphContainer}>
                <TicketStatus />
              </div>
            </Col>
            <Col>
              <div style={graphContainer}>
                <BugsFeatures />
              </div>
            </Col>
          </Row>
        </div>
      </Page>
    </>
  )
}

export default Dashboard
