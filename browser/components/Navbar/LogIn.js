import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Spinner } from '@blueprintjs/core';

export default class LogInForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginSpinner: false,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { login } = this.props;
    const credentials = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    if (login) {
      this.setState({ loginSpinner: true });
      login(credentials)
        .catch(() => {
          this.setState({ loginSpinner: false });
        })
      /* .then(() => {
       *   this.setState({ loginSpinner: false });
       *   this.props.close();
       * });*/
    }
  }

  render() {
    return (
      <div id='log-in-form'>
        <form onSubmit={this.onSubmit}>
          <div style={{ textAlign: 'center' }}>
            <h5>Log In</h5>
          </div>
          <div className='form-group'>
            <label>Email</label>
            <input
              name='email'
              type='email'
              className='form-control'
              required
            />
          </div>
          <div>
              <label>Password</label>
              <input
                name='password'
                type='password'
                className='form-control'
                required
              />
          </div>
          <br />
          {this.state.loginSpinner ? <Spinner className='pt-small' />
          : <button className='pt-button pt-intent-primary' type='submit'>Submit</button>
          }
          <strong style={{ marginLeft: '16px'}}>or</strong>
        </form>
        <button id='create-org-button' className='pt-button pt-intent-success' onClick={() => browserHistory.push('/signup')}>Create an Organization</button>
      </div>
    );
  }
}
