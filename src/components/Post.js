import { React, useEffect, useState, useRef, useContext } from "react"
import { useNavigate, useLocation } from "react-router"
import { useParams } from "react-router-dom"
import Navbar from "./Navbar"
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

function Post() {
  /* Answers scroll to */
  const myRef = useRef(null)
  const executeScroll = () => myRef.current.scrollIntoView()

  const appState = useContext(StateContext)
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [postAnswer, setPostAnswer] = useState([])
  const [postsID, setPostsID] = useState()
  const history = useNavigate()
  let { id } = useParams()
  const [refresh, setRefresh] = useState(false)
  const [postAnswerComments, setPostAnswerComments] = useState([])
  const token = appState.user.token
  useEffect(() => {
    console.log("refresh")
    getPost()

    getAnswerComments()
  }, [refresh])

  async function getPost() {
    console.log("GET POST")
    try {
      // get comments
      const resPost = await fetch(`/posts/${id}`, {
        headers: {
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
    try {
      // get comments
      const resComment = await fetch(`/posts/${id}/comments`, {
        headers: {
          "x-access-token": token
        }
      })

      const comments = await resComment.json()
      console.log(comments)
      setComments(comments)
    } catch (error) {
      return error
    }
  }

  const getAnswers = async postId => {
    // handlePostComment()
    // const user = localStorage.getItem()
    // console.log("Post ID:" + postId)

    console.log("Post ID = " + id)
    try {
      const res = await fetch(`/posts/${id}/answers`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        }
      })

      const post = await res.json()

      console.log(post.answers)

      setPostAnswer(post.answers)
      console.log("get answer")
    } catch (error) {
      return error
    }
  }

  const getAnswerComments = async () => {
    // get all comments from answers.
    try {
      const res = await fetch(`/posts/answers/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        }
      })

      const response = await res.json()
      console.log("getAnswerComments")
      console.log(response)
      setPostAnswer(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Navbar />
      <Page title={post.title}>
        {/* post view */}
        {console.log("postID" + postsID)}
        <PostView post={post} executeScroll={executeScroll} />

        {/* Post Comments View */}
        <PostComments comments={comments} getComments={getComments} />

        {/* Post Comments Create */}
        <CreatePostComments getComments={getComments} />

        {/* Answers View*/}
        <Answer postId={postsID} postAnswer={postAnswer} getAnswerComments={getAnswerComments} />

        {/* Create Answers */}
        <CreateAnswer myRef={myRef} getAnswerComments={getAnswerComments} getAnswers={getAnswers} />
      </Page>
    </>
  )
}

export default Post
