const getToken = (url: string) => async (username: string) => {
  try {
    const response = await fetch(`${url}/token?username=${username}`)
    const data = await response.json()
    return data
  } catch (err) {
    console.log('API ERROR:', err)
  }
}

export default getToken