import { $authHost, $host } from '.'

export const fetchReviews = async (deviceId) => {
  const { data } = await $host.get('api/review', { params: { deviceId } })
  return data
}

export const deleteReview = async (userId, deviceId) => {
  const { data } = await $authHost.delete('api/review', {
    data: { userId, deviceId },
  })
  return data
}

export const createReview = async (userId, deviceId, body) => {
  const { data } = await $authHost.post('api/review', {
    userId,
    deviceId,
    body,
  })
  return data
}

export const changeReview = async (userId, deviceId, body) => {
  const { data } = await $authHost.put('api/review', {
    userId,
    deviceId,
    body,
  })
  return data
}
