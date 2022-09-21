import { $authHost, $host } from '.'

export async function createBrand(brand) {
  const { data } = await $authHost.post('api/brand', brand)
  return data
}

export async function fetchBrands() {
  const { data } = await $host.get('api/brand')
  return data
}

export async function deleteBrand(id) {
  const { data } = await $authHost.delete('api/brand', { data: { id } })
  return data.status === 204
}

export const changeBrand = async (brand) => {
  const { data } = await $authHost.put('api/brand', brand)
  return data
}
