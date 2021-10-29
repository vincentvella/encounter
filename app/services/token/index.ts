const getToken = (url: string) => async (username: string) => {
  try {
    const response = await fetch(`${url}/token?username=${username}`)
    const data = await response.json()
    return data
  } catch (err) {
    console.log('API ERROR:', err)
  }
}

const url = 'https://762a-24-239-66-217.ngrok.io'

const token = {
  get: getToken(url)
}

export default token