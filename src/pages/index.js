import React from 'react'

import {
  Redirect
} from 'react-router-dom'

import './style.scss'

const Icon = ({ icon = 'bin' , name = 'Recycle Bin', siri}) => {
  return (
    <div className="col-1 icon text-center" onClick={() => siri()}>
      <img src={'img/' + icon + '.png'} alt="Recycle Bin" />
      <p>{name}</p>
    </div>
  )
}

const Siri = class Siri extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      siri: false,
    }
  }

  toggleSiri(action=false) {
    if (!action) {
      const classN = document.querySelector('#siri').className
      document.querySelector('#siri').className = classN + ' hide'
    } else {
      document.querySelector('#a-siri').volume = 1
      document.querySelector('#a-siri').play()
      const classN = document.querySelector('#siri').className.replace(' hide', '')
      document.querySelector('#siri').className = classN
    }

    this.setState({
      siri: action,
    })
  }

  render() {
    return (
      <div id="siri" className="siri hide">
        <audio id="a-siri" src="/sounds/siri-active.mp3"></audio>
        <button className="close-btn" onClick={() => this.toggleSiri(false)}>x</button>
        <img src="/img/siri-wave.gif" alt="Siri" />
      </div>
    )
  }
}

const TaskBar = class TaskBar extends React.Component {
  render() {
    return (
      <div id="task-bar" className="col">
        <div className="row">
          <div className="col-1 icon" onClick={() => this.props.l()}>
            <img src="/img/windows.png" alt="Start Here" />
          </div>
          <div className="col-1 icon" onClick={() => this.props.siri()}>
            <img src="/img/cortana.png" alt="Search" />
          </div>
        </div>
      </div>
    )
  }
}

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logged_in: true,
    }
  }

  componentDidMount() {
    if (!localStorage.windowsx_jirachai) {
      this.setState({
        logged_in: false,
      })
    } else {
      setTimeout(() => {
        const classN = document.querySelector('#home-bg').className
        document.querySelector('#home-bg').className = classN + ' windows'
      }, 1000)
    }
  }

  toggleL(action = false) {
    const classN = document.querySelector('#launchpad').className.replace('hide', '')
    document.querySelector('#launchpad').className = classN
  }

  render() {
    return (
      <div id="home">
        {
          !this.state.logged_in && <Redirect to={{
            pathname: '/login',
          }}/>
        }
        <div id="launchpad" className="hide" onClick={() => {
          const classN = document.querySelector('#launchpad').className + ' hide'
          document.querySelector('#launchpad').className = classN
          }}></div>
        <div className="siri-ctl">
          <Siri ref="siri"/>
        </div>
        <div id="home-bg" className="bg"></div>
        <div className="icons">
          <Icon/>
          <Icon icon="finder" name="Finder"/>
        </div>
        <TaskBar l={() => { this.toggleL(true) }} siri={() => { this.refs.siri.toggleSiri(true) }}/>
      </div>
    )
  }
}