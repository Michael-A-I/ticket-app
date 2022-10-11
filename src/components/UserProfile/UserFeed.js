import React, { useContext, useEffect, useState } from "react"
import { Card, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import StateContext from "../../context/StateContext"
import { handleDate } from "../../helper/helper"
import "./css/userfeed.css"

function UserFeed() {
  const appState = useContext(StateContext)
  const token = appState.user.token

  const [userFeed, setUserFeed] = useState([])
  const [feed, setFeed] = useState([])

  useEffect(() => {
    setFeeder()
  }, [])

  const setFeeder = async () => {
    let email = localStorage.getItem("email")
    const res = await fetch(`/api/userfeed/${email}`, {
      method: "GET",
      headers: {
        "x-access-token": token,
        "Content-type": "application/json"
      }
    })

    const feed = await res.json()
    console.log({ feed })
    setUserFeed(feed)
  }

  //Implement time

  // organize into array of objects.. this organized into seperate arrays.
  // const feeder = () => {
  //   const groups = userFeed.reduce(
  //     (groups, item) => ({
  //       ...groups,
  //       [item.createdAt]: [...(groups[item.createdAt] || []), item]
  //     }),
  //     {}
  //   )
  //   console.log(groups)
  //   // setFeed(groups)
  // }
  // feeder()
  return (
    <>
      <Row>
        <h1>Recent Activity</h1>
        {/* <pre>{JSON.stringify(userFeed)}</pre> */}
        {console.log(userFeed)}
        {userFeed.map(feed =>
          feed.typeOf == "Post" ? (
            <p>
              <i class="fa-solid fa-comment icon"></i>
              <a href="">{feed.name}</a> Asked <Link to={`/posts/${feed._id}`}>{feed.title}</Link> @{handleDate(feed.createdAt)}
            </p>
          ) : feed.typeOf == "Answer" ? (
            <p>
              <i class="fa-solid fa-comment-medical icon"></i> Answered<Link to={`/posts/${feed.post}`}>{feed.text}</Link>@{handleDate(feed.createdAt)}
            </p>
          ) : feed.typeOf == "ticket" ? (
            <>
              <Card>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p>
                      <i class="fa-solid fa-ticket icon"></i>
                      <a href="">{feed.name}</a> Assigned Ticket <Link to={`/projects/ticket/${feed._id}`}>{feed.title}</Link>
                    </p>
                    <footer className="blockquote-footer">
                      <p>{handleDate(feed.createdAt)}</p>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Card>
            </>
          ) : feed.typeOf == "Project" ? (
            <p>
              <Card className="card-container">
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p>
                      <i class="fa-solid fa-diagram-project icon"></i>
                      <a href="">{feed.name}</a> Assigned Project <Link to={`/projects/${feed._id}`}>{feed.title}</Link>
                    </p>
                    <footer className="blockquote-footer">
                      <p>{handleDate(feed.createdAt)}</p>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Card>
            </p>
          ) : feed.typeOf == "Comment" && feed.ticket != undefined ? (
            <p>
              {console.log("comment for")}

              <Card>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p>
                      <i class="fa-solid fa-comment icon"></i>
                      <a href="">{feed.name}</a> Commented <Link to={`/projects/ticket/${feed.ticket._id}`}>{feed.ticket.title}</Link>
                    </p>
                    <footer className="blockquote-footer">
                      <p>{handleDate(feed.createdAt)}</p>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Card>
            </p>
          ) : (
            ""
          )
        )}
      </Row>
    </>
  )
}

export default UserFeed
