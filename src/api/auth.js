import Cookies from "js-cookie";
import axios from './index'

const AUTH_KEY = process.env.VUE_APP_FIREBASE_AUTH_API

export function loginWithFirebase(email, password) {
    const payload = {
        email,
        password,
        returnSecureToken: true
    }
    return axios({
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${AUTH_KEY}`,
        method: "post",
        data: payload
    })
}

export function signUpWithFirebase(email, password) {
    const payload = {
        email,
        password,
        returnSecureToken: true
    }
    return axios({
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${AUTH_KEY}`,
        method: "post",
        data: payload
    })
}

export function resetPasswordWithFirebase(email) {
    const payload = {
        email,
        requestType: "PASSWORD_RESET"
    }
    return axios({
        url: `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${AUTH_KEY}`,
        method: "post",
        data: payload
    })
}

export function getNewAccessToken() {
    const token = Cookies.get('refreshToken')
    const payload = {
        grant_type: "refresh_token",
        refresh_token: token
    }
    return axios({
        url: `https://securetoken.googleapis.com/v1/token?key=${AUTH_KEY}`,
        method: "post",
        data: payload
    })

}