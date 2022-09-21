import { useContext, useState } from 'react'
import { Container, Card, Form, Button, Row } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { login, registration } from '../http/userAPI'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'
import '../styles/error.css'
import '../styles/auth.scss'

export default observer(function Auth() {
  const { user } = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  function changeEmailHandler(e) {
    setEmail(e.target.value)
    setEmailError('')
  }
  function changePasswordHandler(e) {
    setPassword(e.target.value)
    setPasswordError('')
  }

  const click = async () => {
    let isError = false
    if (email.trim().length === 0) {
      setEmailError('email обязательное поле')
      isError = true
    } else if (!validateEmail(email)) {
      setEmailError('Введен некорректный email')
      isError = true
    }
    if (password.length < 6) {
      setPasswordError('Пароль должен быть не менее 6 символов')
      isError = true
    }
    if (isError) {
      return
    }
    try {
      let data
      if (isLogin) {
        data = await login(email, password)
      } else {
        data = await registration(email, password)
      }
      user.setUser(data)
      user.setIsAuth(true)
      user.setIsAdmin(data.role === 'ADMIN')
      navigate(SHOP_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center auth__container">
      <Card className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            value={email}
            onChange={(e) => changeEmailHandler(e)}
            className="mt-3"
            placeholder="Введите ваш email..."
          />
          <div className="error">{emailError}</div>
          <Form.Control
            value={password}
            onChange={(e) => changePasswordHandler(e)}
            className="mt-3"
            placeholder="Введите ваш пароль..."
            type="password"
          />
          <div className="error">{passwordError}</div>
          <Row className="d-flex justify-content-between my-3 ">
            {isLogin ? (
              <div className="wcontent">
                Нет аккаунта?{' '}
                <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
              </div>
            ) : (
              <div className="wcontent">
                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
              </div>
            )}

            <Button
              onClick={(e) => {
                e.preventDefault()
                click()
              }}
              type="submit"
              className="mx-3 wcontent"
              variant="outline-success"
            >
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  )
})

function validateEmail(email) {
  var re =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  return re.test(String(email).toLowerCase())
}
