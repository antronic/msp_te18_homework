import React from 'react'
import { Redirect } from 'react-router-dom'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'TE18',
      pin: '',
      logged_in: false,
    }
  }

  validatePIN(e) {
    return !new RegExp('^[0-9]{1,4}$').test(Number(e.target.value)) && e.preventDefault()
  }

  onEnter(e) {
    if (e.key === 'Enter') {
      if (e.target.value === '1234') {
        this.setState({
          logged_in: true,
        })
      }
    }
  }

  handleChange(evt) {
    const pin = (evt.target.validity.valid) ? evt.target.value : this.state.pin

    this.setState({ pin })
  }

  render() {
    return (
      <div id="login">
        {
          this.state.logged_in && (
            <Redirect to={{
              pathname: '/',
            }}/>
          )
        }
        <div className="login-bg"></div>
        <div id="con-login" className="">
          <div className="profile-img">
            <img src="/img/profile.png" alt="Profile" />
          </div>
          <div className="username">
            <span>{this.state.username}</span>
          </div>
          <div className="password-box">
            <input type="password" placeholder="PIN" pattern="[0-9]*" maxLength="4" onKeyDown={this.onEnter.bind(this)} onInput={this.handleChange.bind(this)} value={this.state.pin}/>
          </div>
        </div>
      </div>
    )
  }
}