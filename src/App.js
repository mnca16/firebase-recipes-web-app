import { useEffect, useState } from "react"
import FirebaseAuthService from "./FirebaseAuthService"
import LoginForm from "./Components/LoginForm"
import AddEditRecipeForm from "./Components/AddEditRecipeForm"
import "./App.css"
import FirebaseFirestoreService from "./FirebaseFirestoreService"

function App() {
  //Initialized user to null
  const [user, setUser] = useState(null)
  //render stored recipes in firebase data base
  const [recipes, setRecipes] = useState([])

  //call the data when the user states changes
  useEffect(() => {
    fetchRecipes()
      .then((fetchedRecipes) => {
        setRecipes(fetchedRecipes)
      })
      .catch((error) => {
        console.error(error.message)
        throw error
      })
  }, [user])

  //Detects when auth changes occurs and pass in the user being used
  FirebaseAuthService.subscribeToAuthChanges(setUser)

  //Fetch recipes from firebase using firebase methos
  async function fetchRecipes() {
    let fetchedRecipes = []

    try {
      const response = await FirebaseFirestoreService.readDocuments("recipes")
      console.log(response)
      console.log("Is this working???????????")
      const newRecipes = response.docs.map((recipeDoc) => {
        // console.log("inside newRecipes", recipeDoc.id)
        // console.log("inside newRecipes DATA", recipeDoc.data())
        const id = recipeDoc.id
        const data = recipeDoc.data()
        // console.log("inside newRecipes DATA variable", data)
        console.log(
          "inside of newRecipes DATA data.publishedData",
          (data.publishDate = new Date(data.publishedDate.seconds * 1000))
        )
        data.publishedDate = new Date(data.publishedDate.seconds * 1000)
        //console.log("inside newRecipes DATA variable # 2", data)
        return { ...data, id }
      })
      console.log("Is this working???????????")
      console.log("NEW RECIPES", newRecipes)

      fetchedRecipes = [...newRecipes]
    } catch (error) {
      console.error(error.message)
      throw error
    }
    return fetchedRecipes
  }

  //handle recipes on demand and updates the state
  async function handleFetchRecipes() {
    try {
      const fetchedRecipes = await fetchRecipes()
      setRecipes(fetchedRecipes)
    } catch (error) {
      console.error(error.message)
      throw error
    }
  }

  //handle when AddEditRecipeForm has create a new recipe
  async function handleAddRecipe(newRecipe) {
    try {
      const response = await FirebaseFirestoreService.createDocument(
        "recipes",
        newRecipe
      )

      //TODO: fetch new recipes from firestore, handle fetche recipes is going
      //to fire everytime a recipe is added
      handleFetchRecipes()

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
        <div className="center">
          <div className="recipe-list-box">
            {recipes && recipes.length > 0 ? (
              <div className="recipe-list">
                {recipes.map((recipe) => {
                  return (
                    <div className="recipecard" key={recipe.key}>
                      <div className="recipe-name">{recipe.name}</div>
                      <div className="recipe-field">
                        Category: {recipe.category}
                      </div>
                      <div className="class-field">
                        Publish Date: {recipe.publishDate.toSring()}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : null}
          </div>
        </div>
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
