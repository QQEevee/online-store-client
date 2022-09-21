import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Pagination } from 'react-bootstrap'
import { Context } from '..'

export default observer(function Pages() {
  const { device } = useContext(Context)
  const pagesCount = Math.ceil(device.totalCount / device.limit)
  const pages = []
  for (let i = 0; i < pagesCount; i++) {
    pages.push(i + 1)
  }

  if (pagesCount === 1) {
    return
  }

  return (
    <Pagination className="mt-5">
      {pages.map((page) => (
        <Pagination.Item
          onClick={() => device.setPage(page)}
          active={device.page === page}
          key={page}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  )
})
