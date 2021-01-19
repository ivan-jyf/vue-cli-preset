export const saveToLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorageData = key => JSON.parse(window.localStorage.getItem(key))

export const saveToSessionStorage = (key, value) => {
  window.sessionStorage.setItem(key, JSON.stringify(value))
}

export const getSessionStorageData = key => JSON.parse(window.sessionStorage.getItem(key))

export const removeSessionStorage = key => {
  const item = getSessionStorageData(key)
  if (item) {
    window.sessionStorage.removeItem(key)
  }
}

export const removeLocalStorage = key => {
  const item = getLocalStorageData(key)
  if (item) {
    window.localStorage.removeItem(key)
  }
}

export const clearAllLocalStorage = () => window.localStorage.clear()

export const clearAllSessionStorage = () => window.sessionStorage.clear()
