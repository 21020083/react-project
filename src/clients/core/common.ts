import { ReactNode } from 'react'

export interface FilterParams {
  [key: string]: string | number | undefined | number[] | string[]
}

export type OrderType = 'asc' | 'desc'

export type ValueOf<T> = Required<T>[keyof T]

export type OptionType = {
  label: ReactNode | string
  value: string | number
  isDisabled?: boolean
}

export type OptionRadioType = {
  label: ReactNode | string
  value: string | number | boolean
  isDisabled?: boolean
}

export type TinyInteger = 0 | 1

export type SelectOptions = OptionType[]

export type RadioOptions = OptionRadioType[]

export type RequestError = {
  status?: string | number
  errors?: {
    [key: string]: string
  }
  message?: string
}

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface ApiResponse<T> {
  status: boolean
  data: T
  message?: string
  errors?: {
    [key: string]: string
  }
}

export interface PaginationData<T> {
  records: T[]
  page: number
  limit: number
  totalPages: number
  totalDocs: number
  isPrePage: boolean
  isNextPage: boolean
}

/** Component configs */
export interface LayoutConfig {
  title?: string
}
export type LayoutConfigs = Readonly<{
  [key: string]: LayoutConfig
}>
