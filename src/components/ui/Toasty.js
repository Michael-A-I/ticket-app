import Toast from "react-bootstrap/Toast"
import React, { useContext } from "react"
import DispatchContext from "../../context/DispatchContext"
import StateContext from "../../context/StateContext"

function Toasty(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const toggleShow = () => {
    appDispatch({ type: "message", show: false, poisiton: "center", msg: "", title: "", context: "" })
    // props.setMsg(prev => ({ ...prev, show: !props.msg.show }))
  }

  return (
    <>
      <Toast show={appState.message.show} onClose={toggleShow} bg={appState.message.context} position={appState.message.position} style={{ position: "absolute", zIndex: "999" }} delay={3000} autohide>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{appState.message.title}</strong>
          {/* <small>11 mins ago</small> */}
        </Toast.Header>
        <Toast.Body>{appState.message.msg}</Toast.Body>
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
