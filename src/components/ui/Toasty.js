/* Toast Alerts */

import Toast from "react-bootstrap/Toast"
import React from "react"

function Toasty(props) {
  const toggleShow = () => {
    props.setMsg(prev => ({ ...prev, show: !props.msg.show }))
  }
  return (
    <>
      {console.log(props.msg.context)}
      <Toast show={props.msg.show} onClose={toggleShow} bg={props.msg.context} position={props.position} style={{ position: "absolute", zIndex: "999" }} delay={3000} autohide>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{props.msg.title}</strong>
          {/* <small>11 mins ago</small> */}
        </Toast.Header>
        <Toast.Body>{props.msg.msg}</Toast.Body>
      </Toast>
    </>
  )
}

export default Toasty

/* 
How to use:

import msgConext from "../ui/helpers/toastyMessages"


const [msg, setMsg] = useState({
    show: false,
    poisiton: "center",
    msg: "",
    context: "",
    title: ""
  })


 setMsg({
        show: true,
        poisiton: "center",
        msg: err.message,
        title: "Error",
        context: msgConext.danger
      })


      <Toasty msg={msg} setMsg={setMsg} />
*/
