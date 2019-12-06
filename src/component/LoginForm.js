import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/reducer';
import EmployeeList from './EmployeeList';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    let {email, password} = this.state;
    let { isLoginSuccess, loginError} = this.props;
    return (
      <div>
        <form ref="form" name="loginForm" onSubmit={this.handleSubmit}>
          <div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" onChange={e => this.setState({email: e.target.value})} value={email}/>
            </div>

            <div>
              <label>Password:</label>
              <input type="password" name="password" onChange={e => this.setState({password: e.target.value})} value={password}/>
            </div>
          </div>

          <button type="submit">Login</button>
        </form>
          <div>
            { isLoginSuccess && <Router><Redirect path to="./EmployeeList"/><EmployeeList /></Router>}
            { loginError && <div>{loginError.message}</div> }
          </div>
      </div>
    )   
  }

  handleSubmit(e) {
    e.preventDefault();
    let { email, password } = this.state;
    this.props.login(email, password);
    this.setState({
      email: '',
      password: ''
    });
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginSuccess: state.isLoginSuccess,
    loginError: state.loginError
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);