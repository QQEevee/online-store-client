import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Context } from '..'
import { changeRole, fetchUsers } from '../http/userAPI'

export default observer(function ListUsers() {
  const [search, setSearch] = useState('')
  const { user } = useContext(Context)

  function getFilteredSearch() {
    return user.users.filter((user) =>
      user.email.toLowerCase().includes(search.toLowerCase())
    )
  }

  async function changeRoleHandler(id, admin) {
    const role = admin ? 'USER' : 'ADMIN'
    await changeRole(id, role)
    const data = await fetchUsers()
    user.setUsers(data)
  }

  useEffect(() => {
    fetchUsers().then((data) => {
      user.setUsers(data)
    })
  }, [])

  return (
    <>
      <Form className="d-flex flex-column">
        <Form.Control
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Введите email пользователя"
        />
      </Form>
      {getFilteredSearch().map(
        (userItem) =>
          user.user.id !== userItem.id && (
            <Card className="mt-3 p-3" key={userItem.id}>
              <h4>id: {userItem.id}</h4>
              <h4>Email: {userItem.email}</h4>
              <h4 className="my-3">Роль: {userItem.role}</h4>
              <Button
                className="mt-2 p-2 wcontent"
                variant="primary"
                onClick={() =>
                  changeRoleHandler(userItem.id, userItem.role === 'ADMIN')
                }
              >
                {userItem.role === 'ADMIN'
                  ? 'Убрать роль админа'
                  : 'Выдать роль админа'}
              </Button>
            </Card>
          )
      )}
    </>
  )
})
