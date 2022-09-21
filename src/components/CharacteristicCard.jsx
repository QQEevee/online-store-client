import '../styles/characteristic.scss'

export default function CharacteristicCard({ title, description, even }) {
  return (
    <div
      className="card__body"
      style={{
        background: even ? 'lightgray' : 'transparent',
      }}
    >
      <b>{title}: </b> {description}
    </div>
  )
}
