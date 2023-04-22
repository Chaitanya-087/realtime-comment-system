import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from './firebase'

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
    try {
        const userCredential = await signInWithPopup(auth, googleProvider)
        return { user: userCredential.user, error: null }
    } catch (error) {
        return { user: null, error: error.message }
    }
}

export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        return { user: userCredential.user, error: null }
    } catch (err) {
        return { user: null, error: err.message }
    }
}

export const signup = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        return { user: userCredential.user, error: null }
    } catch (error) {
        return { user: null, error: error.message }
    }
}

export const logout = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        console.log(error)
    }
}

export const authListener = (callback) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            callback(user)
        } else {
            callback(null)
        }
    })
    return unsubscribe
}
