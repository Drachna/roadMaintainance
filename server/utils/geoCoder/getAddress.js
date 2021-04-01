
const axios = require('axios')


const getLocationDetatils = async (latitude, longitude) => {

  const params = {
    access_key: process.env.GEO_LOCATION_API_KEY,
    query: `${latitude},${longitude}`,
    limit: 2
  }
 
    return axios.get('http://api.positionstack.com/v1/reverse', { params })
    .then(response => {
      const nearestLocationAddress = []
      response.data.data.map(location => {
        if (location.confidence > 0.5) {
          const address = {
            location: location.label,
            distance: location.distance,
            confidence: location.confidence,
            locality: location.locality,
            state: location.region
          }
          nearestLocationAddress.push(address)
        }
      })
      return nearestLocationAddress
    })
    .catch(error=>{
      console.log(error.message);
    })

}

module.exports=getLocationDetatils