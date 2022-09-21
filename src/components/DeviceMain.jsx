import { useContext } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Context } from '..'
import useBasketChanger from '../hooks/basketChanger'
import Rating from './Rating'
import '../styles/device.scss'

export default function DeviceMain({ device, setDevice, id }) {
  const { user } = useContext(Context)
  const [handleOnBasket, inBasket] = useBasketChanger(device, id)

  return (
    <div className="d-flex device__body">
      {device.img && (
        <div className="img">
          <img src={process.env.REACT_APP_API_URL + device.img} />
        </div>
      )}
      <Card className="d-flex flex-column align-items-center justify-content-around info__card">
        <h3>От: {device.price} руб.</h3>

        <div className="d-flex flex-column align-items-center">
          <Rating
            unauthorized={!user.isAuth}
            setDevice={user.isAuth ? setDevice : null}
            userId={user.user.id}
            deviceId={id}
          />
          {device.rating > 0 && (
            <h3 className="mx-2 title">
              Пользовательский рейтинг: {device.rating.toFixed(1)}
            </h3>
          )}
        </div>

        {user.isAuth && (
          <Button onClick={() => handleOnBasket()} variant="outline-dark">
            {inBasket ? 'Удалить из корзины' : 'Добавить в корзину'}
          </Button>
        )}
      </Card>
    </div>
  )
}
