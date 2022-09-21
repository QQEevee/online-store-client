import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Context } from '..'
import { deleteDevice, fetchDevices } from '../http/deviceAPI'
import AdminListCard from './AdminListCard'
import EditDevice from './modals/EditDevice'

export default observer(function DeleteType({ show, onHide }) {
  const { device } = useContext(Context)
  const [search, setSearch] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [editDevice, setEditDevice] = useState({})

  useEffect(() => {
    fetchDevices().then((data) => {
      device.setDevices(data.rows)
    })
  }, [])

  async function deleteHandler(id) {
    const result = await deleteDevice(id)
    if (result) {
      const data = await fetchDevices()
      device.setDevices(data.rows)
    }
  }

  function openChangeModal(device) {
    setEditDevice(device)
    setModalVisible(true)
  }

  function getFilteredSearch() {
    return device.devices.filter((device) =>
      device.name.toLowerCase().includes(search.toLowerCase())
    )
  }

  return (
    <>
      <Form className="d-flex flex-column">
        <Form.Control
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Введите название устройства"
        />
        <Button
          className="my-2"
          variant="outline-success"
          onClick={() => openChangeModal({})}
        >
          Добавить новое устройство
        </Button>
        {getFilteredSearch().map((device) => (
          <AdminListCard
            key={device.id}
            deleteHandler={deleteHandler}
            openChangeModal={() => openChangeModal(device)}
            item={device}
          />
        ))}
      </Form>
      {modalVisible && (
        <EditDevice
          editDevice={editDevice}
          onHide={() => setModalVisible(false)}
        />
      )}
    </>
  )
})
