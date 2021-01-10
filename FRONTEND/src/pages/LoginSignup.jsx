import { Component } from 'react'
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'

import {
  loadUsers,
  removeUser,
  login,
  logout,
  signup
} from '../store/actions/userActions'

class _LoginSignup extends Component {

  state = {
    currPage: 'login',
    msg: '',
    loginCred: {
      username: '',
      password: ''
    },
    signupCred: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: ''
    }
  }

  componentDidMount() { this.props.loadUsers() }

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
    try {
      this.props.login(userCreds)
      this.setState({ loginCred: { username: '', password: '' } })
    } catch (err) {
      this.setState({ msg: 'Login failed, try again.' })
    }
  }

  doSignup = async ev => {
    ev.preventDefault()
    const { username, password, firstName, lastName, email } = this.state.signupCred
    if (!username || !password || !firstName || !lastName || !email) {
      return this.setState({ msg: 'All inputs are required' })
    }
    const signupCreds = { username, password, firstName, lastName, email }
    this.props.signup(signupCreds)
    this.setState({ signupCred: { username: '', password: '', firstName: '', lastName: '', email: '' } })
  }

  render() {
    const { loggedInUser } = this.props
    console.log(this.props)

    let signupSection = (
      <form className="frm-signup flex col" onSubmit={this.doSignup}>
        <h2>Create Account</h2>
        <TextField
          type="text"
          name="email"
          value={this.state.signupCred.email}
          onChange={this.signupHandleChange}
          label="Email"
        />
        <TextField
          type="text"
          name="firstName"
          value={this.state.signupCred.firstName}
          onChange={this.signupHandleChange}
          label="First Name"
        />
        <TextField
          type="text"
          name="lastName"
          value={this.state.signupCred.lastName}
          onChange={this.signupHandleChange}
          label="Last Name"
        />
        <TextField
          type="text"
          name="username"
          value={this.state.signupCred.username}
          onChange={this.signupHandleChange}
          label="Username"
        />
        <TextField
          name="password"
          type="password"
          value={this.state.signupCred.password}
          onChange={this.signupHandleChange}
          label="Password"
        />
        <Button className="signup-btn" type="submit" color="secondary" variant="contained">SIGN UP</Button>
      </form>
    )
    let loginSection = (
      <form className="frm-login flex col" onSubmit={this.doLogin}>
        <h2>Sign In</h2>
        <TextField
          type="text"
          name="username"
          value={this.state.loginCred.username}
          onChange={this.loginHandleChange}
          label="Username"
        />
        <TextField
          type="password"
          name="password"
          value={this.state.loginCred.password}
          onChange={this.loginHandleChange}
          label="Password"
        />
        <Button className="login-btn" type="submit" color="primary" variant="contained">SIGN IN</Button>
      </form>
    )

    const { msg } = this.state
    const { currPage } = this.state
    return (
      < div className="login-signup" >
        { loggedInUser && (
          <div>
            <h3>
              Welcome {loggedInUser.firstName + ' ' + loggedInUser.lastName}
              <Button color="secondary" onClick={this.props.logout}>LOGOUT</Button>
            </h3>
          </div>
        )
        }
        <div className="btn-group flex">
          <Button color="primary" onClick={() => this.setState({ currPage: 'login' })}>Login</Button>
          <Button color="secondary" onClick={() => this.setState({ currPage: 'signup' })}>Signup</Button>
        </div>
        <p className="muted red">{msg ? '* ' + msg : ''}</p>
        {(!loggedInUser && currPage === 'login') && loginSection}
        {(!loggedInUser && currPage === 'signup') && signupSection}
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.userModule.users,
    loggedInUser: state.userModule.loggedInUser,
  }
}
const mapDispatchToProps = {
  login,
  logout,
  signup,
  removeUser,
  loadUsers
}

export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup)