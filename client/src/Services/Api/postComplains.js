import axios from 'axios'

export const createComplain = async (data) => {
  return axios.post('/api/complains/createUserComplain', data)
    .then(res => {
      return res.data
    })
    .catch(err => {
      return err
    })
}


