import React from "react"
import { Col, Row, Input, Button } from "reactstrap"

function Pagination(props) {
  /* Pagination */
  const onChangeInSelect = event => {
    props.setPageSize(Number(event.target.value))
  }

  const onChangeInInput = event => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0
    props.gotoPage(page)
  }

  return (
    <>
      {/* Pagination */}
      <Row style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <Col md={3}>
          <Button color="primary" onClick={() => props.gotoPage(0)} disabled={!props.canPreviousPage}>
            {"<<"}
          </Button>
          <Button color="primary" onClick={props.previousPage} disabled={!props.canPreviousPage}>
            {"<"}
          </Button>
        </Col>
        <Col md={2} style={{ marginTop: 7 }}>
          Page{" "}
          <strong>
            {props.pageIndex + 1} of {props.pageOptions.length}
          </strong>
        </Col>
        <Col md={2}>
          <Input type="number" min={1} style={{ width: 70 }} max={props.pageOptions.length} defaultValue={props.pageIndex + 1} onChange={onChangeInInput} />
        </Col>
        <Col md={2}>
          <Input type="select" value={props.pageSize} onChange={onChangeInSelect}>
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Input>
        </Col>
        <Col md={3}>
          <Button color="primary" onClick={props.nextPage} disabled={!props.canNextPage}>
            {">"}
          </Button>
          <Button color="primary" onClick={() => props.gotoPage(props.pageCount - 1)} disabled={!props.canNextPage}>
            {">>"}
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default Pagination
