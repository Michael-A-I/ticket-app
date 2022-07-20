import { React, useEffect, useState, useRef, useContext } from "react"
import { useNavigate, useLocation } from "react-router"
import { useParams } from "react-router-dom"
import Navbar from "./Navbar/Navbar"
import "./css/Post.css"
import "./css/Comments.css"
import { handleDate } from "../helper/helper"
import { copySync } from "fs-extra"
import { Alert, Button, Card, Col, Container, Fade, FloatingLabel, Form, Row } from "react-bootstrap"

/* Context */
import StateContext from "../context/StateContext"
import PostView from "./ui/PostView"
import Page from "./Page"
import Answer from "./ui/Answers/Answer"
import CreateAnswer from "./ui/Answers/CreateAnswer"
import PostComments from "./ui/PostView/PostComments"
import CreatePostComments from "./ui/PostView/CreatePostComments"

/* loading screen */
import ReactLoading from "react-loading"

function Post() {
  /* Answers scroll to */
  const myRef = useRef(null)
  const executeScroll = () => myRef.current.scrollIntoView()

  const appState = useContext(StateContext)
  const [post, setPost] = useState([])
  const [comments, setComments] = useState([])
  const [postAnswer, setPostAnswer] = useState([])
  const [postsID, setPostsID] = useState()
  const [postAnswerComments, setPostAnswerComments] = useState([])
  const [refresh, setRefresh] = useState(false)

  /* check state of page load */
  const [isLoading, setIsLoading] = useState(true)

  const history = useNavigate()
  let { id } = useParams()
  const token = appState.user.token
  useEffect(() => {
    console.log("useEffect")

    getPost()
    getAnswerComments()
    return () => window.removeEventListener("load", handleLoading)
  }, [])

  async function getPost() {
    console.log("getPostT")
    try {
      // get comments
      const resPost = await fetch(`/api/posts/${id}`, {
        headers: {
          method: "GET",
          "x-access-token": token
        }
      })

      const post = await resPost.json()

      setPost(post)
    } catch (error) {
      return error
    }
  }

  async function getComments() {
    console.log("getComments")

    try {
      // get comments
      const resComment = await fetch(`/api/posts/${id}/comments`, {
        headers: {
          "x-access-token": token
        }
      })

      const comments = await resComment.json()

      setComments(comments)
    } catch (error) {
      return error
    }
  }

  /* review is this redundant? */
  const getAnswerComments = async () => {
    console.log("getAnswerComments")

    try {
      const res = await fetch(`/api/posts/answers/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        }
      })

      const response = await res.json()
      setPostAnswer(response)
    } catch (error) {
      console.log(error)
    }
  }

  /* set loading to fale on page load */
  const handleLoading = () => {
    console.log("handleLoading")

    setIsLoading(false)
  }

  if (post == undefined) {
    return (
      <>
        <Navbar />
        <Container>
          <div style={{ paddingTop: "25%" }}>
            <ReactLoading className="loader" type="spinningBubbles" color="#0000FF" height={100} width={50} />
          </div>
        </Container>
      </>
    )
  }

  return (
    <>
      <Navbar />
      {/* {console.log(post)} */}
      <Page title={post.title}>
        <PostView post={post} executeScroll={executeScroll} getPost={getPost} />

        {/* Post Comments View */}
        <PostComments comments={comments} getComments={getComments} />

        {/* Post Comments Create */}
        <CreatePostComments post={post} comments={comments} setComments={setComments} getComments={getComments} />

        {/* Answers View*/}
        <Answer postId={postsID} postAnswer={postAnswer} getAnswerComments={getAnswerComments} />

        {/* Create Answers */}
        <CreateAnswer myRef={myRef} getAnswerComments={getAnswerComments} />
      </Page>
    </>
  )
}

export default Post
