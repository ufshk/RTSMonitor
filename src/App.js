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
    this.state = {}
  }

  componentDidMount() {
    firebase.initializeApp(firebaseConfig)
    const db = firebase.firestore()
    let newState = this.state
    db.collection('devices').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        let newData = {
          name: '',
          uv: doc.data().value,
          pv: 2400,
          amt: 1200,
        }
        if (!newState[doc.id]) {
          newState[doc.id] = [newData]
        } else {
          if (newState[doc.id].length >= 30) {
            newState[doc.id].shift()
          }
          newState[doc.id] = [
            ...newState[doc.id],
            newData
          ]
        }
      })
      this.setState(newState)
    })
  }
  
  render() {
    console.log(this.state)
    return (
      <div>
        <h1>ENGHACK 2019 RTS</h1>
        <h3>Distance Sensor</h3>
        <div className="graph">
          <LineChart width={600} height={300} data={this.state['DistanceSensor']} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
        <h3>Temperature Sensor</h3>
        <div className="graph">
          <LineChart width={600} height={300} data={this.state['TemperatureSensor']} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
        <h3>Humidity Sensor</h3>
        <div className="graph">
          <LineChart width={600} height={300} data={this.state['HumiditySensor']} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
      </div>
    )
  }
}

export default App