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
        e.target.value = ''
        document.querySelector('#mac').play()
        const classN = document.querySelector('#loading').className.replace('hide', '')
        document.querySelector('#loading').className = classN
        const classN2 = document.querySelector('#password').className + ' hide'
        document.querySelector('#password').className = classN2
        setTimeout(() => {
          this.setState({
            logged_in: true,
          })
        }, 4000)
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
        <audio id="mac" src="/sounds/mac.mp3"></audio>
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
            <div id="loading" className="text-center hide">
              <img src="/img/loading.gif" alt="loading" width="50px"/>
            </div>
            <input id="password" type="password" placeholder="PIN" pattern="[0-9]*" maxLength="4" onKeyDown={this.onEnter.bind(this)} onInput={this.handleChange.bind(this)} value={this.state.pin}/>
          </div>
        </div>
      </div>
    )
  }
}