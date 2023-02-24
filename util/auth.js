import axios from "axios"

const API_KEY = 'AIzaSyBG9dsJRI1f3nQFRIBpKsaH_18HJ1QUiDo'

export const authenticate = async ({ mode, email, password }) => {
    
    const LogInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`
    const response = await axios.post(LogInUrl, {
        email: email,
        password: password,
        returnSecureToken: true
    })
    const token = response?.data?.idToken;
    return token;
}
export const createUser = ({ email, password }) => {
    return authenticate('signUp', email, password)
}

export const login = ({ email, password }) => {
    return authenticate('signInWithPassword', email, password)
}

