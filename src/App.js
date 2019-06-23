import React, { Component } from 'react'
import './App.css'
import firebase from 'firebase'
import 'typeface-roboto'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const firebaseConfig = {
    apiKey: "AIzaSyCcfNhXu0Bk8-cWXx1rpAHh3uGigcGTg6A",
    authDomain: "rts-monitor.firebaseapp.com",
    databaseURL: "https://rts-monitor.firebaseio.com",
    projectId: "rts-monitor",
    storageBucket: "rts-monitor.appspot.com",
    messagingSenderId: "94661493840",
    appId: "1:94661493840:web:6e33e832e19fb7ef"
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      status: 'Offline',
      elapsed: 0
    }
    this.prevTime = Date.now()
  }

  componentDidMount() {
    firebase.initializeApp(firebaseConfig)
    this.db = firebase.firestore()
    let newState = this.state
    this.db.collection('devices').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        let newData = {
          name: '',
          uv: doc.data().value,
          pv: 2400,
          amt: 1200,
        }
        if (!newState.data[doc.id]) {
          newState.data[doc.id] = [newData]
        } else {
          if (newState.data[doc.id].length >= 30) {
            newState.data[doc.id].shift()
          }
          newState.data[doc.id] = [
            ...newState.data[doc.id],
            newData
          ]
        }
      })
      if (this.timer) {
        clearInterval(this.timer)
        this.prevTime = Date.now()
        this.timer = setInterval(this.tick, 50)
      } else {
        this.timer = setInterval(this.tick, 50)
        this.prevTime = Date.now()
      }
      this.setState(newState)
    })
  }

  tick = () => {
    let newState = this.state
    newState.elapsed = Date.now() - this.prevTime
    var elapsed = Math.round(newState.elapsed / 100)
    var deltaTime = (elapsed / 10).toFixed(1)
    if (deltaTime >= 8.0 && this.state.status === 'Online') {
      newState.status = 'Offline'
      newState.elapsed = 0
    } else if (deltaTime < 8.0 && this.state.status === 'Offline') {
      newState.status = 'Online'
      newState.elapsed = 0
    }
    if (newState.elapsed === 0) {
      this.db.collection('control').doc('status').set({
        value: newState.status
      })
    }
    this.setState(newState)
  }
  
  render() {
    return (
      <div>
        <h1>ENGHACK 2019 RTS Monitor</h1>
        {this.state.status === 'Online' &&
          <h2 className="green">{this.state.status}</h2> 
        }
        {this.state.status === 'Offline' &&
          <h2 className="red">{this.state.status}</h2> 
        }
        <div className="container">
          <h3>Distance Sensor</h3>
          <div className="graph">
            <LineChart width={600} height={300} data={this.state.data['DistanceSensor']} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </div>
        </div>
        <div className="space"></div>
        <div className="container">
          <h3>Temperature Sensor</h3>
          <div className="graph">
            <LineChart width={600} height={300} data={this.state.data['TemperatureSensor']} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </div>
        </div>
        <div className="space"></div>
        <div className="container">
          <h3>Humidity Sensor</h3>
          <div className="graph">
            <LineChart width={600} height={300} data={this.state.data['HumiditySensor']} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </div>
        </div>
        <div className="space"></div>
        <div className="container">
          <h3>Motor</h3>
          <button>

          </button>
          <input type="text">

          </input>
          <button>
            
          </button>
        </div>
        <div className="space"></div>
      </div>
    )
  }
}

export default App