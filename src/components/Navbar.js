import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"

export function Navbar() {
  const history = useNavigate()

  const [user, setUser] = useState(null)
  console.log(user)
  async function logout() {
    localStorage.removeItem("token")

    await history("/login")
  }

  useEffect(() => {
    fetch("/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => (data.isLoggedIn ? setUser(data.user) : null))
  }, [])

  //expose user object for use in the nav.

  return (
    <div>
      <Link to="/home">Home</Link>
      {user ? (
        <div>
          <Link to={"/u/" + user.id}>Profile</Link>
          <div onClick={logout}>Logout</div>
          <Link to="/posts/new">Create Post</Link>
          {/* create case form */}
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  )
}
