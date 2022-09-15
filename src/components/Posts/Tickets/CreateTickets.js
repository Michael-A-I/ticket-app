import Page from "../../ui/Page"
import React, { useContext, useEffect, useRef, useState } from "react"
import { Editor } from "@tinymce/tinymce-react"
import { useParams } from "react-router"
import { Button, Checkbox, Col, Row, ListGroup, InputGroup, Form, Dropdown } from "react-bootstrap"
import Thumb from "../../ui/Thumb"
import { object } from "yup"
import StateContext from "../../../context/StateContext"
import { match } from "assert"
import Status from "../Status"
import Priority from "../Priority"

function CreateTickets(props) {
  const [files, setFiles] = useState([])
  const [image, setImage] = useState("/upload.png")
  const [assigned, setAssigned] = useState()
  const [base64, setBase64] = useState("")
  const { id } = useParams()
  const [developers, setDevelopers] = useState([])
  const appState = useContext(StateContext)
  const token = appState.user.token
  const editorRef = useRef(null)
  const [matches, setMatch] = useState([])
  /* filter developers */
  const [filter, setFilter] = useState()

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }
  useEffect(() => {
    fileToBase64()
    getDevelopers()
    // track state of files and run if updated
    console.log(appState)
  }, [files])

  useEffect(() => {
    setAssignedJob()
  }, [matches, developers])

  // filter developer
  useEffect(() => {
    handleDeveloperState()
  }, [filter])

  const handleSubmit = async event => {
    console.log("handleSubmit")
    event.preventDefault()
    const target = event.target
    const userId = localStorage.getItem("Id")

    const ticket = { title: target[0].value, description: target[1].value, files: base64, developer: target[18].value, email: appState.user.email, assigned: assigned._id, priority: target[25].value, status: target[26].value }
    console.log("Dasdf")
    console.log({ ticket })

    try {
      const res = await fetch(`/api/projects/${id}/tickets/new`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(ticket)
      })

      console.log(res)
    } catch (error) {
      console.log(error)
    }
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

  const getDevelopers = async () => {
    // fetch project managers for form.
    const res = await fetch("/api/usersIndex", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      }
    })

    const users = await res.json()

    const developers = users.filter(user => {
      console.log(user.role)
      return user.role == "owner" || user.role == "manager" || user.role == "administrator" || user.role == "member"
    })

    console.log({ developers })
    setDevelopersWithIsCheckedProperty(developers)
  }

  const setDevelopersWithIsCheckedProperty = async data => {
    let developers = data.map(data => {
      data.isChecked = false

      return data
    })

    setDevelopers(developers)
    setMatch(developers)
  }
  //! How to change an object property in an array state container?? React Hooks useState
  const checker = i => {
    console.log(i)
    setMatch(matches.map((item, index) => (i == index ? { ...item, isChecked: !item.isChecked } : { ...item, isChecked: false })))
  }
  // !https://stackoverflow.com/questions/54002792/in-general-is-it-better-to-use-one-or-many-useeffect-hooks-in-a-single-component
  const setAssignedJob = () => {
    matches.map(developer => (developer.isChecked ? setAssigned(developer) : null))
  }

  const handleSelect = e => {
    const value = e.target.value
    setFilter(value)
  }

  const handleDeveloperState = () => {
    const regex = new RegExp(filter, "g")
    console.log({ regex })
    const matches = developers.filter(developer => {
      return regex.test(developer.username)
    })
    setMatch(matches)
  }

  let priority = ["none", "low", "medium", "high"]

  let status = ["new", "completed", "additional", "inprogress"]

  return (
    <>
      <Page>
        <h1>Create Tickets</h1>
        <Form onSubmit={handleSubmit}>
          <Row>
            <InputGroup className="mb-3">
              <Form.Control placeholder="Title" name="title" aria-label="Title" />
            </InputGroup>
          </Row>

          <Row>
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue=""
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
              {/* filter will alter the state of developer objects via regex */}
              <InputGroup className="mb-3">
                <Form.Control placeholder="Select Management Group" aria-label="Username" aria-describedby="basic-addon1" value={filter} onChange={e => handleSelect(e)} />
              </InputGroup>

              {/* Group List */}
              <ListGroup style={{ height: "200px", overflowY: "scroll" }}>
                {matches.map((developer, index) => (
                  <ListGroup.Item onClick={() => checker(index)}>
                    {index}
                    <input type="checkbox" id="c1" class="chk-btn" style={{ opacity: "1", position: "relative", margin: "10px" }} checked={developer.isChecked} value={developer._id} />
                    <label for="c1">{developer.username}</label>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>

            <Col>
              <h1>Priority</h1>
              <Form.Select aria-label="Default select example">
                {priority.map(s => (
                  <option value={s}>{s}</option>
                ))}
              </Form.Select>
              <h1>Status</h1>
              <Form.Select aria-label="Default select example">
                {status.map(s => (
                  <option value={s}>{s}</option>
                ))}
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

export default CreateTickets
