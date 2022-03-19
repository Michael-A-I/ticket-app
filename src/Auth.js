import React from "react"
import axios from "axios"

function Auth() {
  //get user input and send to server.
  const auth = async () => {
    try {
      const res = await axios.get("/authenticate", { auth: { username: "admin", password: "123" } })
      console.log(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  return <>Auth</>
}

export default Auth
