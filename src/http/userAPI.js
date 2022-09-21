import { $authHost, $host } from './index'
import jwt_decode from 'jwt-decode'

export const registration = async (email, password) => {
  const usersResponse = await $host.get('api/user')
  const role = usersResponse.data.map(({ role }) => role).includes('ADMIN')
    ? undefined
    : 'ADMIN'
  const { data } = await $host.post('api/user/registration', {
    email,
    password,
    role,
  })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}
export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', {
    email,
    password,
  })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}
export const check = async () => {
  const { data } = await $authHost.get('api/user/auth')
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const getData = async (id) => {
  const { data } = await $host.get('api/user/' + id)
  return data
}

export const fetchUsers = async () => {
  const { data } = await $host.get('api/user')
  return data
}
export const changeRole = async (id, role) => {
  const { data } = await $authHost.put('api/user/role', { id, role })
  return data.status
}
