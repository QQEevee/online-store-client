import Admin from './pages/Admin'
import Auth from './pages/Auth'
import Basket from './pages/Basket'
import DevicePage from './pages/DevicePage'
import Shop from './pages/Shop'
import UserPage from './pages/UserPage'
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  USER_ROUTE,
} from './utils/consts'

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
]

export const authRoutes = [
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
]

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: DEVICE_ROUTE + '/:id',
    Component: DevicePage,
  },
  {
    path: USER_ROUTE + '/:id',
    Component: UserPage,
  },
]
