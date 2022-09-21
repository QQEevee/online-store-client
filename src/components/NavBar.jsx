import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { useContext } from 'react'
import { Context } from '../index'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
  BASKET_ROUTE,
  USER_ROUTE,
} from '../utils/consts'
import { observer } from 'mobx-react-lite'
import '../styles/navbar.scss'
import { useState } from 'react'
import QuerySettings from './QuerySettings'

export default observer(function NavBar() {
  const { user } = useContext(Context)
  const navigate = useNavigate()
  const [burger, setBurger] = useState('')
  const isPocketDevice = window.screen.width <= 768

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    user.setIsAdmin(false)
    localStorage.removeItem('token')
    navigate(SHOP_ROUTE)
  }

  const burgerHandle = () => {
    document.body.classList.toggle('overhidden')
    setBurger((prev) => !prev)
  }

  return (
    <Navbar className="nav__body" bg="dark" expand="lg">
      <div onClick={burgerHandle} className="menu pointer">
        <span></span>
      </div>
      <Container>
        <NavLink className="logo" to={SHOP_ROUTE}>
          КупиДевайс
        </NavLink>
        <nav className={'ml-auto navigation ' + (burger && 'active')}>
          {user.isAuth ? (
            <>
              <Button
                className=" wcontent"
                onClick={() => navigate(USER_ROUTE + '/' + user.user.id)}
                variant={'outline-light'}
              >
                Личный кабинет
              </Button>
              <Button
                className="wcontent"
                onClick={() => navigate(BASKET_ROUTE)}
                variant={'outline-light'}
              >
                Корзина
              </Button>
              {user.isAdmin && (
                <Button
                  onClick={() => navigate(ADMIN_ROUTE)}
                  className="wcontent"
                  variant={'outline-light'}
                >
                  Админ панель
                </Button>
              )}
              <Button
                className="wcontent outbtn"
                variant={'outline-light'}
                onClick={() => logOut()}
              >
                Выйти
              </Button>
            </>
          ) : (
            <Button
              variant={'outline-light'}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          )}
          {isPocketDevice && <QuerySettings />}
        </nav>
      </Container>
    </Navbar>
  )
})
