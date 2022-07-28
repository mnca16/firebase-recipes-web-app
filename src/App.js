import { useState } from "react"
import FirebaseAuthService from "./FirebaseAuthService"
import LoginForm from "./Components/LoginForm"
import "./App.css"

function App() {
  //Initialized user to null
  const [user, setUser] = useState(null)

  //Detects when auth changes occurs and pass in the user being used
  FirebaseAuthService.subscribeToAuthChanges(setUser)
  return (
    <div className="App">
      <div className="Title-row">
        <h1 className="title"> Firebase Recipes </h1>
        <LoginForm existingUser={user}></LoginForm>
      </div>
    </div>
  )
}

export default App
