import firebase from "./FirebaseConfig"

//Instance of the auth object from the firebaseConfig file
const auth = firebase.auth() //This will generate the object

const registerUser = (email, password) => {
  // .createUserWithEmailAndPassword createas an email and password and returns a promise
  return auth.createUserWithEmailAndPassword(email, password)
}

const loginUser = (email, password) => {
  // also .signInWithEmailAndPassword returns a promise
  return auth.signInWithEmailAndPassword(email, password)
}

const logoutUser = () => {
  //relinquish your JWT from being able to be used ever again
  return auth.signOut()
}

const sendPasswordResetEmail = (email) => {
  return auth.sendPasswordResetEmail(email)
}

const loginWithGoogle = () => {
  //You can also use twitter of provider, Facebook, etc
  const provider = new firebase.auth.GoogleAuthProvider()

  return auth.signInWithPopup(provider)
}

//Takes a handle auth change callback function what will be executed
//when firebaseauth changes
const subscribeToAuthChanges = (handleAuthChanges) => {
  auth.onAuthStateChanged((user) => {
    handleAuthChanges(user)
  })
}

//wrapping functions together inside an object in order to be exported

const FirebaseAuthService = {
  registerUser,
  loginUser,
  logoutUser,
  sendPasswordResetEmail,
  loginWithGoogle,
  subscribeToAuthChanges,
}

export default FirebaseAuthService
