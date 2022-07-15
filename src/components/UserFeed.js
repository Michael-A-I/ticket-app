import React, { useContext, useEffect, useState } from "react"
import { Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import StateContext from "../context/StateContext"
import { handleDate } from "../helper/helper"

function UserFeed() {
  const appState = useContext(StateContext)
  const token = appState.user.token

  const [userFeed, setUserFeed] = useState([])
  const [feed, setFeed] = useState([])

  useEffect(() => {
    setFeeder()
  }, [])

  const setFeeder = async () => {
    const res = await fetch("/userfeed", {
      method: "GET",
      headers: {
        "x-access-token": token,
        "Content-type": "application/json"
      }
    })

    const feed = await res.json()
    console.log(feed)
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
        <pre>{JSON.stringify(userFeed)}</pre>
        {console.log(userFeed)}
        {userFeed.map(feed =>
          feed.typeOf == "Post" ? (
            <p>
              <i class="fa-solid fa-comment"></i>
              <a href="">{feed.name}</a> Asked <Link to={`/posts/${feed._id}`}>{feed.title}</Link> @{handleDate(feed.createdAt)}
            </p>
          ) : feed.typeOf == "Answer" ? (
            <p>
              <i class="fa-solid fa-comment-medical"></i> Answered<Link to={`/posts/${feed.post}`}>{feed.text}</Link>@{handleDate(feed.createdAt)}
            </p>
          ) : (
            <p>
              <i class="fa-brands fa-rocketchat"></i>
              <a href="">{feed.name}</a> Commented <Link to={`/posts/${feed.post}`}>{feed.postName}</Link>@{handleDate(feed.createdAt)}
            </p>
          )
        )}
      </Row>
    </>
  )
}

export default UserFeed
