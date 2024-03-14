const storeToken = (token: any) => {
  localStorage.setItem('token', token)
}

const getToken = () => {
  return localStorage.getItem('token')
}

const sendRequestWithToken = async (url: any, method: any, body: any) => {
  const token = getToken()
  if (!token) {
    console.error('Token not found. User not logged in.')
    return null
  }

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    const data = await response.json()
    return data
  } catch (error: any) {
    console.error('Error sending request:', error.message)
    return null
  }
}

const login = async (email: string, password: string) => {
  try {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    const data = await response.json()

    if (data.token) {
      storeToken(data.token)
      console.log('Login successful')
      return true
    } else {
      console.error('Login failed:', data.error)
      return false
    }
  } catch (error: any) {
    console.error('Error during login:', error.message)
    return false
  }
}

// Ejemplo de cómo enviar una solicitud al servidor con el token adjunto
const fetchData = async () => {
  const response = await sendRequestWithToken('https://localhost:3000/api/users', 'GET', null)
  if (response) {
    console.log('Data received:', response)
  } else {
    console.error('Failed to fetch data.')
  }
}

fetchData()
