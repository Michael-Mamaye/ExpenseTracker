import axios from "axios"

const API_KEY = 'AIzaSyBG9dsJRI1f3nQFRIBpKsaH_18HJ1QUiDo'

export const authenticate = async ({ mode, email, password }) => {
    const LogInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`
    const response = await axios.post(LogInUrl, {
        email: email,
        password: password,
        returnSecureToken: true
    })

    console.log(response.data)

}
export const createUser = async ({ email, password }) => {
    await authenticate('signUp', email, password)
}

export const login = async ({ email, password }) => {
    await authenticate('signInWithPassword', email, password)
}

