import axios from 'axios'

const putData=(URL,data)=>{
  return axios.put(URL, data)
    .then(res => {   
      return res.data
    })
    .catch(err => {
      console.log(err.message);
      // return err
    })
}

export const addUpvote = async (data) => {
  const res=putData('/api/complains/addUpvote',data)
  return res
  
}

export const addAction=async(data,id)=>{
  const res=putData(`/api/complains/addAction/${id}`,data)
  return res

}
