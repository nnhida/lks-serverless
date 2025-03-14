import axios from 'axios'
import router from '@/router'

const axiosIns = axios.create({
// You can add your headers here
// ================================
  // baseURL: import.meta.env.VITE_BASE_API_URL,
//   headers: {
//     "Authorization": import.meta.env.VITE_API_TOKEN,
//     "Deviceid": import.meta.env.VITE_DEVICE_ID,
//     "Content-Type": "application/json",
//  },
});


// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
axiosIns.interceptors.request.use(config => {
  // Retrieve token from localStorage
  const token = localStorage.getItem('accessToken')
  config.headers = config.headers || {};

  // If token is found
  if (token) {
    // Get request headers and if headers is undefined assign blank object
    // config.headers = config.headers || {}

    // Set authorization header
    // ℹ️ JSON.parse will convert token to string
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  } else {
    config.headers.Authorization = import.meta.env.VITE_API_TOKEN;
  }
  config.headers.DeviceId = import.meta.env.VITE_DEVICE_ID;

  // Return modified config
  return config
});

// ℹ️ Add response interceptor to handle 401 response
axiosIns.interceptors.response.use(response => {
  return response
}, error => {
  console.log(error)
  // Handle error
  // if (error.response.status === 401) {
  //   // ℹ️ Logout user and redirect to login page
  //   // Remove "userData" from localStorage
  //   localStorage.removeItem('userData')

  //   // Remove "accessToken" from localStorage
  //   localStorage.removeItem('accessToken')
  //   localStorage.removeItem('userAbilities')

  //   // If 401 response returned from api
  //   router.push('/login')
  // }
  // else {
  //   return Promise.reject(error)
  // }
})
export default axiosIns
