import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { Context } from '..'
import {
  changeReview,
  createReview,
  deleteReview,
  fetchReviews,
} from '../http/reviewAPI'
import ReviewCard from './ReviewCard'
import '../styles/error.css'

export default function ReviewComponent({ id }) {
  const { user } = useContext(Context)

  const [reviews, setReviews] = useState([])
  const [userReview, setUserReview] = useState({})
  const [reviewBody, setReviewBody] = useState('')
  const [reviewEdit, setReviewEdit] = useState(false)
  const [error, setError] = useState('')

  async function handleDeleteReview() {
    const { status } = await deleteReview(user.user.id, id)
    if (status === 204) {
      setUserReview({})
    }
  }

  async function createReviewHandler(e) {
    e.preventDefault()
    if (reviewBody.trim().length === 0) {
      setError('Текст отзыва должен быть заполнен')
      return
    }
    let data
    if (reviewEdit) {
      data = await changeReview(user.user.id, id, reviewBody)
    } else {
      data = await createReview(user.user.id, id, reviewBody)
    }
    setUserReview(data)
    setReviewEdit(false)
  }

  function editHandler() {
    setReviewBody(userReview.body)
    setReviewEdit(true)
  }

  function changeReviewBodyHandler(e) {
    setReviewBody(e.target.value)
    setError('')
  }

  useEffect(() => {
    fetchReviews(id).then((data) => {
      if (user.user.id) {
        const indexUserReview = data.findIndex(
          (review) => review.user.id === user.user.id
        )

        if (indexUserReview > -1) {
          setUserReview(data[indexUserReview])
          data.splice(indexUserReview, 1)
        }
      }
      setReviews(data)
    })
  }, [])

  return (
    <Row className="d-flex flex-column my-3">
      <h1 className="mx-4">Отзывы</h1>
      {!user.isAuth &&
        Object.keys(userReview).length === 0 &&
        reviews.length === 0 && <h6 className="text_center">Нет отзывов</h6>}
      {user.isAuth &&
        (reviewEdit || Object.keys(userReview).length === 0 ? (
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                value={reviewBody}
                onChange={(e) => changeReviewBodyHandler(e)}
                type="text"
                placeholder="Введите текст отзыва"
              />
            </Form.Group>

            <div className="d-flex justify-content-end my-3">
              <div className="me-auto error">{error}</div>

              {reviewEdit && (
                <Button
                  className="mx-2"
                  variant="outline-danger"
                  onClick={() => setReviewEdit(false)}
                >
                  Отменить
                </Button>
              )}
              <Button
                variant="outline-primary"
                type="submit"
                onClick={(e) => createReviewHandler(e)}
              >
                {reviewEdit ? 'Подтвердить' : 'Оставить отзыв'}
              </Button>
            </div>
          </Form>
        ) : (
          <ReviewCard review={userReview}>
            <div className="d-flex justify-content-end">
              <Button
                onClick={handleDeleteReview}
                className="mx-2"
                variant="outline-danger"
              >
                Удалить
              </Button>
              <Button
                onClick={editHandler}
                variant="outline-primary"
                type="submit"
              >
                Редактировать
              </Button>
            </div>
          </ReviewCard>
        ))}

      {reviews.map((review) => (
        <ReviewCard rating={true} key={review.id} review={review} />
      ))}
    </Row>
  )
}
