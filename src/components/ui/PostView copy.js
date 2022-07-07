import React, { useContext, useEffect, useState } from "react"
import { Button, Card, Col, FloatingLabel, Form, Row } from "react-bootstrap"
import { handleDate } from "../../helper/helper"
import CreateAnswer from "./Answers/CreateAnswer"
import CreatePostCommnets from "./PostView/CreatePostComments"
import PostComments from "./PostView/PostComments"

/* Context */
import StateContext from "../../context/StateContext"
import { useParams } from "react-router"

/* Abstraction for API calls */
import useApi from "../../hooks/useApi"

function PostView(props) {
  /* state context */
  const appState = useContext(StateContext)
  const token = appState.user.token

  const [edit, setEdit] = useState(true)

  const [liked, setLiked] = useState()
  const [following, setFollowing] = useState()

  const { id } = useParams()

  useEffect(() => {
    console.log("Check Follow")
    // hasUserLiked()
    // checkFollow()
  }, [])

  const editPost = () => {
    setEdit(!edit)
  }
  const deletePost = async id => {
    try {
      console.log("PostsIndex.js token: " + token)
      await fetch(`/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (event, id) => {
    event.preventDefault()
    const comment = event.target
    const updatePost = { title: comment[0].value, description: comment[1].value }

    console.log("Update Post " + updatePost.text)

    try {
      console.log("PostsIndex.js token: " + token)
      await fetch(`/posts/${id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(updatePost)
      })
      setEdit(!edit)
      /* refresh view */
      props.getPost()
    } catch (error) {
      console.log(error)
    }
  }
  // check to see if user id is in db
  const checkFollow = async () => {
    const res = await fetch(`/posts/${id}/followcheck`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      }
    })
    const follow = await res.json()
    // console.log("Check Follow")
    setFollowing(follow)

    console.log("Check Follow" + follow)
  }
  // add user id to db

  const handleFollow = async () => {
    console.log("follow")
    setFollowing(true)
    const res = await fetch(`/posts/${id}/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      body: JSON.stringify({ hasUserFollowed: appState.user.id })
    })

    const state = await res.json()
  }

  // remove user id from db
  const handleUnFollow = async () => {
    console.log("unfollow")
    setFollowing(false)
    const res = await fetch(`/posts/${id}/unfollow`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      body: JSON.stringify({ hasUserFollowed: appState.user.id })
    })

    const state = await res.json()
  }

  const handleLike = async () => {
    setLiked(!liked)

    console.log("like")
    const res = await fetch(`/posts/${id}/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      body: JSON.stringify({ hasUserFollowed: appState.user.id })
    })

    const state = await res.json()
    console.log("like" + state.message)
  }

  const handleUnLike = async () => {
    console.log("unlike")
    setLiked(!liked)

    const res = await fetch(`/posts/${id}/unlike`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      body: JSON.stringify({ hasUserFollowed: appState.user.id })
    })

    const state = await res.json()

    console.log("unlike" + state.message)
  }

  const hasUserLiked = async () => {
    /* Persistance */
    console.log("hasUserLiked")

    const res = await fetch(`/posts/${id}/hasUserLiked`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      }
    })

    const state = await res.json()

    setLiked(state.hasLiked)
  }

  return (
    <Row>
      {edit ? (
        <Card>
          <Card.Body>
            {following ? <Button onClick={() => handleUnFollow}>Followed</Button> : <Button onClick={handleFollow}>Follow</Button>}
            <Card.Title>{props.post.title}</Card.Title>
            <Card.Text>{props.post.description}</Card.Text>
            {props.post.updatedAt != props.post.createdAt ? <Card.Text>updated at {handleDate(props.post.updatedAt)}</Card.Text> : <Card.Text>created at {handleDate(props.post.updatedAt)}</Card.Text>}
            <Row>{props.post.file ? <img src={props.post.file} className="img-thumbnail mt-2" style={{ height: "100px", width: "150px" }} /> : ""}</Row>

            {/* User */}
            <Row>
              {props.post.user != undefined ? <p>{props.post.user.username}</p> : ""}
              {/* {console.log(props.post.user.image)} */}
              {props.post.user != undefined ? <img src={props.post.user.image} className="img-thumbnail mt-2" style={{ height: "40px", width: "50px" }} /> : ""}
            </Row>
            {/* Conditional to fix issue with props.post.user._id returning undefined */}
            {props.post.user && props.post.user._id == appState.user.id ? (
              <>
                <Button variant="primary" onClick={props.executeScroll}>
                  Answer Post
                </Button>
                <Button variant="warning" onClick={editPost}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => deletePost(props.post._id)}>
                  Delete
                </Button>
              </>
            ) : (
              ""
            )}
            {console.log(following)}
            {/* {console.log(click)} */}
            {liked ? <i class="fa-solid fa-heart" onClick={handleUnLike} style={{ color: "red", background: "grey" }}></i> : <i class="fa-solid fa-heart" onClick={handleLike} style={{ color: "white", background: "grey" }}></i>}
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <Card.Body>
            <Form onSubmit={e => handleSubmit(e, props.post._id)}>
              <Form.Label>Title</Form.Label>
              {/* Title */}
              <Form.Control control="input" size="lg" type="text" placeholder={`${props.post.title}`} name="title" />

              <Form.Control type="text" placeholder={`${props.post.description}`} />
              {props.post.updatedAt != props.post.createdAt ? <Card.Text>updated at {handleDate(props.post.updatedAt)}</Card.Text> : <Card.Text>created at {handleDate(props.post.updatedAt)}</Card.Text>}
              {/* {console.log(props.post.file)} */}
              {props.post.file ? <img src={props.post.file} className="img-thumbnail mt-2" height={200} width={200} /> : ""}

              <Button type="submit" variant="primary">
                Save
              </Button>
              <Button variant="warning" onClick={() => setEdit(!edit)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => deletePost(props.post._id)}>
                Delete
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Row>
  )
}

export default PostView

/* 
get data from db
set initial value of page upload to set following state

onclick change value of state to change ui and update back end

on page refresh get data from db and set initial state. 
*/
