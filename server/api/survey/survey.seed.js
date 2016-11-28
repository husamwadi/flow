// Survey Seeding
// Surveys will be hard coded so that they make sense
'use strict';

const Promise = require('bluebird');
const lorem = require('lorem-ipsum');
const _ = require('lodash');
const chalk = require('chalk');

const Survey = require('./survey.model');
const User = require('../user/user.model');
const Question = require('../question/question.model');
const Channel = require('../channel/channel.model');
const Admin = require('../admin/admin.model');

const surveyDataCreator = require('../survey.data');

const createSurveys = (adminID) => {
  console.log(chalk.yellow(`SEEDING SURVEYS`));

  // 1. Find admin based on parameter adminID
  // include the relevant associations: channel_id,
  return Admin.findOne({
    where: {
      id: adminID,
    },
    include: [
      {
        model: Channel,
        attributes: ['id'],
      },
    ]
  })
  .then((foundAdmin) => {
    // associating these surveys to the first channel of this admin
    const foundAdminChannelID = foundAdmin.channels[0].id;
    console.log(`\tCreating surveys and associating them with Admin ${adminID}, Channel ${foundAdminChannelID}`);

    const surveys = surveyDataCreator(foundAdmin.id, foundAdminChannelID);

    // create surveys in the array
    return Promise.all(surveys.map(s => {
      const survey = s;
      const surveyQuestions = survey.questions;

      return Survey.create(survey)
        // create survey based on data
        .then(newlyCreatedSurvey => {
          // now create questions
          return Promise.all(surveyQuestions.map(q => Question.create(q)))
                  .then(newlyCreatedQuestionsArray => {
                    return Promise.all(newlyCreatedQuestionsArray.map(newQuestion => {
                      // and associate those questions with the current survey
                      return newlyCreatedSurvey.addQuestion(newQuestion);
                    }))
                  })

        })
    }));

  })
  .then(newlyCreatedSurveysArray => {
    console.log(`\tCreated ${newlyCreatedSurveysArray.length} surveys:`);
    newlyCreatedSurveysArray.map(survey => {
      console.log(`\t\t-${survey[0].name}`);
    })
  })

};

module.exports = createSurveys;
