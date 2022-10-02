import React, { useState } from "react"
import Navbar from "../Navbar/Navbar"
import { Alert, Button, Card, Col, Container, Fade, FloatingLabel, Form, FormCheck, Row } from "react-bootstrap"
import Page from "../ui/Page"
import Thumb from "../ui/Thumb"
import StateContext from "../../context/StateContext"
import DispatchContext from "../../context/DispatchContext"

import { useContext } from "react"
import { useEffect } from "react"
import Avatar from "./Avatar"
import Feedback from "react-bootstrap/esm/Feedback"
import ProfileEditNav from "./ProfileEditNav"

function ProfileEditAvatar() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const [profile, setProfile] = useState({ avatar: false, gravatar: true })
  const [file, setFile] = useState()
  const [image, setImage] = useState("/upload.png")
  const [base64, setBase64] = useState()

  const token = appState.user.token

  useEffect(() => {
    handlePersistance()
  }, [])

  // peristance
  const handlePersistance = async () => {
    try {
      const email = localStorage.getItem("email")
      const res = await fetch(`/api/user/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        }
      })

      const user = await res.json()
      console.log(user)
      // setUserState({ title: user.title, bio: user.bio })
      console.log({ profile: user.upload })
      setProfile({ avatar: user.upload, gravatar: !user.upload })
      setImage(user.image)
      console.log(user.image)
    } catch (error) {
      console.log(error)
    }
  }

  // Ui
  const handleChange = () => {
    console.log("handleChange")
    setProfile({ avatar: !profile.avatar, gravatar: !profile.gravatar })
  }

  // submit form
  const handleSubmit = async e => {
    console.log("handleSubmit")

    e.preventDefault()

    const checked = e.target[0].checked

    const body = { upload: checked, image: base64 }

    const email = localStorage.getItem("email")
    /* upload to DB */
    try {
      const res = await fetch(`/api/profile/edit/${email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(body)
      })

      /* set global state of user avatar */
      if (checked) {
        if (base64) {
          localStorage.setItem("avatar", base64)
          appDispatch({ type: "setAvatar", value: base64 })
        } else {
          localStorage.setItem("avatar", image)
          appDispatch({ type: "setAvatar", value: image })
        }
      } else {
        localStorage.setItem("avatar", "/default-profile.jpg")
        appDispatch({ type: "setAvatar", value: "/default-profile.jpg" })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Page>
        <Container>
          {/* ROW */}
          {/* Two Images */}
          <ProfileEditNav></ProfileEditNav>

          <Row>
            <p>Choose an existing avatar, or drag and drop a photo from your computer.</p>
          </Row>
          {/* current profile */}
          <h1>Picture being used</h1>
          <Avatar width={"250px"} height={"200px"} />
          <Row>
            <Col>
              <h1>Upload Pic</h1>
              {file ? <Thumb file={file} /> : <img src={`${image}`} className="img-thumbnail mt-2" style={{ height: "152px", width: "200px", background: "white" }} />}
            </Col>
            <Col>
              <h1>Defaul Pic</h1>
              <img src="/default-profile.jpg" className="img-thumbnail mt-2" style={{ height: "152px", width: "200px" }} />
            </Col>
          </Row>
          {/* ROW */}
          <Row>
            {/* Form */}

            <Form onSubmit={e => handleSubmit(e)} id="checkbox">
              <div onClick={() => handleChange()}>
                <FormCheck>
                  <FormCheck.Input style={{ opacity: "1" }} type={"checkbox"} checked={profile.avatar} />
                  <FormCheck.Label>Avatar</FormCheck.Label>
                  {/* <Feedback type="invalid">Yo this is required</Feedback> */}
                </FormCheck>
              </div>
              <div onClick={() => handleChange()}>
                <FormCheck>
                  <FormCheck.Input style={{ opacity: "1" }} type={"checkbox"} checked={profile.gravatar} />
                  <FormCheck.Label>Default</FormCheck.Label>
                  {/* <Feedback type="invalid">Yo this is required</Feedback> */}
                </FormCheck>
              </div>

              {/* <Form.Check type="switch" label="Avatar" style={{ opacity: "1" }} />
                <Form.Check type="switch" label="Defaul Profile" id="checkbox" /> */}

              {/* Switch to select Image type */}
              {/* Image upload */}
              <input
                id="file"
                name="file"
                type="file"
                onChange={event => {
                  const fileReader = new FileReader()
                  fileReader.onload = () => {
                    if (fileReader.readyState === 2) {
                      // Base64 conversion
                      setBase64(fileReader.result)
                    }
                  }
                  // File from computer
                  fileReader.readAsDataURL(event.target.files[0])
                  setFile(event.target.files[0])
                }}
                className="form-control"
              />

              <Button type="submit">Submit</Button>
            </Form>
            {/* Submit Button */}
          </Row>
        </Container>
      </Page>
    </>
  )
}

export default ProfileEditAvatar

/* 
  
default image type is gravatar

user can not submit to backend without a image uploaded.


select image type will change image user will use in posts comments

*/
