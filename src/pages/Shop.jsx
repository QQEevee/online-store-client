import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { Context } from '..'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import TypeBar from '../components/TypeBar'
import { fetchTypes } from '../http/typeAPI'
import { fetchBrands } from '../http/brandAPI'
import { fetchDevices } from '../http/deviceAPI'
import Pages from '../components/Pages'

export default observer(function Shop() {
  const { device } = useContext(Context)
  const [loading, setLoading] = useState(true)
  const isPocketDevice = window.screen.width <= 768

  useEffect(() => {
    device.setPage(1)
    fetchTypes().then((data) => device.setTypes(data))
    fetchBrands().then((data) => device.setBrands(data))
    fetchDevices(null, null, 1, device.limit).then((data) => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    fetchDevices(
      device.selectedTypes.map((selected) => (selected = selected.id)),
      device.selectedBrands.map((selected) => (selected = selected.id)),
      device.page,
      device.limit
    ).then((data) => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [device.page, device.selectedTypes, device.selectedBrands])

  if (loading) {
    return <Spinner animation={'grow'} />
  }

  if (isPocketDevice)
    return (
      <Container>
        <DeviceList devices={device.devices} />
        <Pages />
      </Container>
    )

  return (
    <Container>
      <Row className="mt-3">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList devices={device.devices} />
          <Pages />
        </Col>
      </Row>
    </Container>
  )
})
