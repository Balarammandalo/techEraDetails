import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import NotFound from './components/NotFound'
import TechEraDetails from './components/TechEraDetails'

// Replace your code here
const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={TechEraDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
