/* eslint-disable no-plusplus */
export const setCookie = (
    name: string,
    value: string,
    daysToExpire: number = 365,
    path: string = '/',
  ) => {
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + daysToExpire)
  
    const cookieValue =
      encodeURIComponent(value) +
      (daysToExpire ? `; expires=${expirationDate.toUTCString()}` : '')
    document.cookie = `${name}=${cookieValue}; path=${path}`
  }
  
  export const getCookie = (name: string) => {
    const cookieString = document.cookie
    const cookies = cookieString.split('; ')
  
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=')
      const cookieName = cookie[0]
      const cookieValue = cookie[1]
  
      if (cookieName === name) {
        return decodeURIComponent(cookieValue)
      }
    }
  
    return null
  }
  
  export const removeCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  }