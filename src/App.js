import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { useContext, useEffect, useState } from 'react'
import { Context } from '.'
import { check } from './http/userAPI'
import { Spinner } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import './styles/style.scss'

export default observer(function App() {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(data)
        user.setIsAuth(true)
        user.setIsAdmin(data.role === 'ADMIN')
      })
      .catch((error) => {
        user.setUser({})
        user.setIsAuth(false)
        user.setIsAdmin(false)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner animation={'grow'} />
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  )
})
