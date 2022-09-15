import React, { useEffect } from "react"
import { Container } from "react-bootstrap"
import "./css/Page.css"

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | Chatter`
    window.scrollTo(0, 0)
  }, [props.title])

  return (
    <div className="page-container">
      <Container>{props.children}</Container>
    </div>
  )
}

export default Page
