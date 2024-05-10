import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import './index.css'

const apiStatusContainer = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initail: 'INITIAL',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusContainer.initail,
    courseList: [],
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiStatusContainer.inProgress})
    const response = await fetch('https://apis.ccbp.in/te/courses')
    const data = await response.json()
    if (response.ok === true) {
      const newData = data.courses.map(eachData => ({
        id: eachData.id,
        name: eachData.name,
        logoUrl: eachData.logo_url,
      }))
      this.setState({
        courseList: newData,
        apiStatus: apiStatusContainer.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContainer.failure})
    }
  }

  onRetryButton = () => {
    this.getCourseDetails()
  }

  renderFailureCourses = () => (
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

  renderLoaderCourses = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  renderSuccessCourses = () => {
    const {courseList} = this.state
    return (
      <div className="course-container">
        <h1 className="heading-course">Courses</h1>
        <ul className="course-item">
          {courseList.map(eachCourse => (
            <Link
              to={`/courses/${eachCourse.id}`}
              key={eachCourse.id}
              className="course-id"
            >
              <li className="course-list" key={eachCourse.id}>
                <img
                  className="course-image"
                  src={eachCourse.logoUrl}
                  alt={eachCourse.name}
                />
                <p className="course-para">{eachCourse.name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  renderCoursesDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContainer.success:
        return this.renderSuccessCourses()
      case apiStatusContainer.failure:
        return this.renderFailureCourses()
      case apiStatusContainer.inProgress:
        return this.renderLoaderCourses()
      default:
        return null
    }
  }

  render() {
    return this.renderCoursesDetails()
  }
}

export default Home
