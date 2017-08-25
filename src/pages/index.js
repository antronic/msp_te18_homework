import React from 'react'
import Draggable from 'react-draggable'

import {
  Redirect
} from 'react-router-dom'

import './style.scss'

const Icon = ({ icon = 'bin' , name = 'Recycle Bin', open}) => {
  return (
    <div className="col-1 icon text-center" onDoubleClick={() => open()}>
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

const Window = class Window extends React.Component {
  removeLocalStorage() {
    localStorage.removeItem('windowsx_jirachai')
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    this.props.close()
  }

  render() {
    return (
      <Draggable
        axis="x"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        grid={[25, 25]}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}
      >
        <div className="window">
          <div className="title-bar">
            <p>Clear local storage</p>
            <button className="close-btn" onClick={() => this.props.close()}>✕</button>
          </div>
          <div className="body">
            <h2>Would you like to clear data?</h2>
            <br/>
            <br/>
            <div className="text-right">
              <button onClick={() => this.removeLocalStorage()}>Yes</button>
              <button onClick={() => this.props.close()}>No</button>
            </div>
          </div>
        </div>
      </Draggable>
    )
  }
}

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logged_in: true,
      recycle: false,
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
      }, 3000)
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
          (!localStorage.windowsx_jirachai) && this.setState({logged_in: false})
        }
        {
          !this.state.logged_in && <Redirect to={{
            pathname: '/login',
          }}/>
        }
        {
          this.state.recycle && <Window close={() => this.setState({ recycle: false })} />
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
          <Icon open={() => this.setState({ recycle: true })}/>
          <Icon icon="finder" name="Finder"/>
        </div>
        <TaskBar l={() => { this.toggleL(true) }} siri={() => { this.refs.siri.toggleSiri(true) }}/>
      </div>
    )
  }
}