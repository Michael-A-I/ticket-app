import { React, useEffect, useState, useRef, useContext } from "react"
import { useNavigate, useLocation } from "react-router"
import { useParams } from "react-router-dom"
import { Navbar } from "./Navbar"
import "./css/Post.css"
import "./css/Comments.css"
import { handleDate } from "../helper/helper"
import { copySync } from "fs-extra"
import { Alert, Fade } from "react-bootstrap"
import { UserContext } from "../context/UserContext"

/* React Component */
export function Post(props) {
  console.log("Post")
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [edit, setEdit] = useState(null)
  const [userID, setUserID] = useState()
  const inputVale = useRef(null)
  const [edited, setEdited] = useState(false)
  const [editPost, setEditPost] = useState(true)
  const [likes, setLikes] = useState(0)
  const [hasTheUserLiked, setHasTheUserLiked] = useState(true)
  const [postOwner, setPostOwner] = useState()

  const { user, setUser } = useContext(UserContext)
  localStorage.setItem("user", userID)
  setUser(localStorage.getItem("user"))
  console.log(user)

  // const [firstLoad, setFirstLoad] = useState(true)
  const [followingClicked, setFollowingClicked] = useState(true)
  const [following, setFollowing] = useState(false)
  const [unfollowing, setUnfollowing] = useState(false)
  const [show, setShow] = useState(false)

  const history = useNavigate()
  let { id } = useParams()

  useEffect(async () => {
    /* see if use has liked already */
    console.log("useEffect")
    await getCurrentUser()
    hasUserLiked()
    getComments()
    getPost()
    checkIfUserFollows()
  }, [history])

  async function hasUserLiked() {
    console.log("hasUserLiked")

    try {
      const token = localStorage.getItem("token")

      // get comments
      const hasUserLiked = await fetch(`/posts/${id}/hasUserLiked`, {
        headers: {
          "x-access-token": token
        }
      })
      const returnLike = await hasUserLiked.json()
      console.log(returnLike.hasLiked)
      setHasTheUserLiked(!returnLike.hasLiked)
      // console.log(returnLike)
    } catch (error) {
      console.log(error)
    }
  }

  function hasUserLikedState() {
    setHasTheUserLiked(!hasTheUserLiked)
  }

  async function getComments() {
    try {
      const token = localStorage.getItem("token")

      // get comments
      const resComment = await fetch(`http://localhost:5000/posts/${id}/comments`, {
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

  async function getPost() {
    try {
      const token = localStorage.getItem("token")

      // get comments
      const resPost = await fetch(`http://localhost:5000/posts/${id}`, {
        headers: {
          "x-access-token": token
        }
      })

      const post = await resPost.json()

      setPostOwner(post.user)
      setPost(post)
    } catch (error) {
      return error
    }
  }
  // putting history in useeffect

  /* get user */

  async function handleComment(event) {
    event.preventDefault()
    // const user = localStorage.getItem()
    const comment = event.target
    const createComment = { text: comment[0].value, post: id }
    const token = localStorage.getItem("token")
    // console.log(createComment)
    try {
      const res = await fetch(`http://localhost:5000/posts/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(createComment)
      })
    } catch (error) {
      return error
    }

    try {
      // get comments
      const resComment = await fetch(`http://localhost:5000/posts/${id}/comments`, {
        headers: {
          "x-access-token": token
        }
      })

      const comments = await resComment.json()

      setComments(comments)
    } catch (error) {
      console.log(error)
    }
  }

  // delete comment hand
  async function handleCommentDelete(event, commentId) {
    const token = localStorage.getItem("token")

    /* Delete Post if user created comment */

    await fetch(`http://localhost:5000/posts/${commentId}/comments`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      }
    })

    // get comments
    const resComment = await fetch(`http://localhost:5000/posts/${id}/comments`, {
      headers: {
        "x-access-token": token
      }
    })

    const comments = await resComment.json()

    setComments(comments)
  }

  async function handleUpdate(event, commentId) {
    console.log(event.target)
    event.preventDefault()
    const token = localStorage.getItem("token")
    const comment = event.target
    const updateComment = { text: comment[0].value, post: id }
    console.log(updateComment)
    console.log(commentId)
    try {
      await fetch(`http://localhost:5000/posts/${commentId}/comments`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },

        body: JSON.stringify(updateComment)
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function commentsReload() {
    const token = localStorage.getItem("token")
    getComments()
    // try {
    //   // get comments
    //   const resComments = await fetch(`http://localhost:5000/posts/${id}/comments`, {
    //     headers: {
    //       "x-access-token": token
    //     }
    //   })
    //   const comments = await resComments.json()
    //   console.log("comments reloaded")
    //   setComments(comments)
    // } catch (err) {
    //   console.log(err)
    // }
  }

  function clearComment() {
    inputVale.current.value = ""
  }

  async function getCurrentUser() {
    console.log("get current user")

    const token = localStorage.getItem("token")

    try {
      const userid = await fetch(`http://localhost:5000/isUserAuth`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        }
      })

      const userObj = await userid.json()
      const userID = userObj.user.id
      setUserID(userID)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleDelete(id) {
    try {
      const token = localStorage.getItem("token")
      console.log("PostsIndex.js token: " + token)
      const res = await fetch(`http://localhost:5000/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        }
      })

      /* redirect */
      return history("/dashboard")
    } catch (error) {
      console.log(error)
    }
  }

  function handlePostEdit(postID, postUser) {
    /* TODO: update database */
    if (userID == post.user) {
      setEditPost(false)
    } else {
      console.log("not correct user")
      return alert("user did not create post")
    }
  }

  function handlePostUpdate(event) {
    event.preventDefault()

    setEditPost(true)
  }

  function handleCommentEdit(commmentID, commentUser) {
    if (userID == post.user) {
      setEdit(commmentID)
    } else {
      console.log("user did not create comment")

      return alert("user did not create comment")
    }
  }

  async function handleLikesIncrease() {
    // user  toggle 1+ to likes
    //add like to post
    // add post liked to user

    // send likes to database
    console.log(user)
    const token = localStorage.getItem("token")
    const hasUserLiked = { hasUserLiked: user.id }
    console.log(hasUserLiked)

    fetch(`http://localhost:5000/posts/${id}/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      body: JSON.stringify(hasUserLiked)
    })

    setLikes(likes + 1)
    // TODO: likes should on page load be set from database on Post model
  }

  async function handleLikesDecrease() {
    const token = localStorage.getItem("token")
    fetch(`http://localhost:5000/posts/${id}/unlike`, {
      method: "PUT",
      headers: {
        "x-access-token": token
      }
    })

    setLikes(likes - 1)
  }

  async function followPost() {
    setFollowing(true)
    setUnfollowing(false)
    setShow(true)
    setFollowingClicked(!followingClicked)
    setTimeout(function () {
      setShow(false)
    }, 1000)

    const token = localStorage.getItem("token")
    const hasUserFollowed = { hasUserFollowed: user.id }
    console.log(hasUserFollowed)

    await fetch(`http://localhost:5000/posts/${id}/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      body: JSON.stringify(hasUserFollowed)
    })
  }
  async function unFollowPost() {
    setFollowing(false)
    setUnfollowing(true)
    setShow(true)
    setFollowingClicked(!followingClicked)

    setTimeout(function () {
      setShow(false)
    }, 1000)

    const token = localStorage.getItem("token")
    const hasUserFollowed = { hasUserFollowed: user.id }
    console.log(hasUserFollowed)
    console.log(user)
    await fetch(`http://localhost:5000/posts/${id}/unfollow`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      body: JSON.stringify(hasUserFollowed)
    })
  }

  async function checkIfUserFollows() {
    console.log("checkIfUserFollows")
    const token = localStorage.getItem("token")

    try {
      // get comments
      const userid = await fetch(`http://localhost:5000/isUserAuth`, {
        headers: {
          "x-access-token": token
        }
      })

      const hasUserFollowed = await fetch(`/posts/${id}/followcheck`, {
        headers: {
          "x-access-token": token
        }
      })

      const returnUserFollows = await hasUserFollowed.json()
      const usersObj = await userid.json()
      const userId = usersObj.user.id
      console.log(returnUserFollows)
      console.log(userId)

      returnUserFollows.map(follow => {
        if (follow == userId) {
          console.log("true")
          setFollowingClicked(false)
        } else {
          console.log("false")
          setFollowingClicked(true)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Navbar />
      <div className="post__container">
        <div className="post__wrapper">
          {following ? (
            <Alert variant="success" show={show} transition={Fade}>
              <Alert.Heading>Followed Post</Alert.Heading>
            </Alert>
          ) : (
            ""
          )}

          {unfollowing ? (
            <Alert variant="danger" show={show} transition={Fade}>
              <Alert.Heading>Unfollowed Post</Alert.Heading>
            </Alert>
          ) : (
            ""
          )}
          {console.log(post._id)}
          {editPost ? (
            <div>
              <h1>Post</h1>
              <h2>Title: {post.title}</h2>
              <p>Bug Description: </p>
              <p className="post__description">{post.description}</p>
              <p className="created">
                created by {post.name} @ {handleDate(post.createdAt)}
              </p>

              <div className="post-likes-container">
                {hasTheUserLiked ? (
                  <button type="button" onClick={() => handleLikesIncrease() & hasUserLikedState()} className="btn btn-sm btn-primary">
                    <i class="fa-solid fa-heart-circle-plus"></i>
                  </button>
                ) : (
                  <button type="button" onClick={() => handleLikesDecrease() & hasUserLikedState()} className="btn btn-sm btn-danger">
                    <i class="fa-solid fa-heart-circle-minus"></i>
                  </button>
                )}
                {userID == post.user ? (
                  ""
                ) : followingClicked ? (
                  <button type="button" className="btn btn-sm btn-primary" onClick={followPost}>
                    Follow Post
                  </button>
                ) : (
                  <button type="button" className="btn btn-sm btn-danger" onClick={unFollowPost}>
                    Following Post
                  </button>
                )}

                <p>number of likes: {post.numberOfLikes + likes}</p>
              </div>

              <button type="button" onClick={() => handlePostEdit(user, post.id)} className="btn btn-sm btn-success">
                Edit Post
              </button>

              <button type="button" onClick={() => handleDelete(post._id)} className="btn btn-sm btn-danger">
                Delete
              </button>
            </div>
          ) : (
            <div>
              <h1>Edit Post</h1>

              <form onSubmit={handlePostUpdate}>
                <input type="text" defaultValue={post.title} />
                {/* <h2>Title: {post.title}</h2> */}
                <p>Bug Description: </p>
                <textarea type="text" defaultValue={post.description} />
                {/* <p className="post__description">{post.description}</p> */}
                <p className="created">
                  created by {post.name} @ {handleDate(post.createdAt)}
                </p>

                <button type="submit" lassName="btn btn-sm btn-success">
                  submit
                </button>

                <button type="button" className="btn btn-sm btn-danger">
                  Delete
                </button>
              </form>
            </div>
          )}

          <div className="comments-container">
            {/* {console.log(post.title)} */}
            {comments.map((comment, index) =>
              edit !== comment._id ? (
                <div key={index}>
                  <p>{comment.text}</p>
                  {/* <p>{comment._id}</p> */}
                  <button onClick={() => handleCommentEdit(comment._id, comment.user)} type="button" class="btn btn-success btn-sm">
                    edit
                  </button>
                  <button onClick={event => handleCommentDelete(event, comment._id)} class="btn btn-danger btn-sm">
                    delete
                  </button>
                  <div className="">
                    <p className="created">{edited !== comment.id ? `created by ${comment.name} @ ${handleDate(comment.createdAt)}` : `created by ${comment.name} @ ${handleDate(comment.updatedAt)} Edited`}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={event => setEdit(null) & handleUpdate(event, comment._id) & commentsReload() & setEdited(comment._id)}>
                  <div key={index}>
                    <input type="text" defaultValue={comment.text} />
                    {/* <p>{comment._id}</p> */}
                    <button type="submit" class="btn btn-primary btn-sm">
                      submit
                    </button>
                    <button onClick={event => handleDelete(event, comment._id)} class="btn btn-danger btn-sm">
                      delete
                    </button>
                  </div>
                  <p className="created">{edited !== comment.id ? `created by ${comment.name} @ ${handleDate(comment.createdAt)}` : `created by ${comment.name} @ ${handleDate(comment.updatedAt)} Edited`}</p>
                </form>
              )
            )}
          </div>

          <div class="row">
            <div class="col-sm-4 col-sm-offset-4">
              <form onSubmit={event => handleComment(event) & clearComment()}>
                <legend>New Comment</legend>
                <div class="form-group">
                  <label for="post-comment">Comment:</label>
                  <input required type="text" name="post-comment" class="form-control" id="post-comment" placeholder=" New Comment" ref={inputVale} />
                </div>

                <div class="text-right">
                  <button type="submit" class="btn btn-primary">
                    post comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// TODO: Add persistance to post follow state.

/* TODO: notifications for posts for users if they follow a post */

/* TODO: Dashboard should go back to previous button click */
