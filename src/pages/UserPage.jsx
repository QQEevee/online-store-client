import { useState } from 'react'
import { useEffect } from 'react'
import { Card, Container, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import Error from '../components/Error'
import Rating from '../components/Rating'
import { getData } from '../http/userAPI'
import { DEVICE_ROUTE, USER_ROUTE } from '../utils/consts'
import '../styles/user.scss'

export default function UserPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    getData(id)
      .then((data) => {
        setUserData(data)
        setLoading(false)
      })
      .catch((error) => setError(error))
  }, [])

  if (error) {
    return <Error error={error} />
  }

  if (loading) {
    return <Spinner animation={'grow'} />
  }

  return (
    <Container className="mt-4">
      {!loading && (
        <div>
          <h2 className="page__title">
            Страница пользователя{' '}
            <span onClick={() => navigate(USER_ROUTE + '/' + id)}>#{id}</span>
          </h2>
          <p className="info">
            <b>email:</b> {userData.email}
          </p>
          <p
            className={'info ' + (userData.role === 'ADMIN' ? 'admin' : 'user')}
          >
            <b>Роль:</b> {userData.role}
          </p>
          <div>
            <h3 className="reviews__title">Отзывы</h3>
            {userData.review.map((review) => (
              <Card className="mb-4 p-2" key={review.id}>
                <div className="review__title">
                  <b>Название устройства:</b>{' '}
                  <span
                    onClick={() =>
                      navigate(DEVICE_ROUTE + '/' + review.device.id)
                    }
                    className="pointer link"
                  >
                    {review.device.name}
                  </span>
                </div>
                <div className="review__info d-flex align-items-center">
                  <b className="me-2">Оценка:</b>{' '}
                  <Rating userId={id} deviceId={review.deviceId} />
                </div>
                <div className="review__info">
                  <b>Отзыв:</b> {review.body}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </Container>
  )
}
