import React, { useEffect } from "react"
import { Container } from "react-bootstrap"

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | Chatter`
    window.scrollTo(0, 0)
  }, [props.title])

  return <Container>{props.children}</Container>
}

export default Page
