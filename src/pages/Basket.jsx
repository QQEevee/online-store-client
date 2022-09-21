import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { Context } from '..'
import DeviceList from '../components/DeviceList'
import { fetchBasketDevices } from '../http/basketDeviceAPI'
import { fetchBrands } from '../http/brandAPI'
import Pages from '../components/Pages'

export default observer(function Basket() {
  const { user, device } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    device.setPage(1)
    fetchBrands().then((data) => device.setBrands(data))
  }, [])
  useEffect(() => {
    fetchBasketDevices(user.user.id, device.page, device.limit).then((data) => {
      user.setDevices(data.rows.map(({ device }) => device))
      device.setTotalCount(data.count)
      setLoading(false)
    })
  }, [device.page])

  if (loading) {
    return <Spinner animation={'grow'} />
  }

  return (
    <Container>
      <h2 className="mt-3">Корзина</h2>
      <DeviceList devices={user.devices} />
      <Pages />
    </Container>
  )
})
