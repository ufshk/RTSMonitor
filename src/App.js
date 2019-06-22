import React, { Component } from 'react'
import './App.css'
import firebase from 'firebase'

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
    db.collection('devices').onSnapshot(querySnapshot => {
      let curState = this.state
      querySnapshot.forEach(doc => {
        let data = doc.data()
        curState[doc.id] = data
      })
      this.setState(curState)
    })
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default App