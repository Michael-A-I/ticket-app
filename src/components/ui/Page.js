import React, { useEffect } from "react"
import { Container } from "react-bootstrap"
import "./css/Page.css"

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | Chatter`
    // console.log(props.padding)
    window.scrollTo(0, 0)
  }, [props.title])

  return (
    <div style={props.style} className="page-container">
      <Container>{props.children}</Container>
    </div>
  )
}

export default Page
