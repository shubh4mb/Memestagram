// import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className="flex justify-between px-4">
    <div>
        <Link to='/'><p>Memestagram</p></Link>
    </div>

    
    <div>
        
    </div>


    <div className="flex gap-2">
       <Link to='/addmeme'> <p>+ Post</p></Link>
       <Link to='/signin'> <p>Sign in </p></Link>

        
    </div>


    </div>
  )
}

export default Header