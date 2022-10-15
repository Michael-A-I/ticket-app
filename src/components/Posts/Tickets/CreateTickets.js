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
import Toasty from "../../ui/Toasty"
import msgConext from "../../ui/helpers/toastyMessages"
import DispatchContext from "../../../context/DispatchContext"

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

  const appDispatch = useContext(DispatchContext)

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

  const [value, setEditorValue] = useState(props.initialValue ?? "")
  useEffect(() => setEditorValue(props.initialValue ?? ""), [props.initialValue])

  const handleSubmit = async event => {
    console.log("handleSubmit")
    event.preventDefault()
    const target = event.target
    const userId = localStorage.getItem("Id")
    const priority = target.name

    const ticket = { title: target[0].value, description: value, files: base64, developer: target[18].value, email: appState.user.email, assigned: assigned._id, priority: formVal.priority, status: formVal.status }

    try {
      const res = await fetch(`/api/projects/${id}/tickets/new`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(ticket)
      })

      const msg = await res.json()

      appDispatch({ type: "message", show: true, msg: msg.msg, title: msgConext.success, context: msgConext.success })
    } catch (err) {
      appDispatch({ type: "message", show: true, msg: err.message, title: msgConext.danger, context: msgConext.danger })
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
  const [formVal, setForm] = useState({})

  const handleChange = e => {
    const target = e.target
    setForm(prev => ({ ...prev, [target.name]: target.value }))
  }

  return (
    <>
      <Page>
        <h1>Create Tickets</h1>
        <Form onSubmit={handleSubmit}>
          <Row>
            <InputGroup name="title" className="mb-3">
              <Form.Control onChange={e => handleChange(e)} placeholder="Title" name="title" aria-label="Title" />
            </InputGroup>
          </Row>

          <Row>
            <Editor
              initialValue={props.initialValue}
              value={value}
              onEditorChange={(newValue, editor) => setEditorValue(newValue)}
              // onInit={(evt, editor) => (editorRef.current = editor)}
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
                  <ListGroup.Item onChange={e => handleChange(e)} onClick={() => checker(index)} name="select_management_group">
                    {index}
                    <input type="checkbox" id="c1" class="chk-btn" style={{ opacity: "1", position: "relative", margin: "10px" }} checked={developer.isChecked} value={developer._id} />
                    <label for="c1">{developer.username}</label>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>

            <Col>
              <h1>Priority</h1>
              <Form.Select onChange={e => handleChange(e)} name="priority" aria-label="Default select example">
                {priority.map(s => (
                  <option value={s}>{s}</option>
                ))}
              </Form.Select>
              <h1>Status</h1>
              <Form.Select onChange={e => handleChange(e)} name="status" aria-label="Default select example">
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
