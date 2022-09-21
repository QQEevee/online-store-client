import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Context } from '../index'
import { adminRoutes, authRoutes, publicRoutes } from '../routes'

export default observer(function AppRouter() {
  const { user } = useContext(Context)
  return (
    <Routes>
      {user.isAdmin &&
        adminRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
})
