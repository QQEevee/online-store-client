import { observer } from 'mobx-react-lite'
import { Row } from 'react-bootstrap'
import DeviceItem from './DeviceItem'
import '../styles/device-item.scss'

export default observer(function DeviceList({ devices }) {
  return (
    <Row className="flex-container">
      {devices.map((device) => (
        <DeviceItem key={device.id} deviceItem={device} />
      ))}
    </Row>
  )
})
