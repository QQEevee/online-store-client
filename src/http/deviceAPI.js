import { $authHost, $host } from '.'

export async function createDevice(device) {
  const { data } = await $authHost.post('api/device', device)
  return data
}

export async function fetchDevices(typeId, brandId, page, limit = 5) {
  const { data } = await $host.get('api/device', {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  })
  return data
}

export async function fetchOneDevice(id) {
  const { data } = await $host.get('api/device/' + id)
  return data
}

export const deleteDevice = async (id) => {
  const { data } = await $authHost.delete('api/device', { data: { id } })
  return data.status === 204
}

export const changeDevice = async (device) => {
  const { data } = await $authHost.put('api/device', device)
  return data
}
