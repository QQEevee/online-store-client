export default function Error({ error }) {
  return (
    <h6 className="d-flex align-items-center justify-content-center title">
      {error.response.data.message}
    </h6>
  )
}
