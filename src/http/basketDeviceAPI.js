import { $authHost } from '.'

export async function createBasketDevice(userId, deviceId) {
  const { data } = await $authHost.post('api/basket', { userId, deviceId })
  return data
}

export async function fetchBasketDevices(userId, page, limit) {
  const { data } = await $authHost.get('api/basket', {
    params: { id: userId, page, limit },
  })
  return data
}

export async function deleteBasketDevice(userId, deviceId) {
  const { data } = await $authHost.delete('api/basket', {
    data: { userId, deviceId },
  })
  return data
}

export async function checkBasketDevice(userId, deviceId) {
  const { data } = await $authHost.get('api/basket/check', {
    params: { userId: userId, deviceId },
  })
  return data
}
