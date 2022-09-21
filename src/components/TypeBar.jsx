import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '../index'
import { ListGroup } from 'react-bootstrap'

export default observer(function TypeBar() {
  const { device } = useContext(Context)

  function selectHandler(type) {
    const selectedIndex = device.selectedTypes.findIndex(
      (selected) => selected.id === type.id
    )
    if (selectedIndex !== -1) {
      device.setSelectedTypes(
        device.selectedTypes.filter(
          (selected, index) => index !== selectedIndex
        )
      )
    } else {
      device.setSelectedTypes([...device.selectedTypes, type])
    }
  }

  return (
    <div>
      <ListGroup>
        {device.types.map((type) => (
          <ListGroup.Item
            active={device.selectedTypes
              .map((selected) => (selected = selected.id))
              .includes(type.id)}
            onClick={() => selectHandler(type)}
            key={type.id}
            action
            variant="light"
            className="pointer text_over_hidden"
          >
            {type.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
})
