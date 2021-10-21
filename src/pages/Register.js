import { register } from '../service/firebase'
import { useAuth } from '../hooks/useAuth'
import  { Redirect } from 'react-router-dom'

export default function Register() {
  const { pending, isSignedIn } = useAuth()

  if (!pending && isSignedIn) {
    return <Redirect to='/' />
  }

  const handleSubmit = async function(e) {
    e.preventDefault()
    await register(e.target.email.value, e.target.password.value)
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
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}
