import axios from 'axios'

export async function fetchDogePrice() {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd')
    if (response.data && response.data.dogecoin && response.data.dogecoin.usd) {
      return Number(response.data.dogecoin.usd)
    }
    console.error('Invalid response format:', response.data)
    return 0
  } catch (error) {
    console.error('Error fetching Dogecoin price:', error.message)
    return 0
  }
}