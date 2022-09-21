import { useEffect, useState } from 'react'
import { fetchOneDevice } from '../http/deviceAPI'
import { changeRating, fetchRating } from '../http/ratingAPI'
import '../styles/rating.scss'

export default function Rating({ setDevice, userId, deviceId, unauthorized }) {
  const rates = [1, 2, 3, 4, 5]
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  function mouseEnterHandler(e) {
    setHover(e.target.value)
  }
  function mouseLeaveHandler() {
    setHover(rating)
  }

  async function setRatingHandler(e) {
    const data = await changeRating({
      userId: userId,
      deviceId: deviceId,
      rate: e.target.value,
    })
    setRating(data.rate)
    setHover(data.rate)

    const updatedDevice = await fetchOneDevice(deviceId)
    setDevice(updatedDevice)
  }

  function setUsersRating() {
    fetchOneDevice(deviceId).then((data) => {
      setRating(data.rating)
      setHover(data.rating)
    })
  }

  useEffect(() => {
    if (unauthorized) {
      setUsersRating()
      return
    }
    fetchRating(userId, deviceId).then((data) => {
      if (data.rate) {
        setRating(data.rate)
        setHover(data.rate)
      } else {
        setUsersRating()
      }
    })
  }, [])

  if (!setDevice && rating === 0) {
    return <div>Нет оценки</div>
  }

  return (
    <div className="rating">
      <div className="rating__body">
        <div
          className="rating__active"
          style={{
            width: `${(hover / 5) * 100}%`,
          }}
        ></div>
        <div className="rating__items">
          {rates.map((rate) =>
            setDevice ? (
              <input
                key={rate}
                type="radio"
                className="rating__item"
                value={rate}
                name="rating"
                onMouseEnter={(e) => mouseEnterHandler(e)}
                onMouseLeave={mouseLeaveHandler}
                onChange={(e) => setRatingHandler(e)}
              />
            ) : (
              <div key={rate} className="rating__item"></div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
