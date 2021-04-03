import axios from 'axios'

const getData = (URL) => {
  return axios
    .get(URL)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err.message)
    })
}

export const fetchAllComplains = async () => {
  const data = await getData('/api/complains/getAllUserComplain')
  return data
}
