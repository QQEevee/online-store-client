import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { USER_ROUTE } from '../utils/consts'
import Rating from './Rating'

export default function ReviewCard({ review, children, rating }) {
  const navigate = useNavigate()

  return (
    <Card className="p-3 my-3 title card" key={review.id}>
      <div>
        <div
          onClick={() => navigate(USER_ROUTE + '/' + review.user.id)}
          className="pointer wcontent link"
        >
          #{review.user.id} {review.user.email} ({review.user.role})
        </div>{' '}
      </div>
      {rating && (
        <div className="d-flex">
          <div>Оценка: </div>
          <Rating userId={review.userId} deviceId={review.deviceId} />
        </div>
      )}
      <hr />
      <div className="body">{review.body}</div>
      {children}
    </Card>
  )
}
