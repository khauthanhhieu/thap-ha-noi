import { PrivateRoute } from './hocs'
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Register, Login, Dashboard } from "./pages"

import "./scss/style.scss"

export default function App() {
  return (
    <div className="App">
      <Router>
        <div className="main-route-place">
          <PrivateRoute exact path='/' component={Dashboard} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </div>
      </Router>
      <ToastContainer autoClose={5000} theme="colored" />
    </div>
  );
}
