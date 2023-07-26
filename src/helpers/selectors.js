export function getAppointmentsForDay(state, day) {
  // Find the object for the given day in the 'days' array
  const selectedDay = state.days.find((d) => d.name === day);

  if (!selectedDay) {
    // If the day is not found, return an empty array
    return [];
  }

  // Map over the appointments array for the selected day and retrieve the corresponding appointment objects from the 'appointments' object
  const appointments = selectedDay.appointments.map(
    (appointmentId) => state.appointments[appointmentId]
  );

  return appointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: {
      id: interviewer.id,
      name: interviewer.name,
      avatar: interviewer.avatar,
    },
  };
}
export function getInterviewersForDay(state, day) {
  // Find the object for the given day in the 'days' array
  const selectedDay = state.days.find((d) => d.name === day);
  console.log(selectedDay);
  if (!selectedDay) {
    // If the day is not found, return an empty array
    return [];
  }

  // Map over the appointments array for the selected day and retrieve the corresponding appointment objects from the 'appointments' object
  const interviewers = selectedDay.interviewers.map(
    (appointmentId) => state.interviewers[appointmentId]
  );

  return interviewers;
}
