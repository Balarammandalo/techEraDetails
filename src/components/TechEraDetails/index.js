import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusCostant = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initail: 'INITIAL',
}

class TechEraDetails extends Component {
  state = {
    apiStatus: apiStatusCostant.initail,
    courseDetails: [
      {
        id: '736d1108-d98b-482f-bfd6-234498c3571f',
        name: 'HTML',
        imageUrl:
          'https://assets.ccbp.in/frontend/react-js/tech-era/html-img.png',
        description:
          'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript. Web browsers receive HTML documents from a web server or local storage and render the documents into multimedia web pages.',
      },
    ],
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiStatusCostant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const option = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    const data = await response.json()
    if (response.ok === true) {
      const fetchingData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        courseDetails: fetchingData,
        apiStatus: apiStatusCostant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusCostant.failure})
    }
  }

  onRetryButton = () => {
    this.getCourseDetails()
  }

  renderFailureCourse = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="heading">Oops! Something Went Wrong</h1>
      <p className="desc">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="failure-button"
        type="button"
        onClick={this.onRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderCourse = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  renderSuccessCourse = () => {
    const {courseDetails} = this.state
    const {imageUrl, name, description} = courseDetails
    return (
      <div className="course-bg-container">
        <div className="course-details-container">
          <img src={imageUrl} alt={name} className="course-details-image" />
        </div>
        <div className="text-name-desc">
          <h1 className="head-name">{name}</h1>
          <p className="desc-para">{description}</p>
        </div>
      </div>
    )
  }

  renderCourseDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusCostant.success:
        return this.renderSuccessCourse()
      case apiStatusCostant.failure:
        return this.renderFailureCourse()
      case apiStatusCostant.inProgress:
        return this.renderLoaderCourse()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="course-details-container">
        {this.renderCourseDetails()}
      </div>
    )
  }
}

export default TechEraDetails
