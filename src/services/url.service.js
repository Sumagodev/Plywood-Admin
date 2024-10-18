
//local url 
// const url = "http://localhost:3016"
// const url = "http://192.168.0.37:3016"
// const url = "https://api.plywoodbazar.com/test"
const url = "https://api.plywoodbazar.com"


export const generateFilePath = (fileName) => {
  return `${url}/uploads/${fileName}`
}


export default url
