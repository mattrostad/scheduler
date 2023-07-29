import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from 'components/InterviewerListItem';
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  /*Takes in Three props
  interviewers: array of objs containing info of each interviewer
  interviewer: id
  setInterviewer:function; accepts id of interviewer
  */ 

  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };
  

 const interviewers = props.interviewers.map((interviewer) => {
  return (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={() => props.onChange(interviewer.id)}
    />
  );
});

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section> 
  )
}

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
}