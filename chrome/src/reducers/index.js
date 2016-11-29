import { combineReducers } from 'redux';
import { outerReducer } from 'redux-async-initial-state';

import meditationWidget from './widgets/meditationWidget';
import quote from './quote';
import announcements from './announcements';
import invites from './invites';
import currentChannels from './currentChannels';
import surveys from './surveys';
import settings from './settings';
import docker from './docker';
import user from './user';

export default outerReducer(combineReducers({
  meditationWidget,
  announcements,
  invites,
  currentChannels,
  quote,
  surveys,
  settings,
  docker,
  user,
}));
