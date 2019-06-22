import React, { Component } from 'react'
import './App.css'
import { messageHandler, sendMessage, clientHandler } from './api.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      message: '',
      numOfClients: 1
    }
    this.handleSubmit = this._handleSubmit.bind(this)
    this.handleChange = this._handleChange.bind(this)
    this.setNumOfClients = this._setNumOfClients.bind(this)
    this.addMessage = this._addMessage.bind(this)
  }

  componentDidMount() {
    messageHandler(this.addMessage)
    clientHandler(this.setNumOfClients)
  }

  _setNumOfClients(numOfClients) {
    if (numOfClients !== this.state.numOfClients) {
      this.setState({ numOfClients })
    }
  }

  messageView() {
    return (
      this.state.messages.map((msg, index) => {
        return <p key={index}>{msg}</p>
      })
    )
  }

  _addMessage(msg) {
    let newMessages = this.state.messages
    newMessages.push(msg)
    this.setState({
      messages: newMessages,
      message: ''
    })
  }

  _handleSubmit() {
    sendMessage(this.state.message)
  }

  _handleChange(event) {
    this.setState({ message: event.target.value })
  }

  render() {
    return (
      <div>
        <div className="clientNum">{'Number of Clients: ' + this.state.numOfClients}</div>
        <div className='messageWrapper'>
          {this.messageView()}
          <input
            className='messageBox'
            type='text'
            value={this.state.message}
            onChange={this.handleChange}
          />
          <button className='submitButton' onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    )
  }
}

export default App