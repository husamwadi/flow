import React, { PropTypes } from 'react';

import './Login.scss';

function loginText(pageNum) {
  switch (pageNum) {
    case 0:
    default:
      return 'What is your name?';

    case 1:
      return 'What is your email address?';

    case 2:
      return 'What is your password?';
  }
}

const Login = ({
  handleInput,
  handleKeyUp,
  handleBlur,
  handleFocus,
  pageNum,
  input,
  inputClass,
  validationMessage,
}) => (
  <div className="login-wrapper">
    <div className="login-text">
      <h1>{loginText(pageNum)}</h1>
    </div>
    <input
      className={inputClass}
      value={input[pageNum]}
      onInput={handleInput}
      onKeyUp={handleKeyUp}
      onBlur={handleBlur}
      onFocus={handleFocus}
      type={pageNum === 2 ? 'password' : 'text'}
      size={Math.max(1, input[pageNum].length)}
    >
    </input>
    <div className="login-validation-message">
      {validationMessage}
    </div>
  </div>
);

Login.propTypes = {
  handleInput: PropTypes.func.isRequired,
  handleKeyUp: PropTypes.func.isRequired,
  pageNum: PropTypes.number.isRequired,
  input: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  validationMessage: PropTypes.string.isRequired,
  inputClass: PropTypes.string.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
};

export default Login;