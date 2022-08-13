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
  /* //!images not saving to database? */
  const [files, setFiles] = useState([])
  const [image, setImage] = useState("/upload.png")
  const [base64, setBase64] = useState("")

  const [managers, setManagers] = useState([])
  const [developers, setDevelopers] = useState([])
  const [matches, setMatch] = useState([])
  const [filter, setFilter] = useState()
  const [assigned, setAssigned] = useState()

  const appState = useContext(StateContext)
  const token = appState.user.token

  useEffect(() => {
    fileToBase64()
    getProjectMangers()
    // track state of files and run if updated
    console.log(appState)
  }, [files])

  useEffect(() => {
    setAssignedJob()
  }, [matches, managers])

  // filter developer
  useEffect(() => {
    handleDeveloperState()
  }, [filter])

  const editorRef = useRef(null)

  const handleSubmit = async event => {
    console.log("handleSubmit")
    event.preventDefault()
    const target = event.target
    const userId = localStorage.getItem("")
    // select managment group is 18
    console.log({ target })

    const project = { title: target[0].value, description: target[1].value, files: base64, category: target[17].value, createdBy: assigned._id, assigned: assigned._id, email: appState.user.email }

    console.log({ project })

    //  post data to db
    try {
      const res = await fetch("/api/projects/new", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(project)
      })

      console.log(res)
    } catch (error) {
      console.log(error)
    }
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

  const getProjectMangers = async () => {
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

    console.log({ managers })
    setDevelopersWithIsCheckedProperty(managers)
  }

  const setDevelopersWithIsCheckedProperty = async data => {
    let managers = data.map(data => {
      data.isChecked = false

      return data
    })

    setManagers(managers)
    setMatch(managers)
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
    const matches = managers.filter(developer => {
      return regex.test(developer.username)
    })
    setMatch(matches)
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
                <Form.Control placeholder="Select Management Group" aria-label="Username" aria-describedby="basic-addon1" value={filter} onChange={e => handleSelect(e)} />
              </InputGroup>
              {/* Group List */}
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
