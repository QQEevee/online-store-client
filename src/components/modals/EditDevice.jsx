import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Button, Col, Dropdown, Form, Row } from 'react-bootstrap'
import { Context } from '../..'
import { fetchBrands } from '../../http/brandAPI'
import {
  changeDevice,
  createDevice,
  fetchDevices,
  fetchOneDevice,
} from '../../http/deviceAPI'
import { fetchTypes } from '../../http/typeAPI'
import ModalComponent from './ModalComponent'
import '../../styles/error.css'

export default observer(function EditDevice({ editDevice, onHide }) {
  const { device } = useContext(Context)
  const isEdit = Object.keys(editDevice).length !== 0
  const [name, setName] = useState(isEdit ? editDevice.name : '')
  const [price, setPrice] = useState(isEdit ? editDevice.price : 0)
  const [file, setFile] = useState('')
  const [info, setInfo] = useState([])

  const [typeError, setTypeError] = useState('')
  const [brandError, setBrandError] = useState('')
  const [nameError, setNameError] = useState('')
  const [priceError, setPriceError] = useState('')
  const [imgError, setImgError] = useState('')

  useEffect(() => {
    fetchTypes().then((data) => {
      device.setTypes(data)
      if (isEdit) {
        device.setSelectedType(
          device.types.filter((t) => t.id === editDevice.typeId)[0]
        )
      }
    })
    fetchBrands().then((data) => {
      device.setBrands(data)
      if (isEdit) {
        device.setSelectedBrand(
          device.brands.filter((b) => b.id === editDevice.brandId)[0]
        )
      }
    })
    if (isEdit) {
      fetchOneDevice(editDevice.id).then((d) => {
        setInfo(d.info)
      })
    }
  }, [])

  const selectTypeHandler = (type) => {
    setTypeError('')
    device.setSelectedType(type)
  }
  const selectBrandHandler = (brand) => {
    setBrandError('')
    device.setSelectedBrand(brand)
  }
  const changeName = (e) => {
    setNameError('')
    setName(e.target.value)
  }
  const changePrice = (e) => {
    setPriceError('')
    setPrice(e.target.value)
  }

  const addNewInfo = () => {
    setInfo([...info, { title: '', description: '', id: Date.now() }])
  }
  const removeInfo = (id) => {
    setInfo(info.filter((i) => i.id !== id))
  }

  const selectFile = (e) => {
    console.log(e.target.files)
    setFile(e.target.files[0])
    setImgError('')
  }

  const changeInfo = (key, value, id) => {
    if (key === 'error') {
      setInfo(info.map((i) => (i.id === id ? { ...i, [key]: value } : i)))
    } else {
      setInfo(
        info.map((i) => (i.id === id ? { ...i, [key]: value, error: '' } : i))
      )
    }
  }

  const closeHandler = () => {
    device.setSelectedBrand({})
    device.setSelectedType({})
    onHide()
  }

  const isValid = () => {
    let error = false
    if (name.trim().length === 0) {
      setNameError('Название устройства не заполнено')
      error = true
    }
    if (price <= 0) {
      setPriceError('Цена устройства должна быть положительным числом')
      error = true
    }
    if (!file) {
      setImgError('Отсутствует изображение')
      error = true
    } else {
      const fileExt = file.name.split('.')[1]
      if (fileExt !== 'jpg' && fileExt !== 'png' && fileExt !== 'jpeg') {
        setImgError('Формат изображения должен быть png или jpg')
        error = true
      }
    }
    const isSelectedBrand = Object.keys(device.selectedBrand).length > 0
    if (!isSelectedBrand) {
      setBrandError('Выберите бренд устройства')
      error = true
    }
    const isSelectedType = Object.keys(device.selectedType).length > 0
    if (!isSelectedType) {
      setTypeError('Выберите тип устройства')
      error = true
    }
    info.map((i) => {
      if (i.description.trim().length === 0) {
        changeInfo('error', 'Свойство должно иметь описание', i.id)
        error = true
      }
      if (i.title.trim().length === 0) {
        changeInfo('error', 'Свойство должно иметь название', i.id)
        error = true
      }
    })

    return error
  }

  const submitDevice = async () => {
    if (isValid()) {
      return
    }

    const formData = new FormData()
    if (isEdit) {
      formData.append('id', `${editDevice.id}`)
    }
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('typeId', device.selectedType.id)
    formData.append('info', JSON.stringify(info))

    if (isEdit) {
      await changeDevice(formData)
    } else {
      await createDevice(formData)
    }
    const data = await fetchDevices()
    device.setDevices(data.rows)
    device.setSelectedBrand({})
    device.setSelectedType({})
    onHide()
  }

  return (
    <ModalComponent
      title={
        isEdit
          ? `Редактировать устройство ${editDevice.id}`
          : 'Добавить новое устройство'
      }
      successHandle={submitDevice}
      declineHandle={closeHandler}
      onHide={onHide}
    >
      <Form>
        <Dropdown>
          <Dropdown.Toggle>
            {device.selectedType.name || 'Выберите тип'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {device.types.map((type) => (
              <Dropdown.Item
                onClick={() => selectTypeHandler(type)}
                key={type.id}
              >
                {type.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <div className="error">{typeError}</div>
        <Dropdown className="my-3">
          <Dropdown.Toggle>
            {device.selectedBrand.name || 'Выберите бренд'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {device.brands.map((brand) => (
              <Dropdown.Item
                onClick={() => selectBrandHandler(brand)}
                key={brand.id}
              >
                {brand.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <div className="error">{brandError}</div>
        <Form.Control
          value={name}
          onChange={(e) => changeName(e)}
          placeholder="Введите название устройства"
        />
        <div className="error">{nameError}</div>
        <hr />
        <label htmlFor="price" className="mb-2">
          Цена:
        </label>
        <Form.Control
          id="price"
          value={price}
          onChange={(e) => changePrice(e)}
          type="number"
          placeholder="Введите стоимость устройства"
        />
        <div className="error">{priceError}</div>
        <hr />
        <label htmlFor="img" className="mb-2">
          Изображение:
        </label>
        <Form.Control id="img" type="file" onChange={selectFile} />
        <div className="error">{imgError}</div>
        <hr />
        <Button onClick={addNewInfo} variant="outline-dark">
          Добавить новое свойство
        </Button>
        {info.map((i) => (
          <div key={i.id}>
            <Row className="mt-3">
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) => changeInfo('title', e.target.value, i.id)}
                  placeholder="Введите название свойства"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) =>
                    changeInfo('description', e.target.value, i.id)
                  }
                  placeholder="Введите название описание свойства"
                />
              </Col>
              <Col md={4}>
                <Button
                  variant="outline-danger"
                  onClick={() => removeInfo(i.id)}
                >
                  Удалить свойство
                </Button>
              </Col>
            </Row>
            <div className="error">{i.error}</div>
          </div>
        ))}
      </Form>
    </ModalComponent>
  )
})
