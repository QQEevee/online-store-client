import { Card, Col, Image } from 'react-bootstrap'
import star from '../assets/star.png'
import { useNavigate } from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/consts'
import { useContext } from 'react'
import { Context } from '..'

export default function DeviceItem({ deviceItem }) {
  const { device } = useContext(Context)
  const navigate = useNavigate()
  return (
    <Card
      className="pointer border-gray p-3 device__card"
      onClick={() => navigate(DEVICE_ROUTE + '/' + deviceItem.id)}
    >
      <div className="img">
        <img src={process.env.REACT_APP_API_URL + deviceItem.img} />
      </div>
      <div className="info">
        <div className="text-black-50 body d-flex justify-content-between align-items-center mt-1">
          <div className="text_over_hidden">
            {device.brands.find(({ id }) => id === deviceItem.brandId).name}
          </div>
          <div className="d-flex align-items-center">
            <div>{deviceItem.rating}</div>
            <Image width={18} height={18} src={star} />
          </div>
        </div>
        <div className="title text_over_hidden">{deviceItem.name}</div>
      </div>
    </Card>
  )
}
