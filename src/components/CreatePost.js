import { useNavigate, Navigate, useLocation } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
// import { useLocation } from "react-router"
/* Components */
import Navbar from "./Navbar"
import Page from "./Page"
/* Packages */
import swal from "sweetalert"
import { Formik } from "formik"
import * as yup from "yup"
import { Button, Dropdown, Form } from "react-bootstrap"
import "./css/CreatePost.css"

/* Context */
import StateContext from "../context/StateContext"
import Thumb from "./Thumb"

function CreatePost(props) {
  const history = useNavigate()
  const location = useLocation()

  const [file, setFile] = useState()

  console.log(props)
  /* global state */
  const appState = useContext(StateContext)

  function swalLoad() {
    swal({ text: "New Post", icon: "success", buttons: false, timer: 1500 })
  }

  async function handleCreatePost(values) {
    const createPost = values
    console.log(JSON.stringify(values))
    /* file uploads with data from front end. */
    // console.log(values.file.name)

    try {
      const res = await fetch("/posts/new", {
        method: "POST",
        headers: {
          "x-access-token": appState.user.token,
          "Content-type": "application/json"
        },
        body: JSON.stringify(createPost)
      })

      const postResponse = await res.json()

      console.log(postResponse)

      return swalLoad()
    } catch (error) {
      console.log(error)
    }
  }

  //  Validation

  const schema = yup.object().shape({
    category: yup.string(),
    title: yup.string().required("Please set a title!"),
    description: yup.string().required("Please set a description!"),
    file: yup.mixed()
  })

  const dropDownArray = ["General", "Engineer", "Product", "Support"]

  console.log(location)

  let createPostOption = localStorage.getItem("handleOptions")

  if (createPostOption == "Dashboard") {
    createPostOption = "General"
  }

  const dropDown = dropDownArray.filter(item => item != createPostOption)

  console.log(dropDown)
  return (
    <>
      <Navbar />
      <Page title="create post">
        <div id="bootstrap-overrides">
          <div className="create-post--center">
            <Formik
              validationSchema={schema}
              onSubmit={handleCreatePost}
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={{
                category: createPostOption,
                title: "",
                description: "",
                file: null
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => (
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                  {console.log(values)}
                  <div className="dropdown-formgroup">
                    <h1>Ask question in </h1>
                    {/* Drop down select */}
                    <Form.Group>
                      <Form.Select className="select-form" aria-label="Default select example" value={values.category} onChange={handleChange} name="category">
                        <option> {createPostOption}</option>
                        {dropDown.map(item => (
                          <option key={item} label={`${item}`} value={`${item}`} onChange={handleChange}>
                            {item}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </div>

                  <Form.Group className="mb-3 ">
                    {console.log(dropDownArray)}
                    <Form.Label>Title</Form.Label>
                    {/* Title */}
                    <Form.Control control="input" size="lg" type="text" name="title" placeholder="Post Title" value={values.title} onChange={handleChange} isValid={touched.lastName && !errors.lastName} isInvalid={!!errors.title} />

                    <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                  </Form.Group>
                  {/* Description */}
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description" rows={6} placeholder="description" value={values.description} onChange={handleChange} isValid={touched.lastName && !errors.lastName} isInvalid={!!errors.description} />
                    <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                  </Form.Group>

                  {/* File upload */}
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>File Upload</Form.Label>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      onChange={event => {
                        const fileReader = new FileReader()
                        fileReader.onload = () => {
                          if (fileReader.readyState === 2) {
                            setFieldValue("file", fileReader.result)
                          }
                        }
                        fileReader.readAsDataURL(event.target.files[0])
                        setFile(event.target.files[0])
                      }}
                      className="form-control"
                    />

                    {/* Thumbnail for files */}
                    <Thumb file={file} />
                  </Form.Group>

                  <Button type="submit">Sumbit</Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Page>
    </>
  )
}

export default CreatePost
