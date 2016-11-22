import React, { PropTypes } from 'react';
import './Greeting.scss';

const Greeting = ({
  name,
}) => (
  <div className="greeting">
    <h1>Hello {name}</h1>
  </div>
);

Greeting.propTypes = {
  name: PropTypes.string,
};

export default Greeting;