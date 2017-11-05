import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';


const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

  const reviewFields = _.map(formFields,({ name, label })=>{
    return(
      <div key={name}>
        <label>{ label }</label>
        <div>
          { formValues[name] }
        </div>
      </div>
    );
  });


  return (
    <div className="container">
        <div className="card-panel cyan lighten-5">

        <h5>Please confirm your entries</h5>
        {reviewFields}
        <div className="card-action">

            <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
              Back
              <i className="material-icons left">edit</i>
            </button>
            <button
                onClick={() => submitSurvey(formValues, history)}
                className="green white-text btn-flat right">
                SEND SURVEY
                <i className="material-icons right">email</i>
            </button>

          </div>

      </div>
    </div>
  );
};


function mapStateToProps(state) {
  //console.log(state);
  return{
    formValues: state.form.surveyForm.values
  };
}


export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
