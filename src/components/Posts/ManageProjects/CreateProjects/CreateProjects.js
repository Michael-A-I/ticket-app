import React, { useContext, useEffect, useRef, useState } from "react"
import { Editor } from "@tinymce/tinymce-react"
import Page from "../../../ui/Page"
import { Button, Checkbox, Col, Row, ListGroup, InputGroup, Form, Dropdown } from "react-bootstrap"
import Thumb from "../../../ui/Thumb"
import { object } from "yup"
import StateContext from "../../../../context/StateContext"
// import { Dropdown } from "bootstrap"

export default function App() {
  // Files Upload
  const [files, setFiles] = useState([])
  const [image, setImage] = useState("/upload.png")
  const [base64, setBase64] = useState("")

  useEffect(() => {
    fileToBase64()
    getProjectManagers()
    // track state of files and run if updated
  }, [files])

  const editorRef = useRef(null)
  const handleSubmit = event => {
    console.log("handleSubmit")

    event.preventDefault()
    const target = event.target
    // select managment group is 18
    const project = { title: target[0].value, description: target[1].value, files: base64, category: target[20].value, projectManager: target[18].value }

    console.log(project)

    // console.log(project)

    /* upload project to db */
  }

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }

  const [check, setCheck] = useState(false)
  const handleChange = () => {
    setCheck(!check)
  }

  const fileToBase64 = () => {
    console.log("fileToBase64")
    console.log(files)
    // clear values in state.
    setBase64("")

    files.map((file, index) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          // Base64 conversion load in array
          const response = fileReader.result
          // loop and set values in state
          setBase64(prev => [...prev, response])
        }
      }
    })
  }

  const [managers, setManagers] = useState()
  const appState = useContext(StateContext)
  const token = appState.user.token
  const getProjectManagers = async () => {
    // fetch project managers for form.
    const res = await fetch("/api/usersIndex", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      }
    })

    const users = await res.json()

    const managers = users.filter(user => {
      console.log(user.role)
      return user.role == "owner" || user.role == "manager" || user.role == "administrator"
    })

    console.log(managers)
    setManagers(managers)
  }

  return (
    <>
      <Page>
        <Form onSubmit={handleSubmit}>
          <Row>
            <InputGroup className="mb-3">
              <Form.Control placeholder="Title" name="title" aria-label="Title" />
            </InputGroup>
          </Row>

          <Row>
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue="Write Project/Bug specifications here"
              init={{
                height: 500,
                menubar: false,
                plugins: ["advlist autolink lists link image charmap print preview anchor", "searchreplace visualblocks code fullscreen", "insertdatetime media table paste code help wordcount"],
                toolbar: "undo redo | formatselect | " + "bold italic backcolor | alignleft aligncenter " + "alignright alignjustify | bullist numlist outdent indent | " + "removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
              }}
            />
          </Row>
          <Row>
            <Col>
              {/* input filter for group list*/}
              <InputGroup className="mb-3">
                <Form.Control placeholder="Select Management Group" aria-label="Username" aria-describedby="basic-addon1" />
              </InputGroup>
              {/* Group List */}
              <ListGroup style={{ height: "200px", overflowY: "scroll" }}>
                <ListGroup.Item>
                  <input type="checkbox" id="c1" class="chk-btn" />
                  <label for="c1">Check Button</label>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col>
              <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="Feature">Feature</option>
                <option value="Bug">Bug</option>
              </Form.Select>
            </Col>
          </Row>

          <Row>
            <Col>
              {/* File upload */}
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>File Upload</Form.Label>
                {/* Image upload */}
                {/* //! Ability to post multiple images */}
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={event => {
                    // from computer load files into state for thumbnail
                    setFiles([...event.target.files])

                    // read contents of specified blob or file, turns to base 64 encoded string.

                    //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
                  }}
                  className="form-control"
                  multiple
                />

                {files.map((file, index) => {
                  return <Thumb file={files[index]} />
                })}

                {/* {files.map(file => {
                })} */}
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" onClick={log}>
            Submit
          </Button>
        </Form>
      </Page>
    </>
  )
}
