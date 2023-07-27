import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch(() => transition(ERROR_SAVE,true));
  }

  function remove() {
    transition(DELETING, true);

    props.cancelInterview(props.id).then(() => transition(EMPTY))
    
    .catch(() => transition(ERROR_DELETE, true))
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
      {mode === EDIT && (
        <Form
          onCancel={back}
          interviewers={props.interviewers}
          name={props.interview.student}
          onSave={save}
          value={props.interview.interviewer.id}
        />
      )}
      {mode === CONFIRM && <Confirm onCancel={back} onConfirm={remove} />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save appointment."
          onClose={back}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          message="Could not cancel appointment."
          onClose={back}
        />
      )}
    </article>
  );
}
