import { Card, Row } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '..'

export default observer(function BrandBar() {
  const { device } = useContext(Context)

  function selectHandler(brand) {
    const selectedIndex = device.selectedBrands.findIndex(
      (selected) => selected.id === brand.id
    )
    if (selectedIndex !== -1) {
      device.setSelectedBrands(
        device.selectedBrands.filter(
          (selected, index) => index !== selectedIndex
        )
      )
    } else {
      device.setSelectedBrands([...device.selectedBrands, brand])
    }
  }

  return (
    <Row className="d-flex">
      {device.brands.map((brand) => (
        <Card
          border={
            device.selectedBrands
              .map((selected) => (selected = selected.id))
              .includes(brand.id)
              ? 'danger'
              : 'dark'
          }
          onClick={() => selectHandler(brand)}
          key={brand.id}
          className={'p-2 pointer wcontent'}
        >
          {brand.name}
        </Card>
      ))}
    </Row>
  )
})
