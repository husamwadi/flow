import { createAction, handleActions } from 'redux-actions';

export const initialState = {
  currentChannel: {},
  allChannels: []
};


/* ------------   ACTIONS     ------------------ */
export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const SET_CURRENT_CHANNEL = 'SET_CURRENT_CHANNEL';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_SURVEY_TO_CURRENT = 'ADD_SURVEY_TO_CURRENT';

/* ------------   ACTION CREATORS     ------------------ */
export const receiveChannels = createAction(RECEIVE_CHANNELS);
export const receiveUsers = createAction(RECEIVE_USERS);
export const setCurrentChannel = createAction(SET_CURRENT_CHANNEL);
export const addSurveyToCurrent = createAction(ADD_SURVEY_TO_CURRENT);

/* ------------   REDUCER     ------------------ */
export default handleActions({
  RECEIVE_CHANNELS: (state, { payload }) => {
    const newCurrentChannel = payload.length ? payload[0] : {};
    return { ...state, allChannels: payload, currentChannel: newCurrentChannel };
  },
  SET_CURRENT_CHANNEL: (state, { payload }) => {
    return { ...state, currentChannel: payload }
  },
  RECEIVE_USERS: (state, { payload }) =>{
    return { ...state, currentChannel: { ...state.currentChannel, users: payload } }
  },
  ADD_SURVEY_TO_CURRENT: (state, { payload }) => {
    const newCurrent = {...state.currentChannel,
                        surveys: [payload, ...state.currentChannel.surveys]
                       };
    const newAll = state.allChannels.map(channel => {
      if (channel.id === state.currentChannel.id) {
        return newCurrent;
      } else {
        return channel;
      }
    });
    return { currentChannel: newCurrent, allChannels: newAll };
  },
}, initialState);

