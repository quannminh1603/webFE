// import axios from "axios"

// export const getConfig = async () => {
//   const res = await axios.get(`${process.env.REACT_APP_API_KEY}/payment/config`)
//   return res.data
// }

// test
import axios from "axios"

export const getConfig = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/payment/config`, )
  // console.log('data', data)
  console.log('res.data', res.data)
  return res.data
}