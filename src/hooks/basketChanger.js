import { useContext, useEffect, useState } from 'react'
import { Context } from '..'
import {
  checkBasketDevice,
  createBasketDevice,
  deleteBasketDevice,
  fetchBasketDevices,
} from '../http/basketDeviceAPI'

export default function useBasketChanger(device, id) {
  const { user } = useContext(Context)
  const [inBasket, setInBasket] = useState(false)

  async function checkInBasket() {
    const d = await checkBasketDevice(user.user.id, id)
    return !!d
  }

  async function handleOnBasket() {
    if (inBasket) {
      const { status } = await deleteBasketDevice(user.user.id, device.id)
      status === 204 && user.setDevices(await fetchBasketDevices(user.user.id))
    } else {
      const data = await createBasketDevice(user.user.id, id)
      data && user.setDevices(await fetchBasketDevices(user.user.id))
    }
    checkInBasket().then((inBasket) => setInBasket(inBasket))
  }

  useEffect(() => {
    if (!user.isAuth) {
      return
    }
    fetchBasketDevices(user.user.id).then((data) => {
      user.setDevices(data)
      checkInBasket().then((inBasket) => setInBasket(inBasket))
    })
  }, [device])

  return [handleOnBasket, inBasket]
}
