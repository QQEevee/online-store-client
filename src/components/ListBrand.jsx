import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Button, Form, ListGroup } from 'react-bootstrap'
import { Context } from '..'
import { fetchDevices } from '../http/deviceAPI'
import { deleteBrand, fetchBrands } from '../http/brandAPI'
import EditBrand from './modals/EditBrand'
import AdminListCard from './AdminListCard'
import ModalComponent from './modals/ModalComponent'

export default observer(function ListBrand() {
  const { device } = useContext(Context)
  const [search, setSearch] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [warningVisible, setWarningVisible] = useState(false)
  const [editBrand, setEditType] = useState({})
  const [warningDevices, setWarningDevices] = useState([])

  useEffect(() => {
    fetchBrands().then((data) => {
      device.setBrands(data)
    })
  }, [])

  async function deleteHandler(id) {
    const result = await deleteBrand(id)
    if (result) {
      const dataBrands = await fetchBrands()
      device.setBrands(dataBrands)
      const dataDevices = await fetchDevices()
      device.setDevices(dataDevices.rows)
      setWarningDevices([])
      setWarningVisible(false)
    }
  }

  function getFilteredSearch() {
    return device.brands.filter((brand) =>
      brand.name.toLowerCase().includes(search.toLowerCase())
    )
  }

  function openChangeModal(brand) {
    setEditType(brand)
    setModalVisible(true)
  }

  function openWarningModal(id) {
    const warningList = device.devices.filter((device) => device.brandId === id)
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
          placeholder="Введите название бренда"
        />
        <Button
          className="my-2"
          variant="outline-success"
          onClick={() => openChangeModal({})}
        >
          Добавить новый бренд
        </Button>
        {getFilteredSearch().map((brand) => (
          <AdminListCard
            key={brand.id}
            deleteHandler={() => openWarningModal(brand.id)}
            openChangeModal={() => openChangeModal(brand)}
            item={brand}
          />
        ))}
      </Form>
      {modalVisible && (
        <EditBrand
          editBrand={editBrand}
          onHide={() => setModalVisible(false)}
        />
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
              Удаление этого бренда приведет к каскадному удалению следующих
              устройств:
            </div>
            <ListGroup>
              {warningDevices.map((dev) => (
                <ListGroup.Item key={dev.id}>
                  <b>#{dev.id}</b> {dev.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </ModalComponent>
      )}
    </>
  )
})
