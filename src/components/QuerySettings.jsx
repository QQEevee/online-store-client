import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { useState } from 'react'
import { Card } from 'react-bootstrap'
import { Context } from '..'
import '../styles/query.scss'

export default observer(function QuerySettings() {
  const { device } = useContext(Context)
  const [typeToggle, setTypeToggle] = useState(false)
  const [brandToggle, setBrandToggle] = useState(false)

  function selectTypeHandler(type) {
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

  function isTypeActive(type) {
    return device.selectedTypes
      .map((selected) => (selected = selected.id))
      .includes(type.id)
  }

  function selectBrandHandler(brand) {
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

  function isBrandActive(brand) {
    return device.selectedBrands
      .map((selected) => (selected = selected.id))
      .includes(brand.id)
  }

  return (
    <>
      <div onClick={() => setTypeToggle((prev) => !prev)} className="toggle">
        {typeToggle ? '➤' : '▼'} Типы
      </div>
      {typeToggle &&
        device.types.map((type) => (
          <Card
            className={'selector ' + (isTypeActive(type) && 'active')}
            key={type.id}
            onClick={() => selectTypeHandler(type)}
          >
            {type.name}
          </Card>
        ))}
      <div onClick={() => setBrandToggle((prev) => !prev)} className="toggle">
        {brandToggle ? '➤' : '▼'} Бренды
      </div>
      {brandToggle &&
        device.brands.map((brand) => (
          <Card
            className={'selector ' + (isBrandActive(brand) && 'active')}
            key={brand.id}
            onClick={() => selectBrandHandler(brand)}
          >
            {brand.name}
          </Card>
        ))}
    </>
  )
})
