import axios from 'axios'

export const createComplain = async (data) => {
  return axios.post('/api/complains/createUserComplain', data)
    .then(res => {
      console.log(res.data);
      return res.data
  
    })
    .catch(err => {
      console.log(err);
      return err
    })
}


