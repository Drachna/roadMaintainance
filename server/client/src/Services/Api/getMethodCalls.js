
import axios from 'axios'
// import { get } from 'mongoose'

const getData = (URL) => {
  return axios
    .get(URL)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err.message);
      // return err.message
    })

}


export const fetchAllComplains = async () => {
  const data = await getData('/api/complains/getAllUserComplain')
  console.log(data);
  return data
}


export const getSpecificComplaint = async (id) => {
  const data = await getData(`/api/complains/getAllUserComplain/${id}`)
  return data

}