import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Configurar límite para imágenes grandes (base64 puede ser grande)
api.defaults.maxContentLength = 50 * 1024 * 1024 // 50MB
api.defaults.maxBodyLength = 50 * 1024 * 1024 // 50MB

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('Request Error:', error)

    // Manejo de errores específicos
    if (error.response) {
      console.error('Response error:', error.response.data)
      return Promise.reject(error.response.data)
    } else if (error.request) {
      console.error('No response received:', error.request)
      return Promise.reject({
        error: 'Cannot connect to server',
      })
    } else {
      console.error('Request error:', error.message)
      return Promise.reject({
        error: 'Configuration request error.',
      })
    }
  },
)

// users
export async function getRandomUser() {
  try {
    const response = await api.get('/chat/random-user')
    return response
  } catch (error) {
    console.error('Error to get a random user:', error)
    return {
      success: false,
      user: 'Usuario',
      error: error.error || 'Unknown error.',
    }
  }
}

// Photos
export async function getPhotos(page = 0, limit = 20) {
  try {
    const response = await api.get('/photos', {
      params: { page, limit },
    })
    return response
  } catch (error) {
    console.error('Error getting photos:', error)
    return {
      success: false,
      photos: [],
      total: 0,
      page,
      totalPages: 0,
      error: error.error || 'Error to load photos',
    }
  }
}

export async function uploadPhoto(user, base64) {
  try {
    if (!base64.startsWith('data:image/')) {
      throw new Error('The file isnt a valid image')
    }

    const response = await api.post('/photos', { user, base64 })
    return response
  } catch (error) {
    console.error('Error at upload the image:', error)
    return {
      success: false,
      photo: null,
      error: error.error || 'Error at upload the image',
    }
  }
}

// Messages
export async function getMessages(limit = 5) {
  try {
    const response = await api.get('/chat', {
      params: { limit },
    })
    return response
  } catch (error) {
    console.error('Error getting messages:', error)
    return {
      success: false,
      messages: [],
      total: 0,
      error: error.error || 'Error at load messages',
    }
  }
}

export async function sendMessage(user, text) {
  try {
    if (!text || text.trim().length === 0) {
      throw new Error('The message cannot be empty')
    }
    const response = await api.post('/chat', {
      user,
      text: text.trim(),
    })
    return response
  } catch (error) {
    console.error('Error sending message:', error)
    return {
      success: false,
      message: null,
      error: error.error || 'Error sending message',
    }
  }
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('The file must be and image'))
      return
    }

    // Validar tamaño máximo (10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      reject(new Error('The image its to large (Maximum 10MB)'))
      return
    }

    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })
}

//  Utilities

export async function checkServerHealth() {
  try {
    const response = await api.get('/health')
    console.log('response', response)
    return response
  } catch (error) {
    console.error('Error verifying server status:', error)
    return {
      status: 'ERROR',
      message: 'Cannot connect with server',
      error: error.error || 'Connection error',
    }
  }
}

export async function getStorageStatus() {
  try {
    const response = await axios.get('http://localhost:3000/api/storage-status')
    return response.data
  } catch (error) {
    console.error('Error getting storage status:', error)
    return null
  }
}

export default {
  getRandomUser,
  getPhotos,
  uploadPhoto,
  getMessages,
  sendMessage,
  fileToBase64,
  checkServerHealth,
  getStorageStatus,
}
