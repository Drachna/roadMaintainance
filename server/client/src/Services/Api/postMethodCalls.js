import axios from 'axios'

const postData=(URL,data)=>{
  return axios.post(URL, data)
    .then(res => {
      return res.data
    })
    .catch(err => {
      return err
    })
}

export const register = async (data) => {
  const res=postData('/api/officer/addOfficer',data)
  return res
}

export const login = async (data) => {
  const res= postData('/api/officer/loginOfficer',data)
  return res
}

export const createComplain = async (data) => {
  const res=postData('/api/complains/createUserComplain',data)
  return res
}