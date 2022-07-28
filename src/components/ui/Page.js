import React, { useEffect } from "react"
import { Container } from "react-bootstrap"
import "./css/Page.css"

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | Chatter`
    window.scrollTo(0, 0)
  }, [props.title])

  return <Container className="page-container">{props.children}</Container>
}

export default Page
