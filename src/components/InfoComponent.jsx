import { Row } from 'react-bootstrap'
import CharacteristicCard from './CharacteristicCard'

export default function InfoComponent({ device }) {
  return (
    <Row className="d-flex flex-column m-3">
      <h1>Характеристики</h1>
      {device.brand && (
        <CharacteristicCard
          title="Бренд"
          description={device.brand.name}
          even={true}
        />
      )}
      {device.type && (
        <CharacteristicCard
          title="Тип"
          description={device.type.name}
          even={false}
        />
      )}
      {device.info.map((info, index) => (
        <CharacteristicCard
          key={info.id}
          title={info.title}
          description={info.description}
          even={index % 2 === 0}
        />
      ))}
    </Row>
  )
}
