import { $authHost, $host } from '.'

export const changeRating = async (rating) => {
  const { data } = await $authHost.put('api/rating', rating)
  return data
}

export const fetchRating = async (userId, deviceId) => {
  const { data } = await $host.get('api/rating', {
    params: { userId, deviceId },
  })
  return data
}
