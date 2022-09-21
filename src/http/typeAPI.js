import { $authHost, $host } from './index'

export const createType = async (type) => {
  const { data } = await $authHost.post('api/type', type)
  return data
}

export const fetchTypes = async (search) => {
  const { data } = await $host.get('api/type', { params: { search } })
  return data
}

export const deleteType = async (id) => {
  const { data } = await $authHost.delete('api/type', { data: { id } })
  return data.status === 204
}

export const changeType = async (type) => {
  const { data } = await $authHost.put('api/type', type)
  return data
}
