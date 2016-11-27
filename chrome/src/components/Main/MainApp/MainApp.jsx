import React, { PropTypes } from 'react';

import DockerContainer from './Docker/DockerContainer.js'
import ToggleBackgroundMode from './ToggleBackgroundMode/ToggleBackgroundModeContainer.js';
import CenterPiece from './CenterPiece/CenterPieceContainer';

import './MainApp.scss';

const MainApp = ({
  saveSettings,
}) => (
  <div className="main-app">
    <DockerContainer />
    <ToggleBackgroundMode saveSettings={saveSettings} />
    <CenterPiece />
  </div>
);

MainApp.propTypes = {
  saveSettings: PropTypes.func.isRequired,
};

export default MainApp;
