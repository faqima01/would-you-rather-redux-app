import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAuthedUser } from '../../actions/authedUser';
import SignInputBox from './SignInputBox';
import '../../styles/SignInPage.css';

/**
 * Class component representing the sign in page.
 * @extends Component
 */
class SignInPage extends Component {
  state = {
    username: '',
    password: '',
    incorrectCredentials: false,
    anyBlankField: false,
  };

  handleInput = (inputType, inputValue) => {
    switch (inputType) {
      case 'username':
        this.setState({
          username: inputValue,
        });
        break;
      case 'password':
        this.setState({
          password: inputValue,
        });
        break;
      default:
        break;
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    const { users } = this.props;
    if (!username || !password) {
      this.setState({
        anyBlankField: true,
        incorrectCredentials: false,
        username: '',
        password: '',
      });
    } else {
      if (users[username]) {
        const recordedPassword = users[username].password;
        if (recordedPassword === password) {
          // Log in successfully by routing to the next page
          this.props.dispatch(setAuthedUser(username));
          this.props.history.push('/questions');
        } else {
          this.setState({
            anyBlankField: false,
            incorrectCredentials: true,
            username: '',
            password: '',
          });
        }
      } else {
        this.setState({
          anyBlankField: false,
          incorrectCredentials: true,
          username: '',
          password: '',
        });
      }
    }
  };

  render() {
    const {
      username,
      password,
      anyBlankField,
      incorrectCredentials,
    } = this.state;

    return (
      <div className='signin-form-box'>
        <div className='username-input'>
          <SignInputBox
            label='Username:'
            inputName='username'
            onChange={this.handleInput}
            value={username}
          />
        </div>
        <div className='password-input'>
          <SignInputBox
            label='Password:'
            inputName='password'
            onChange={this.handleInput}
            value={password}
          />
        </div>
        <div>
          <button className='signin-signin-button' onClick={this.handleSubmit}>
            SIGN IN
          </button>
        </div>
        {anyBlankField && (
          <p className='account-creation-message'>
            You cannot leave any field blank. Please try again!
          </p>
        )}
        {incorrectCredentials && (
          <p className='account-creation-message'>
            Either the username or password is incorrect. Please try again!
          </p>
        )}
      </div>
    );
  }
}

SignInPage.propTypes = {
  users: PropTypes.object.isRequired,
};

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(SignInPage);
