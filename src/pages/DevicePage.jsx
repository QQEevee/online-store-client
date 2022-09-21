import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import DeviceMain from '../components/DeviceMain'
import Error from '../components/Error'
import InfoComponent from '../components/InfoComponent'
import ReviewComponent from '../components/ReviewComponent'
import { fetchOneDevice } from '../http/deviceAPI'

export default observer(function DevicePage() {
  const [device, setDevice] = useState({ info: [] })
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchOneDevice(id)
      .then((data) => {
        setDevice(data)
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
    <Container className="mt-3">
      <h1>{device.name}</h1>
      <hr />
      <DeviceMain device={device} setDevice={setDevice} id={id} />

      <InfoComponent device={device} />
      <hr />
      <ReviewComponent id={id} />
    </Container>
  )
})
