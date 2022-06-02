import React from "react"
import { Button, Card, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./css/Feed.css"
function Feed(props) {
  /* fetch posts */

  /* set options menu default on creat post */
  const handleOptions = title => {
    // e.preventDefault()
    // console.log(e.target.innerText)

    localStorage.setItem("handleOptions", title)
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
          <Button className="feed-button-item">All(25)</Button>
          <Button className="feed-button-item">Unaswered(4)</Button>
          <Button className="feed-button-item">My Questions(2)</Button>
        </Row>

        {props.posts.map(post => (
          <Row>
            <Card>
              <Card.Body>
                <Card.Title>
                  <h1>{post.title}</h1>
                </Card.Title>
                <Card.Text>{post.description}</Card.Text>
                {post._id}
                <Link to={`/posts/${post._id}`}>
                  <button className="btn btn-primary btn-sm">Go to post</button>
                </Link>
                <Button className="btn btn-danger btn-sm" onClick={() => props.handleDelete(post._id)}>
                  Delete
                </Button>
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
