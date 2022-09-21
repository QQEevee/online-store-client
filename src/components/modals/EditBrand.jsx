import { useContext } from 'react'
import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Context } from '../..'
import { changeBrand, createBrand, fetchBrands } from '../../http/brandAPI'
import ModalComponent from './ModalComponent'
import '../../styles/error.css'

export default function EditBrand({ onHide, editBrand }) {
  const { device } = useContext(Context)
  const isEdit = Object.keys(editBrand).length !== 0
  const [brand, setBrand] = useState(isEdit ? editBrand.name : '')
  const [error, setError] = useState('')

  async function changeEditBrand() {
    if (brand.trim().length === 0) {
      setError('Название бренда обязательное поле')
      return
    }
    await changeBrand({ id: editBrand.id, name: brand })
    const data = await fetchBrands()
    device.setBrands(data)
    setBrand('')
    onHide()
  }

  function changeNameHandler(e) {
    setBrand(e.target.value)
    setError('')
  }

  async function addBrand() {
    if (brand.trim().length === 0) {
      setError('Название бренда обязательное поле')
      return
    }
    await createBrand({ name: brand })
    const data = await fetchBrands()
    device.setBrands(data)
    setBrand('')
    onHide()
  }

  return (
    <ModalComponent
      title={
        isEdit ? `Редактировать бренд ${editBrand.id}` : 'Добавить новый бренд'
      }
      successHandle={isEdit ? changeEditBrand : addBrand}
      declineHandle={onHide}
      onHide={onHide}
    >
      <Form>
        <Form.Control
          className="error input"
          value={brand}
          onChange={(e) => changeNameHandler(e)}
          placeholder="Введите название типа"
        />
        <div className="error">{error}</div>
      </Form>
    </ModalComponent>
  )
}
