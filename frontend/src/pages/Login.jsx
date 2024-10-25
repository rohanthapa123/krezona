import React from 'react'
import "./login.css"

const Login = () => {
    return (
        <div className='outerdiv'>
            <div class="main">  	
		        <input className='logininput' type="checkbox" id="chk" aria-hidden="true" />

                    <div class="signup">
                        <form>
                            <label className='loginlabel' for="chk" aria-hidden="true">Sign up</label>
                            <input className='logininput' type="text" name="username" placeholder="User name" required="" />
                            <input className='logininput' type="email" name="email" placeholder="Email" required="" />
                            <input className='logininput' type="number" name="contact" placeholder="Contact" required="" />
                            <input className='logininput' type="password" name="password" placeholder="Password" required="" />
                            <button className='loginbtn'>Sign up</button>
                        </form>
                    </div>

                    <div class="login">
                        <form>
                            <label className='loginlabel' for="chk" aria-hidden="true">Login</label>
                            <input className='logininput' type="email" name="email" placeholder="Email" required="" />
                            <input className='logininput' type="password" name="pswd" placeholder="Password" required="" />
                            <button className='loginbtn'>Login</button>
                        </form>
                    </div>
	        </div>
        </div>
    )
}

export default Login

