import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const {logout} = useLogout()
  const {user} = useAuthContext()

  const handleClick = () => {
    logout();
  }

  return (
    <header>
        <div className='container'>
            <Link to='/'>
                {user && 
                <h1>Welcome!!!</h1>}
                {!user &&
                <h1>Push your limits.💪</h1>}
            </Link>
            <nav>
              {user && <div>
                <span>{user.email}</span>
                <button onClick={handleClick}>Logout</button>
              </div>}
              {!user && <div>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Signup</Link>
              </div>}
            </nav>
        </div>
    </header>
  )
}

export default Navbar