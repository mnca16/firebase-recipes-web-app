import { useState } from "react"
import FirebaseAuthService from "./FirebaseAuthService"
import LoginForm from "./Components/LoginForm"
import AddEditRecipeForm from "./Components/AddEditRecipeForm"
import "./App.css"
import FirebaseFirestoreService from "./FirebaseFirestoreService"

function App() {
  //Initialized user to null
  const [user, setUser] = useState(null)

  //Detects when auth changes occurs and pass in the user being used
  FirebaseAuthService.subscribeToAuthChanges(setUser)

  //handle when AddEditRecipeForm has create a new recipe
  async function handleAddRecipe(newRecipe) {
    try {
      const response = await FirebaseFirestoreService.createDocument(
        "recipes",
        newRecipe
      )

      //TODO: fetch new recipes from firestore
      alert(`succesfully created a recipe with an ID = ${response.id}`)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="App">
      <div className="Title-row">
        <h1 className="title"> Firebase Recipes </h1>
        <LoginForm existingUser={user}></LoginForm>
      </div>
      <div className="main">
        {user ? (
          <AddEditRecipeForm
            handleAddRecipe={handleAddRecipe}
          ></AddEditRecipeForm>
        ) : null}
      </div>
    </div>
  )
}

export default App
