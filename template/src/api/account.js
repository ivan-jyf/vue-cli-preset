import { makeRequest } from '@/utils/http/http'

export const refreshToken = () =>
  makeRequest({
    url: '/refresh-token',
    method: 'get'
  })
