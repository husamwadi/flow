import React from 'react';
import { connect } from'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Root from './components/Root';
import Home from './components/Home';
import { Signup } from './components/Auth';
import DashboardContainer from './components/Dashboard/DashboardContainer';
import OverviewContainer from './components/Dashboard/Overview/OverviewContainer';
import NotificationsContainer from './components/Dashboard/Notifications/NotificationsContainer';
import SurveysContainer from './components/Dashboard/Surveys/SurveysContainer';
import SettingsContainer from './components/Dashboard/Settings/SettingsContainer';

/* -----------------    COMPONENT     ------------------ */

let Routes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={Root}>
      <IndexRoute component={Home} />
      <Route path='signup' component={Signup} />

      <Route path='dashboard' component={DashboardContainer}>
        <Route path='/overview' component={OverviewContainer} />
      	<Route path='/notifications' component={NotificationsContainer} />
      	<Route path='/surveys' component={SurveysContainer} />
      	<Route path='/settings' component={SettingsContainer} />
      </Route>

      <Route path='*' component={Home} onEnter={() => browserHistory.push('/') } />
    </Route>
  </Router>
);

/* -----------------    CONTAINER     ------------------ */

let mapProps = null;

let mapDispatch = dispatch => ({});

export default connect(mapProps, mapDispatch)(Routes);