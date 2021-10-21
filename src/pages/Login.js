import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { login } from '../service/firebase'
import { toast } from 'react-toastify'
import  { useHistory, Redirect } from 'react-router-dom'

export default function Login() {
  const { pending, isSignedIn } = useAuth()
  const history = useHistory()

  if (!pending && isSignedIn) {
    return <Redirect to='/' />
  }

  const handleSubmit = async function(e) {
    e.preventDefault()
    try {
      await login(e.target.email.value, e.target.password.value)
      history.push('/')
    } catch(err) {
      toast.error(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
      <Link to="/register">Register</Link>
    </form>
  )
}