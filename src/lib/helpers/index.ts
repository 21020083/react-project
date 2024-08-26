/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookie, removeCookie, setCookie } from '../helpers/cookie'

const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'

export const getAccessToken = (): string | null => {
  return getCookie(ACCESS_TOKEN) || null
}

export const getRefreshToken = (): string | null => {
  return getCookie(REFRESH_TOKEN) || null
}

export const setAccessToken = (token: string) => {
  setCookie(ACCESS_TOKEN, token, 1)
}

export const setRefreshToken = (token: string) => {
  setCookie(REFRESH_TOKEN, token, 7)
}

export const removeAccessToken = () => {
  removeCookie(ACCESS_TOKEN)
}

export const removeRefreshToken = () => {
  removeCookie(REFRESH_TOKEN)
}

export const isMathRouter = (
  pathName: string,
  routers: (RegExp | string)[],
): boolean => {
  return routers.some((item) => {
    if (typeof item === 'string') {
      if (!item.includes(':')) return item === pathName
      const pathNameArray = pathName
        .split('/')
        .filter((itemPathName) => itemPathName)
      const routerArray = item.split('/').filter((itemRouter) => itemRouter)

      if (pathNameArray.length !== routerArray.length) return false

      return routerArray.every((value, index) =>
        value.includes(':') ? true : value === pathNameArray[index],
      )
    }

    return item.test(pathName)
  })
}

export const compareObject = <DataType extends object>(
  objA: { [key: string]: any },
  objB: { [key: string]: any },
  compareKeys?: (keyof DataType)[],
): boolean => {
  let keysToCompare = Object.keys(objA) as (keyof DataType)[]
  if (compareKeys) {
    keysToCompare = [...compareKeys]
  }

  return keysToCompare.every(
    (compareKey) => (objA as any)[compareKey] === (objB as any)[compareKey],
  )
}

export const replaceLink = (pathName: string, ...data: string[]): string => {
  let res = pathName
  const params = pathName
    .split('/')
    .filter((item) => item && item.includes(':'))

  data.forEach((value, index) => {
    res = res.replace(params[index], value)
  })

  return res
}
