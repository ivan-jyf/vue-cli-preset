import { getLocalStorageData, removeLocalStorage, saveToLocalStorage } from '@/utils/storageUtils'
import { TOKEN } from '@/constants/storage'

export const clearToken = () => {
  removeLocalStorage(TOKEN)
}

export const getToken = () => getLocalStorageData(TOKEN)

export const setToken = token => {
  saveToLocalStorage(TOKEN, token)
}
