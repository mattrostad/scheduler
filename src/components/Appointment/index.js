import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = 'EDIT';

export default function Appointment(props) {
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    });
  }

  function remove() {
    transition(DELETING);

    props.cancelInterview(props.id).then(() => transition(EMPTY));
  }
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  console.log(props);
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === SAVING && <Status message="Saving" />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form onCancel={back} interviewers={props.interviewers} onSave={save} />
      )}
      {mode === EDIT && <Form onCancel={back} interviewers={props.interviewers} name={props.interview.student} onSave={save} value={props.interview.interviewer.id} />}
      {mode === CONFIRM && <Confirm onCancel={back} onConfirm={remove} />}
      {mode === DELETING && <Status message="Deleting" />}
    </article>
  );
}
