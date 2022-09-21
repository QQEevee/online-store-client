import { Button, Card } from 'react-bootstrap'
import '../styles/admincard.scss'

export default function AdminListCard({
  item,
  openChangeModal,
  deleteHandler,
}) {
  return (
    <Card className="admin__card" key={item.id}>
      <h4 className="text_over_hidden">Название: {item.name}</h4>
      <div className="d-flex wcontent">
        <Button
          className="mx-3"
          variant="outline-warning"
          onClick={() => openChangeModal(item)}
        >
          Редактировать
        </Button>
        <Button variant="outline-danger" onClick={() => deleteHandler(item.id)}>
          Удалить
        </Button>
      </div>
    </Card>
  )
}
