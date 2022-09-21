import { Container, Dropdown } from 'react-bootstrap'
import { useState } from 'react'
import ListType from '../components/ListType'
import ListBrand from '../components/ListBrand'
import ListDevice from '../components/ListDevice'
import ListUsers from '../components/ListUsers'

export default function Admin() {
  const dropdownItems = [
    'Список типов',
    'Список брендов',
    'Список устройств',
    'Список пользователей',
  ]
  const [dropdownSelected, setDropdownSelected] = useState(dropdownItems[0])

  return (
    <Container className="d-flex flex-column">
      <Dropdown className="my-3">
        <Dropdown.Toggle>{dropdownSelected}</Dropdown.Toggle>
        <Dropdown.Menu>
          {dropdownItems.map((item, index) => (
            <Dropdown.Item
              onClick={() => setDropdownSelected(dropdownItems[index])}
              key={index}
            >
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {dropdownSelected === dropdownItems[0] && <ListType />}
      {dropdownSelected === dropdownItems[1] && <ListBrand />}
      {dropdownSelected === dropdownItems[2] && <ListDevice />}
      {dropdownSelected === dropdownItems[3] && <ListUsers />}
    </Container>
  )
}
