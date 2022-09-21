import { useContext } from 'react'
import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Context } from '../..'
import { changeType, createType, fetchTypes } from '../../http/typeAPI'
import ModalComponent from './ModalComponent'
import '../../styles/error.css'

export default function EditType({ onHide, editType }) {
  const { device } = useContext(Context)
  const isEdit = Object.keys(editType).length !== 0
  const [type, setType] = useState(isEdit ? editType.name : '')
  const [error, setError] = useState('')

  async function changeEditType() {
    if (type.trim().length === 0) {
      setError('Название типа обязательное поле')
      return
    }
    await changeType({ id: editType.id, name: type })
    console.log(editType.id)
    const data = await fetchTypes()
    device.setTypes(data)
    setType('')
    onHide()
  }

  async function addType() {
    if (type.trim().length === 0) {
      setError('Название типа обязательное поле')
      return
    }
    await createType({ name: type })
    const data = await fetchTypes()
    device.setTypes(data)
    setType('')
    onHide()
  }

  function changeNameHandler(e) {
    setType(e.target.value)
    setError('')
  }

  return (
    <ModalComponent
      title={isEdit ? `Редактировать тип ${editType.id}` : 'Добавить новый тип'}
      successHandle={isEdit ? changeEditType : addType}
      declineHandle={onHide}
      onHide={onHide}
    >
      <Form>
        <Form.Control
          value={type}
          onChange={(e) => changeNameHandler(e)}
          placeholder="Введите название типа"
        />
        <div className="error">{error}</div>
      </Form>
    </ModalComponent>
  )
}
