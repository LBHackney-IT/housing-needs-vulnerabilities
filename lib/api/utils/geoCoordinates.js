
/**
 * Fetch geo coordinates (latitude and longitude) from a postcode 
 * @param {*} postcode 
 */
export default async function geoCoordinates(postcode) {

  const url = `${process.env.ADDRESSES_API_URL}`;
  const apiKey = `${process.env.ADDRESSES_API_KEY}`;
  
  console.log("Looking for coordinates on : ", postcode.trim());
  const response = await fetch(`${url}?page=1&postcode=${postcode.trim()}&format=detailed`, {
    "method": "GET",
    "headers": {
      "x-api-key": apiKey
    }
  });

  if (response.ok) {
     return response.json().then((data)=>{
      const result = {
        lat: data.data.address[0].latitude,
        long: data.data.address[0].longitude
      }
      return result;
    });
  } else {
    console.error("GeoCoordinates failed: ", response.status);
  }

}