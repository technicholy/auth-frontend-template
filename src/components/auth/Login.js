import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    registrationError: ''
  }

  handleSubmit = (event) => {
    const { email, password } = this.state
    event.preventDefault()
    axios.post('http://localhost:3001/sessions', {
      user: {
        email: email,
        password: password
      }
    }, {
      withCredentials: true
    }).then(response => {
      if (response.data.logged_in){
        this.props.handleSuccessfulAuth(response.data)
      }
    }).catch(error => {
      console.log('error', error);
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="email" name="email" placeholder='Email' value={this.state.email} onChange={this.handleChange} required />
          <input type="password" name="password" placeholder='Password' value={this.state.password} onChange={this.handleChange} required />
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}
