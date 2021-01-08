import { Component } from 'react'
import { userService } from '../services/userService.js'

export class LoginSignup extends Component {

  state = {
    msg: '',
    loggedinUser: userService.getLoggedinUser(),
    loginCred: {
      username: '',
      password: ''
    },
    signupCred: {
      username: '',
      password: '',
      fullname: ''
    }
  }

  loginHandleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value
      }
    }))
  }

  signupHandleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      signupCred: {
        ...prevState.signupCred,
        [name]: value
      }
    }))
  }

  doLogin = async ev => {
    ev.preventDefault()
    const { username, password } = this.state.loginCred
    if (!username) {
      return this.setState({ msg: 'Please enter user/password' })
    }
    const userCreds = { username, password }
    userService.login(userCreds)
      .then(user => {
        this.setState(
          {
            loginCred: { username: '', password: '' },
            loggedInUser: user
          })
      })
      .catch(err => {
        console.log('ERR', err)
        this.setState({ msg: 'Try again' })
      })
  }

  doSignup = async ev => {
    ev.preventDefault()
    const { username, password, fullname } = this.state.signupCred
    if (!username || !password || !fullname) {
      return this.setState({ msg: 'All inputs are required' })
    }

    userService.signup({ username, password, fullname })
      .then(user => {
        this.setState(
          {
            signupCred: { username: '', password: '', fullname: '' },
            loggedInUser: user
          })
      })

  }

  doLogout = () => {
    userService.logout()
      .then(() => {
        this.setState({ loggedInUser: null })
      })
  }

  render() {

    const loggedInUser = userService.getLoggedinUser()

    let signupSection = (
      <form className="frm" onSubmit={this.doSignup}>
        <h2>Signup</h2>
        <input
          type="text"
          name="fullname"
          value={this.state.signupCred.fullname}
          onChange={this.signupHandleChange}
          placeholder="Full name"
        />
        <br />
        <input
          name="password"
          type="password"
          value={this.state.signupCred.password}
          onChange={this.signupHandleChange}
          placeholder="Password"
        />
        <br />
        <input
          type="text"
          name="username"
          value={this.state.signupCred.username}
          onChange={this.signupHandleChange}
          placeholder="Username"
        />
        <br />
        <button>Signup</button>
      </form>
    )
    let loginSection = (
      <form className="frm" onSubmit={this.doLogin}>
        <h2>Login</h2>
        <input
          type="text"
          name="username"
          value={this.state.loginCred.username}
          onChange={this.loginHandleChange}
          placeholder="Username"
        />
        <br />
        <input
          type="password"
          name="password"
          value={this.state.loginCred.password}
          onChange={this.loginHandleChange}
          placeholder="Password"
        />
        <br />
        <button>Login</button>
      </form>
    )


    return (
      <div className="login">
        <h1>
          Login / Signup
        </h1>
        <p>{this.state.msg}</p>
        {loggedInUser && (
          <div>
            <h3>
              Welcome {loggedInUser.fullname}
              <button onClick={this.doLogout}>Logout</button>
            </h3>
          </div>
        )}
        {!loggedInUser && loginSection}
        <hr />
        {!loggedInUser && signupSection}
      </div>
    )
  }
}