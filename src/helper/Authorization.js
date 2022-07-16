/* Function to be used in every useEffect componenet to check if user is authorized and if not navigate to /login */
/* TODO: get this to work */
import { useNavigate } from "react-router"
async function Authorization() {
  const history = useNavigate()
  try {
    const token = localStorage.getItem("token")
    const res = await fetch("/api/isUserAuth", {
      headers: {
        "x-access-token": token
      }
    })
    const data = await res.json()
    console.log(data.isLoggedIn)
    console.log("Is person logged in? = " + JSON.stringify(data))

    // user data passed through application
    /* If user is already authenticated and they try to acess page */
    return data.isLoggedIn ? null : history("/login")
  } catch (error) {
    console.log("islogged in?:" + error)
  }
}

export default Authorization
