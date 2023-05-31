import axios from 'axios'

// cos we are dealing with cookies, so can send cookies back to server 
// and check token we are sending in the backend
axios.defaults.withCredentials = true 

//4 functions below

// happens on registration, take the data and send post request to backend
export async function onRegistration(registrationData) {
  return await axios.post(
    'http://localhost:8000/api/register',
    registrationData
  )
}

// take login button and send post request to backend
export async function onLogin(loginData) {
  return await axios.post('http://localhost:8000/api/login', loginData)
}

// take logout button and send get request to backend
export async function onLogout() {
  return await axios.get('http://localhost:8000/api/logout')
}

// fetch protected info in dashboard page, if this function fail cannot see protected info and force logout user
export async function fetchProtectedInfo() {
  return await axios.get('http://localhost:8000/api/protected')
}