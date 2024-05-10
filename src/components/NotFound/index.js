import './index.css'

const NotFound = () => (
  <div className="notFound-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
      className="error-image"
      alt="not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-desc">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
