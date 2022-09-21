import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Context } from '..'
import { fetchDevices } from '../http/deviceAPI'
import { deleteType, fetchTypes } from '../http/typeAPI'
import AdminListCard from './AdminListCard'
import EditType from './modals/EditType'
import ModalComponent from './modals/ModalComponent'

export default observer(function ListType() {
  const { device } = useContext(Context)
  const [search, setSearch] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [warningVisible, setWarningVisible] = useState(false)
  const [editType, setEditType] = useState({})
  const [warningDevices, setWarningDevices] = useState([])

  useEffect(() => {
    fetchTypes().then((data) => {
      device.setTypes(data)
    })
  }, [])

  async function deleteHandler(id) {
    const result = await deleteType(id)
    if (result) {
      const dataTypes = await fetchTypes()
      device.setTypes(dataTypes)
      const dataDevices = await fetchDevices()
      device.setDevices(dataDevices.rows)

      setWarningDevices([])
      setWarningVisible(false)
    }
  }

  function getFilteredSearch() {
    return device.types.filter((type) =>
      type.name.toLowerCase().includes(search.toLowerCase())
    )
  }

  function openChangeModal(type) {
    setEditType(type)
    setModalVisible(true)
  }

  function openWarningModal(id) {
    const warningList = device.devices.filter((device) => device.typeId === id)
    if (warningList.length === 0) {
      deleteHandler(id)
    } else {
      setWarningDevices(warningList)
      setWarningVisible(true)
    }
  }

  return (
    <>
      <Form className="d-flex flex-column">
        <Form.Control
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Введите название типа"
        />
        <Button
          className="my-2"
          variant="outline-success"
          onClick={() => openChangeModal({})}
        >
          Добавить новый тип
        </Button>
        {getFilteredSearch().map((type) => (
          <AdminListCard
            key={type.id}
            deleteHandler={() => openWarningModal(type.id)}
            openChangeModal={() => openChangeModal(type)}
            item={type}
          />
        ))}
      </Form>
      {modalVisible && (
        <EditType editType={editType} onHide={() => setModalVisible(false)} />
      )}
      {warningVisible && (
        <ModalComponent
          title={'Вы уверены что хотите удалить данный бренд?'}
          successHandle={() => deleteHandler()}
          declineHandle={() => setWarningVisible(false)}
          onHide={() => setWarningVisible(false)}
        >
          <div className="body">
            <div>
              Удаление этого типа приведет к каскадному удалению следующих
              устройств:
            </div>
            {warningDevices.map((dev) => (
              <div key={dev.id}>
                <b>#{dev.id}</b> {dev.name}
              </div>
            ))}
          </div>
        </ModalComponent>
      )}
    </>
  )
})
