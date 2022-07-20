import React, { useContext, useEffect, useState } from "react"
import { Button, Card, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router"
import "./css/Feed.css"
import StateContext from "../../context/StateContext"

function Feed(props) {
  /* fetch posts */
  const history = useNavigate()

  const appState = useContext(StateContext)
  const [allCounter, setCounter] = useState(0)
  const [unasnswerdCounter, setUnansweredCounter] = useState(0)
  const [myQuestionsCounter, setMyQuestions] = useState(0)
  const [postsCopy, setPostsCopy] = useState([])

  /*! rendered last */
  useEffect(() => {
    setPostsCopy(props.posts)
    allPostsCounter()
    unansweredPostsCounter()
    myQuestions()
  }, [props.posts])

  console.log(postsCopy)
  /* set options menu default on creat post */
  const handleOptions = title => {
    // e.preventDefault()
    // console.log(e.target.innerText)

    localStorage.setItem("handleOptions", title)
  }

  const allPostsCounter = () => {
    //  number of all posts
    if (props.posts != []) {
      setCounter(props.posts.length)
    }
  }

  const unansweredPostsCounter = () => {
    //  number of all posts
    console.log(props.posts)
    if (props.posts != []) {
      console.log(props.posts)
      const res = props.posts.filter(post => post.answers.length <= 0)
      setUnansweredCounter(res.length)
    }
  }

  const myQuestions = () => {
    //  number of all posts

    if (props.posts != []) {
      const res = props.posts.filter(post => post.name == appState.user.username)

      setMyQuestions(res.length)
    }
  }

  const postFilter = filter => {
    if (filter == "All") {
      console.log("All")
      setPostsCopy(props.posts)
    }

    if (filter == "Unanswered") {
      console.log("Unanswered")
      const res = props.posts.filter(post => post.answers.length <= 0)
      setPostsCopy(res)
    }

    if (filter == "MyQuestions") {
      console.log("MyQuestions")
      const res = props.posts.filter(post => post.name == appState.user.username)
      setPostsCopy(res)
    }
  }

  return (
    <>
      <Container id="bootstrap-overrides">
        <Row className="feed-header">
          <h1 className="feed-title">{props.title}</h1>
          <Link to={"/post/new"} onClick={handleOptions(props.title)} className="feed-create-button-item">
            Create Post
          </Link>
        </Row>
        <Row>This is a general forum for Chatter employees. Feel free to raise here any questions related to admins, processes, non-product specific topics etc.</Row>
        <Row className="feed-buttons">
          <Button className="feed-button-item" onClick={() => postFilter("All")}>
            All({allCounter})
          </Button>
          <Button className="feed-button-item" onClick={() => postFilter("Unanswered")}>
            Unaswered({unasnswerdCounter})
          </Button>
          <Button className="feed-button-item" onClick={() => postFilter("MyQuestions")}>
            My Questions({myQuestionsCounter})
          </Button>
        </Row>

        {postsCopy.map(post => (
          <Row>
            <Card>
              <Card.Body>
                {/* Post Title */}
                <Card.Title>
                  <h1>{post.title}</h1>
                </Card.Title>

                {/* Post Description */}
                <Card.Text>{post.description}</Card.Text>

                {/* Post Buttons */}
                <Link to={`/posts/${post._id}`}>
                  <button className="btn btn-primary btn-sm">Go to post</button>
                </Link>
                {appState.user.id == post.user ? (
                  <Button className="btn btn-danger btn-sm" onClick={() => props.handleDelete(post._id)}>
                    Delete
                  </Button>
                ) : null}
              </Card.Body>
            </Card>
          </Row>
        ))}
      </Container>
    </>
  )
}

export default Feed

/* 

if dashboard display all posts created 



User should be able to grab all posts is its dashboard

filter by All, Unaswered, and, Personal

User should be able to initially filter by category 

filter by All, Unaswered, and, Personal



*/
