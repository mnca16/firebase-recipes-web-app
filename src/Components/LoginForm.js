import { useState } from "react"
import FirebaseAuthService from "../FirebaseAuthService"

//This is a login form rather than a user creation form
//I changed the registerUser function to loginUser
const LoginForm = ({ existingUser }) => {
  const [username, setUsername] = useState("")
  const [password, setPassWord] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      await FirebaseAuthService.loginUser(username, password)
      setUsername("")
      setPassWord("")
    } catch (error) {
      alert(error.message) //This message comes from firebase
    }
  }

  function handleLogout() {
    FirebaseAuthService.logoutUser()
  }

  return (
    <div className="Login-form-container">
      {existingUser ? (
        <div className="Row">
          <h3>Welcome, {existingUser.email}</h3>
          <button
            type="button"
            className="primary-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="Login-form">
          <label className="Input-label Login-label">
            Username (email):
            <input
              type="email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-text"
            />
          </label>
          <label className="Input-label Login-label">
            Password:
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassWord(e.target.value)}
              className="input-text"
            />
          </label>
          <div className="button-box">
            <button className="primary-button">Login</button>
          </div>
        </form>
      )}
    </div>
  )
}

export default LoginForm
