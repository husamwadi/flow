import React from 'react';
// import Survey from './Survey/SurveyContainer.js';
import './Surveys.scss';
import Table from './SurveySubcomponents/Table/Table.jsx';
import NewSurveyForm from './SurveySubcomponents/NewSurveyForm/NewSurveyForm.jsx'
import ExistingSurvey from './SurveySubcomponents/ExistingSurveyEditor/ExistingSurveyEditor.jsx'

import '../Viewport.scss';

import { Overlay } from '@blueprintjs/core';

export default ({
  toggleNewSurveyForm,
  toggleExistingSurveyEditor,
  currentChannel,
  modalType,
  submitSurvey,
  currentSurveyID,
  showModal,
}) => (
	<div id="surveys" >

    <div className="pt-navbar survey-navbar">
      <div className="pt-navbar-group pt-align-right">
        <button id='new-form-button' className='pt-button pt-intent-primary' onClick={() => toggleNewSurveyForm()}>Create a New Survey</button>

        <div className="pt-input-group">
          <span className="pt-icon pt-icon-search"></span>
          <input id="survey_search_input" className="pt-input" type="search" placeholder="Search input" dir="auto" />
        </div>
      </div>

    </div>

    <div className="pt-card">
      <Table surveys={currentChannel.surveys} toggleExistingSurveyEditor={toggleExistingSurveyEditor}/>
    </div>

    <Overlay 	className="pt-overlay-scroll-container"
              isOpen={showModal}
              inline={false}
              canOutsideClickClose={true}
              autoFocus={true}
              enforceFocus={true}
              canEscapeKeyClose={true}>
      <div className="pt-card modal survey-modal">
        {
          modalType === 'new_survey'
            ? <NewSurveyForm
            toggleNewSurveyForm={toggleNewSurveyForm}
            channel={currentChannel}
            submitSurvey={submitSurvey} />
            : null
        }
        {
          modalType === 'existing_survey'
            ? <ExistingSurveyEditor currentSurveyID={currentSurveyID} />
            : null
        }
      </div>

    </Overlay>

  </div>

);

//
// {currentChannel.surveys.length > 0 &&
// currentChannel.surveys.map((survey, idx) => (
//   <Survey
//     surveyId={survey.id}
//     key={idx}
//   />
// ))
// }